import { useRef } from 'react'
import { STEPS } from '../data.js'
import { gsap, MEDIA, useGSAP } from '../lib/gsap.js'
import Photo from './Photo.jsx'
import SectionHead from './SectionHead.jsx'

export default function Steps() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA, ({ conditions }) => {
        if (conditions.reduceMotion) return
        gsap.fromTo(
          '[data-steps-line]',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: '[data-steps-axis]', start: 'top 80%', end: 'bottom 45%', scrub: 0.5 },
          },
        )
        if (conditions.isDesktop) {
          gsap.fromTo(
            '[data-steps-media]',
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: { trigger: '[data-steps-frame]', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
            },
          )
        }
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} id="steps" className="on-plaster bg-plaster-deep py-20 md:py-32">
      <div className="shell">
        <SectionHead index="04" name="Этапы работы" title="От звонка до готового потолка — два дня" />

        <div data-steps-axis className="relative mt-14 md:mt-20">
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[var(--line-dark)]">
            <div data-steps-line className="h-px origin-left bg-graphite" />
          </div>
          <ol className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, index) => (
              <li key={step.title} data-reveal className="relative border-b border-[var(--line-dark)] pb-8 pt-7 lg:border-b-0 lg:pb-0">
                <span aria-hidden="true" className="absolute left-0 top-[-3px] block h-[7px] w-px bg-graphite" />
                <p className="spec flex justify-between text-[0.8125rem] text-stone">
                  <span>0{index + 1}</span>
                  <span className={step.day === 'Завтра' ? 'text-ink' : ''}>{step.day}</span>
                </p>
                <h3 className="mt-8 text-[clamp(1.6rem,2.6vw,2.25rem)] lg:mt-14">{step.title}</h3>
                <p className="mt-4 max-w-[22rem] text-[0.9375rem] text-stone">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div data-steps-frame className="relative mt-16 aspect-[4/3] overflow-hidden md:mt-24 md:aspect-[21/9]">
          <div data-steps-media className="absolute inset-[-10%_0] will-change-transform">
            <Photo slot="detail" className="h-full w-full object-cover" label="Парящий потолок с тёплой световой линией по периметру" />
          </div>
        </div>
      </div>
    </section>
  )
}
