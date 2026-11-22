import { useRef, useState } from 'react'
import { CEILINGS, CORNER_PRICE, LIMITS, SPOT_PRICE } from '../data.js'
import { estimate } from '../lib/estimate.js'
import { formatNumber, formatRub } from '../lib/format.js'
import { gsap, useGSAP } from '../lib/gsap.js'
import RoomPlan from './RoomPlan.jsx'
import SectionHead from './SectionHead.jsx'
import Stepper from './Stepper.jsx'

const TICKS = [6, 20, 40, 60, 80, 100]

export default function Calculator({ onPin }) {
  const [area, setArea] = useState(LIMITS.area.initial)
  const [typeId, setTypeId] = useState(CEILINGS[0].id)
  const [spots, setSpots] = useState(LIMITS.spots.initial)
  const [corners, setCorners] = useState(LIMITS.corners.initial)

  const config = { area, typeId, spots, corners }
  const result = estimate(config)
  const totalRef = useRef(null)
  const counter = useRef({ value: result.total })
  // Текст суммы React отдаёт один раз; дальше его ведёт только GSAP.
  const [initialTotal] = useState(result.total)

  // Сумма «перекручивается» мимо React: значение живёт в ref, в DOM пишет GSAP.
  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.to(counter.current, {
        value: result.total,
        duration: reduce ? 0 : 0.7,
        ease: 'power3.out',
        overwrite: true,
        onUpdate: () => {
          if (totalRef.current) totalRef.current.textContent = formatNumber(counter.current.value)
        },
      })
    },
    { dependencies: [result.total] },
  )

  const fill = ((area - LIMITS.area.min) / (LIMITS.area.max - LIMITS.area.min)) * 100

  return (
    <section id="calc" className="on-plaster bg-plaster py-20 md:py-32">
      <div className="shell">
        <SectionHead index="03" name="Расчёт стоимости" title="Соберите свой потолок и узнайте цену">
          Предварительный расчёт по ценам «от». Точную сумму замерщик назовёт после замера.
        </SectionHead>

        <div className="mt-14 grid border border-[var(--line-dark)] md:mt-20 lg:grid-cols-12">
          <div className="relative border-b border-[var(--line-dark)] p-5 text-ink lg:col-span-5 lg:border-b-0 lg:border-r md:p-8">
            <p className="spec flex justify-between text-[0.75rem] text-stone">
              <span>План потолка</span>
              <span>{area} м²</span>
            </p>
            <div className="mt-4 aspect-[128/100]">
              <RoomPlan area={area} spots={spots} corners={corners} areaMax={LIMITS.area.max} />
            </div>
          </div>

          <div className="p-5 md:p-8 lg:col-span-7">
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="calc-area" className="text-[1.0625rem]">
                  Площадь
                </label>
                <output htmlFor="calc-area" className="spec text-[1.75rem] leading-none">
                  {area}
                  <span className="ml-1 text-[0.875rem] text-stone">м²</span>
                </output>
              </div>
              <div className="ruler mt-5" style={{ '--fill': `${fill}%` }}>
                <input
                  id="calc-area"
                  name="area"
                  type="range"
                  min={LIMITS.area.min}
                  max={LIMITS.area.max}
                  step="1"
                  value={area}
                  onChange={(event) => setArea(Number(event.target.value))}
                  aria-valuetext={`${area} квадратных метров`}
                />
                <div aria-hidden="true" className="ruler-scale spec">
                  {TICKS.map((tick) => (
                    <span key={tick} style={{ left: `${((tick - LIMITS.area.min) / (LIMITS.area.max - LIMITS.area.min)) * 100}%` }}>
                      {tick}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <fieldset className="mt-10">
              <legend className="text-[1.0625rem]">Тип полотна</legend>
              <div className="mt-4 grid gap-px bg-[var(--line-dark)] p-px sm:grid-cols-2">
                {CEILINGS.map((item) => (
                  <label key={item.id} className="type-option">
                    <input
                      type="radio"
                      name="ceiling"
                      value={item.id}
                      checked={typeId === item.id}
                      onChange={() => setTypeId(item.id)}
                      className="sr-only"
                    />
                    <span>{item.short ?? item.name}</span>
                    <span className="spec text-[0.8125rem] opacity-70">от {formatNumber(item.price)} ₽/м²</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 border-b border-[var(--line-dark)]">
              <Stepper
                label="Точечные светильники"
                unit="шт"
                hint={`Установка — от ${formatNumber(SPOT_PRICE)} ₽ за штуку`}
                value={spots}
                onChange={setSpots}
                min={LIMITS.spots.min}
                max={LIMITS.spots.max}
              />
              <Stepper
                label="Углы в помещении"
                unit="шт"
                hint={CORNER_PRICE ? `Свыше четырёх — ${formatNumber(CORNER_PRICE)} ₽ за угол` : 'Обработку углов считает замерщик на месте'}
                value={corners}
                onChange={setCorners}
                min={LIMITS.corners.min}
                max={LIMITS.corners.max}
              />
            </div>
          </div>

          <div className="grid gap-6 border-t border-[var(--line-dark)] bg-graphite p-5 text-plaster md:p-8 lg:col-span-12 lg:grid-cols-12 lg:items-end lg:gap-8">
            <dl className="spec grid gap-2 text-[0.8125rem] text-plaster/70 lg:col-span-4">
              <div className="flex justify-between gap-4">
                <dt>
                  {result.ceiling.short ?? result.ceiling.name}, {area} м² × {formatNumber(result.ceiling.price)} ₽
                </dt>
                <dd>{formatRub(result.canvas)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>
                  Светильники, {spots} × {formatNumber(SPOT_PRICE)} ₽
                </dt>
                <dd>{formatRub(result.light)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Углы, {corners} шт</dt>
                <dd>{CORNER_PRICE ? formatRub(result.cornerCost) : 'на замере'}</dd>
              </div>
            </dl>
            <p className="lg:col-span-4 lg:text-right">
              <span className="spec block text-[0.8125rem] text-plaster/60">Итого, от</span>
              <span className="spec text-[clamp(2.4rem,6vw,4rem)] leading-none text-led">
                <span ref={totalRef}>{formatNumber(initialTotal)}</span>&nbsp;₽
              </span>
            </p>
            <div className="lg:col-span-4 lg:text-right">
              <button type="button" className="btn-led w-full lg:w-auto" onClick={() => onPin({ ...config, total: result.total })}>
                Закрепить расчёт и вызвать замерщика
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
