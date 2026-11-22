import { ADVANTAGES } from '../data.js'
import SectionHead from './SectionHead.jsx'

export default function Advantages() {
  return (
    <section id="why" className="on-plaster bg-plaster py-20 md:py-32">
      <div className="shell">
        <SectionHead index="01" name="Почему мы" title="Четыре вещи, за которые нас благодарят в отзывах" />
        <ol className="mt-14 border-t border-[var(--line-dark)] md:mt-20">
          {ADVANTAGES.map((item, index) => (
            <li
              key={item.title}
              data-reveal
              className="grid gap-3 border-b border-[var(--line-dark)] py-7 md:grid-cols-12 md:gap-8 md:py-9"
            >
              <span className="spec text-[0.8125rem] text-stone md:col-span-3">0{index + 1}</span>
              <h3 className="text-[clamp(1.35rem,2.4vw,2rem)] leading-[1.12] md:col-span-6">{item.title}</h3>
              <p className="text-[0.9375rem] text-stone md:col-span-3">{item.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
