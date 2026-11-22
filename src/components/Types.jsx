import { useRef, useState } from 'react'
import { CEILINGS, SPOT_PRICE } from '../data.js'
import { formatNumber } from '../lib/format.js'
import { gsap, MEDIA, ScrollTrigger, useGSAP } from '../lib/gsap.js'
import { useMedia } from '../lib/useMedia.js'
import Photo from './Photo.jsx'
import SectionHead from './SectionHead.jsx'

export default function Types() {
  const root = useRef(null)
  const [active, setActive] = useState(CEILINGS[0].id)
  const isDesktop = useMedia('(min-width: 768px)')

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA, ({ conditions }) => {
        gsap.utils.toArray('[data-type-row]').forEach((row) => {
          ScrollTrigger.create({
            trigger: row,
            start: 'top 58%',
            end: 'bottom 42%',
            onToggle: (self) => {
              if (self.isActive) setActive(row.dataset.typeRow)
            },
          })
        })
        if (conditions.isDesktop && !conditions.reduceMotion) {
          gsap.fromTo(
            '[data-type-stage]',
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: 'none',
              scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
            },
          )
        }
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="types" className="relative bg-graphite py-20 text-plaster md:py-32">
      <div aria-hidden="true" className="edge-light absolute inset-x-0 top-0" />
      <div className="shell">
        <SectionHead index="02" name="Типы потолков и свет" title="Фактура решает, как свет ляжет на потолок" dark>
          Все цены — «от», за квадратный метр. Точную сумму называет замерщик на месте.
        </SectionHead>

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:gap-8">
          <ul className="md:col-span-6 lg:col-span-5">
            {CEILINGS.map((item) => {
              const on = active === item.id
              return (
                <li key={item.id} data-type-row={item.id} className={`type-row ${on ? 'is-lit' : ''}`}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onMouseEnter={() => setActive(item.id)}
                    onFocus={() => setActive(item.id)}
                    onClick={() => setActive(item.id)}
                    className="block w-full py-7 pl-6 text-left md:py-10 md:pl-8"
                  >
                    <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <span className="text-[clamp(1.5rem,2.8vw,2.4rem)] font-medium leading-[1.08] tracking-[-0.03em]">
                        {item.name}
                      </span>
                      <span className="spec whitespace-nowrap text-[1rem] text-led">от {formatNumber(item.price)} ₽/м²</span>
                    </span>
                    <span className="mt-3 block max-w-[30rem] text-[0.9375rem] text-plaster/65">{item.text}</span>
                  </button>
                  <div className="mb-7 ml-6 aspect-[16/10] overflow-hidden md:hidden">
                    {!isDesktop && <Photo slot={item.id} className="h-full w-full object-cover" label={`${item.name} потолок`} />}
                  </div>
                </li>
              )
            })}
            <li className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-[var(--line-light)] py-7 pl-6 md:pl-8">
              <span className="text-[1.0625rem] text-plaster/80">Установка точечного светильника</span>
              <span className="spec whitespace-nowrap text-led">от {formatNumber(SPOT_PRICE)} ₽/шт</span>
            </li>
          </ul>

          <div className="hidden md:col-span-6 md:block lg:col-span-6 lg:col-start-7">
            <div className="sticky top-28 aspect-[4/5] max-h-[calc(100vh-9rem)] w-full overflow-hidden">
              <div data-type-stage className="absolute inset-[-5%_0] will-change-transform">
                {CEILINGS.map((item) => (
                  <div key={item.id} className={`type-preview ${active === item.id ? 'is-on' : ''}`}>
                    {isDesktop && <Photo slot={item.id} className="h-full w-full object-cover" label={`${item.name} потолок`} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
