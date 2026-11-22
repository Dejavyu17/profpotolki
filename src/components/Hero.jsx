import { useCallback, useEffect, useRef, useState } from 'react'
import { CEILINGS, OFFER } from '../data.js'
import { formatNumber } from '../lib/format.js'
import { gsap, MEDIA, useGSAP } from '../lib/gsap.js'
import { PHOTOS } from '../photos.js'

const MIN_PRICE = Math.min(...CEILINGS.map((c) => c.price))

// Диммер: 0 — свет выключен, 50 — световая линия, 100 — линия, парящий контур и споты.
const SCENES = [
  { at: 0, label: 'Выключен' },
  { at: 50, label: 'Линия' },
  { at: 100, label: 'Весь свет' },
]
const REST = 50

const sceneAt = (value) => (value < 25 ? 0 : value < 75 ? 1 : 2)

export default function Hero({ onRequest }) {
  const root = useRef(null)
  const slider = useRef(null)
  const level = useRef({ value: REST })
  const intro = useRef(null)
  const [scene, setScene] = useState(sceneAt(REST))
  const [fullReady, setFullReady] = useState(false)

  const paint = useCallback((value) => {
    const node = root.current
    if (!node) return
    level.current.value = value
    node.style.setProperty('--lit-line', Math.min(1, value / 50).toFixed(3))
    node.style.setProperty('--lit-full', Math.max(0, (value - 50) / 50).toFixed(3))
    node.style.setProperty('--lit', (value / 100).toFixed(3))
    if (slider.current) {
      slider.current.value = Math.round(value)
      slider.current.style.setProperty('--fill', `${value}%`)
    }
    setScene(sceneAt(value))
  }, [])

  const glide = useCallback(
    (value) => {
      intro.current?.kill()
      setFullReady(true)
      gsap.to(level.current, {
        value,
        duration: window.matchMedia(MEDIA.reduceMotion).matches ? 0 : 0.9,
        ease: 'power2.out',
        overwrite: true,
        onUpdate: () => paint(level.current.value),
      })
    },
    [paint],
  )

  const onDrag = (event) => {
    intro.current?.kill()
    gsap.killTweensOf(level.current)
    setFullReady(true)
    paint(Number(event.target.value))
  }

  // Третий кадр («весь свет») не нужен для первого экрана — догружаем после загрузки страницы.
  useEffect(() => {
    const ready = () => setFullReady(true)
    if (document.readyState === 'complete') {
      const id = setTimeout(ready, 600)
      return () => clearTimeout(id)
    }
    window.addEventListener('load', ready, { once: true })
    return () => window.removeEventListener('load', ready)
  }, [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA, ({ conditions }) => {
        if (conditions.reduceMotion) {
          paint(REST)
          return
        }
        paint(0)
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        intro.current = tl
        tl.addLabel('light', 0.45)
          .addLabel('title', 0.9)
          .fromTo(
            '[data-hero-media]',
            { scale: conditions.isDesktop ? 1.14 : 1.08 },
            { scale: 1, duration: 3, ease: 'power2.out' },
            0,
          )
          .fromTo('[data-hero-veil]', { opacity: 1 }, { opacity: 0, duration: 1.1, ease: 'power1.out' }, 0)
          .fromTo('[data-hero-line]', { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: 'expo.inOut' }, 'light')
          // включение ленты: короткая вспышка, провал, выход на рабочую яркость
          .to(level.current, { value: 34, duration: 0.07, ease: 'none', onUpdate: () => paint(level.current.value) }, 'light+=1.05')
          .to(level.current, { value: 6, duration: 0.09, ease: 'none', onUpdate: () => paint(level.current.value) })
          .to(level.current, { value: REST, duration: 0.9, ease: 'power2.out', onUpdate: () => paint(level.current.value) }, '+=0.06')
          .fromTo(
            '[data-hero-row]',
            { yPercent: 115 },
            { yPercent: 0, duration: 1.15, stagger: 0.1, ease: 'expo.out' },
            'title',
          )
          .fromTo(
            '[data-hero-foot] > *, [data-hero-dimmer]',
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 },
            'title+=0.55',
          )
        return () => {
          tl.kill()
          gsap.killTweensOf(level.current)
        }
      })
    },
    { scope: root },
  )

  const frame = 'absolute inset-0 h-full w-full object-cover object-[38%_50%] md:object-center'

  return (
    <section
      ref={root}
      id="top"
      style={{ '--lit-line': 1, '--lit-full': 0, '--lit': 0.5 }}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-graphite text-plaster"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div data-hero-media className="relative h-full w-full origin-center will-change-transform">
          <img className={frame} src={PHOTOS.heroOff.src} width="1536" height="1024" alt="" decoding="async" fetchPriority="high" />
          <img
            className={`${frame} hero-lit-line`}
            src={PHOTOS.hero.src}
            width="1536"
            height="1024"
            alt={PHOTOS.hero.alt}
            decoding="async"
            fetchPriority="high"
          />
          {fullReady ? (
            <img className={`${frame} hero-lit-full`} src={PHOTOS.heroFull.src} width="1536" height="1024" alt="" decoding="async" />
          ) : null}
        </div>
        <div className="hero-shade absolute inset-0" />
        <div data-hero-veil className="absolute inset-0 bg-graphite opacity-0" />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-16 md:top-20">
        <div data-hero-line className="hero-line h-px origin-left bg-led-glow" />
        <div className="hero-wash h-40" />
      </div>

      <div className="shell mt-auto pb-8 pt-28 md:pb-12 md:pt-32">
        <div data-hero-dimmer className="dimmer relative z-10 mb-7 md:absolute md:right-[var(--gutter)] md:top-32 md:mb-0 md:w-[19rem]">
          <label htmlFor="hero-dimmer" className="block text-[0.9375rem] text-plaster/85">
            Свет в комнате — потяните
          </label>
          <input
            ref={slider}
            id="hero-dimmer"
            type="range"
            min="0"
            max="100"
            step="1"
            defaultValue={REST}
            onInput={onDrag}
            aria-valuetext={SCENES[scene].label}
            style={{ '--fill': `${REST}%` }}
          />
          <div className="flex justify-between">
            {SCENES.map((item, index) => (
              <button
                key={item.label}
                type="button"
                onClick={() => glide(item.at)}
                aria-pressed={scene === index}
                className={`dimmer-stop spec ${scene === index ? 'is-on' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <h1 className="text-[clamp(2.1rem,9.4vw,6.9rem)] font-medium leading-[0.98]">
          {OFFER.lines.map((line, index) => (
            <span key={line} className={`block overflow-hidden pb-[0.08em] ${index > 1 ? 'md:pl-[16.666%]' : ''}`}>
              <span data-hero-row className="block will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div
          data-hero-foot
          className="mt-8 grid gap-6 border-t border-[var(--line-light)] pt-6 md:mt-12 md:grid-cols-12 md:items-end md:gap-8 md:pt-8"
        >
          <p className="max-w-[34rem] text-[1.0625rem] text-plaster/80 md:col-span-5">{OFFER.sub}</p>
          <p className="spec text-[0.9375rem] text-plaster/70 md:col-span-3">
            <span className="block text-[1.75rem] leading-none text-led">от {formatNumber(MIN_PRICE)} ₽/м²</span>
            матовый потолок
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 md:col-span-4 md:justify-end">
            <button type="button" onClick={onRequest} className="btn-led">
              Вызвать замерщика
            </button>
            <a href="#calc" className="link-line">
              Рассчитать стоимость
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
