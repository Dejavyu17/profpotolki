import { useEffect, useRef } from 'react'
import { CEILINGS } from '../data.js'
import { formatRub } from '../lib/format.js'
import { gsap } from '../lib/gsap.js'
import LeadForm from './LeadForm.jsx'

const NAMES = new Map(CEILINGS.map((c) => [c.id, c.name]))

export default function LeadDialog({ request, onClose }) {
  const dialog = useRef(null)
  const open = request !== null

  useEffect(() => {
    const node = dialog.current
    if (!node) return
    if (!open) {
      if (node.open) node.close()
      return
    }
    if (!node.open) node.showModal()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      const fromSide = window.matchMedia('(min-width: 769px)').matches
      gsap.fromTo(
        '[data-sheet]',
        fromSide ? { xPercent: 100 } : { yPercent: 100 },
        { xPercent: 0, yPercent: 0, duration: 0.6, ease: 'expo.out' },
      )
      const rows = node.querySelectorAll('[data-sheet-row]')
      if (rows.length) {
        gsap.fromTo(rows, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05, delay: 0.2 })
      }
    }, node)
    return () => ctx.revert()
  }, [open])

  const config = request?.config
  const rows = config
    ? [
        ['Полотно', NAMES.get(config.typeId)],
        ['Площадь', `${config.area} м²`],
        ['Светильники', `${config.spots} шт`],
        ['Углы', `${config.corners} шт`],
        ['Предварительно, от', formatRub(config.total)],
      ]
    : []

  return (
    <dialog
      ref={dialog}
      className="sheet"
      aria-labelledby="sheet-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialog.current) onClose()
      }}
    >
      {open ? (
        <div data-sheet className="sheet-panel">
          <div className="flex items-start justify-between gap-6">
            <h2 id="sheet-title" className="text-[clamp(1.6rem,3vw,2.2rem)]">
              {config ? 'Расчёт закреплён. Куда позвонить?' : 'Вызвать замерщика'}
            </h2>
            <button type="button" className="step-btn step-btn-dark" aria-label="Закрыть" onClick={onClose}>
              <span aria-hidden="true">×</span>
            </button>
          </div>
          {rows.length ? (
            <dl className="spec mt-8 border-t border-[var(--line-light)] text-[0.875rem]">
              {rows.map(([term, value]) => (
                <div key={term} data-sheet-row className="flex justify-between gap-4 border-b border-[var(--line-light)] py-3">
                  <dt className="text-plaster/60">{term}</dt>
                  <dd className="text-right text-led">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-6 text-plaster/70">Приедем в день обращения, поможем выбрать полотно и освещение.</p>
          )}
          <div className="mt-8">
            <LeadForm dark details={config ?? null} submitLabel="Вызвать замерщика" />
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
