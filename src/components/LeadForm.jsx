import { useId, useRef, useState } from 'react'
import { COMPANY, CONFIRMATION } from '../data.js'
import { submitLead, validateLead } from '../lib/lead.js'

export default function LeadForm({ details, submitLabel = 'Вызвать замерщика', dark = false }) {
  const id = useId()
  const form = useRef(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | done | failed

  async function onSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const lead = { name: String(data.get('name') ?? ''), phone: String(data.get('phone') ?? '') }
    const found = validateLead(lead)
    setErrors(found)
    const first = Object.keys(found)[0]
    if (first) {
      form.current?.elements[first]?.focus()
      return
    }
    setStatus('sending')
    try {
      await submitLead({ ...lead, details })
      setStatus('done')
    } catch {
      setStatus('failed')
    }
  }

  if (status === 'done') {
    return (
      <div role="status" aria-live="polite" className={`confirm ${dark ? 'text-plaster' : 'text-ink'}`}>
        <span aria-hidden="true" className="confirm-line" />
        <p className="text-[clamp(1.4rem,2.6vw,2rem)] font-medium leading-[1.15] tracking-[-0.03em]">{CONFIRMATION}</p>
        <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="link-line mt-6 inline-block">
          Написать в WhatsApp
        </a>
      </div>
    )
  }

  const field = `field ${dark ? 'field-dark' : ''}`
  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="grid gap-5">
      <div>
        <label htmlFor={`${id}-name`} className="text-[0.875rem] opacity-70">
          Имя
        </label>
        <input
          id={`${id}-name`}
          name="name"
          type="text"
          autoComplete="given-name"
          placeholder="Например, Анна…"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
          className={field}
        />
        {errors.name ? (
          <p id={`${id}-name-error`} className="field-error">
            {errors.name}
          </p>
        ) : null}
      </div>
      <div>
        <label htmlFor={`${id}-phone`} className="text-[0.875rem] opacity-70">
          Телефон
        </label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+7 900 000-00-00…"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
          className={`${field} spec`}
        />
        {errors.phone ? (
          <p id={`${id}-phone-error`} className="field-error">
            {errors.phone}
          </p>
        ) : null}
      </div>
      <button type="submit" className="btn-led mt-2" disabled={status === 'sending'}>
        {status === 'sending' ? 'Отправляем…' : submitLabel}
      </button>
      <p aria-live="polite" className="field-error">
        {status === 'failed' ? `Не получилось отправить. Позвоните нам: ${COMPANY.phones[0].label}` : ''}
      </p>
    </form>
  )
}
