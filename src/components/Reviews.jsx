import { REVIEWS } from '../data.js'
import SectionHead from './SectionHead.jsx'

const LAYOUT = ['md:col-span-10 lg:col-span-9', 'md:col-span-6 md:col-start-2', 'md:col-span-5 md:mt-24']

export default function Reviews() {
  const [lead, ...rest] = REVIEWS
  return (
    <section id="reviews" className="relative bg-graphite py-20 text-plaster md:py-32">
      <div aria-hidden="true" className="edge-light absolute inset-x-0 top-0" />
      <div className="shell">
        <SectionHead index="05" name="Отзывы" title="Что пишут клиенты в 2ГИС" dark />

        <div className="mt-14 grid gap-y-14 md:mt-20 md:grid-cols-12 md:gap-x-8">
          <figure data-reveal className={LAYOUT[0]}>
            <blockquote className="text-[clamp(1.6rem,3.9vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.03em]">
              «{lead.text}»
            </blockquote>
            <Caption author={lead.author} />
          </figure>
          {rest.map((review, index) => (
            <figure key={review.author} data-reveal className={`border-t border-[var(--line-light)] pt-7 ${LAYOUT[index + 1]}`}>
              <blockquote className="text-[clamp(1.25rem,2vw,1.6rem)] leading-[1.3] text-plaster/90">«{review.text}»</blockquote>
              <Caption author={review.author} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Caption({ author }) {
  return (
    <figcaption className="mt-7 flex flex-wrap items-baseline gap-x-5 gap-y-1">
      <span className="text-[1.0625rem]">{author}</span>
      <span className="spec text-[0.8125rem] text-led">отзыв из 2ГИС</span>
    </figcaption>
  )
}
