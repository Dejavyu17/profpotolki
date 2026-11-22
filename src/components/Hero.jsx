import { useRef } from 'react'
import { CEILINGS, OFFER } from '../data.js'
import { formatNumber } from '../lib/format.js'
import { gsap, MEDIA, useGSAP } from '../lib/gsap.js'
import Photo from './Photo.jsx'

const MIN_PRICE = Math.min(...CEILINGS.map((c) => c.price))

export default function Hero({ onRequest }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA, ({ conditions }) => {
        if (conditions.reduceMotion) return
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.addLabel('light', 0.25)
          .addLabel('title', 0.7)
          .fromTo(
            '[data-hero-media]',
            { scale: conditions.isDesktop ? 1.18 : 1.1 },
            { scale: 1, duration: 2.6, ease: 'power2.out' },
            0,
          )
          .fromTo('[data-hero-veil]', { opacity: 1 }, { opacity: 0, duration: 1.6, ease: 'power1.out' }, 0)
          .fromTo(
            '[data-hero-line]',
            { scaleX: 0 },
            { scaleX: 1, duration: 1.5, ease: 'expo.inOut' },
            'light',
          )
          .fromTo('[data-hero-wash]', { opacity: 0 }, { opacity: 1, duration: 1.4 }, 'light+=0.9')
          .fromTo(
            '[data-hero-row]',
            { yPercent: 115 },
            { yPercent: 0, duration: 1.15, stagger: 0.1, ease: 'expo.out' },
            'title',
          )
          .fromTo(
            '[data-hero-foot] > *',
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08 },
            'title+=0.55',
          )
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-graphite text-plaster">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div data-hero-media className="h-full w-full origin-center will-change-transform">
          <Photo slot="hero" eager className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-graphite via-graphite/55 to-graphite/25" />
        <div data-hero-veil className="absolute inset-0 bg-graphite opacity-0" />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-16 md:top-20">
        <div data-hero-line className="hero-line h-px origin-left bg-led-glow" />
        <div data-hero-wash className="hero-wash h-40" />
      </div>

      <div className="shell mt-auto pb-8 pt-32 md:pb-12">
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
