// Куда уходит заявка. Без VITE_LEAD_ENDPOINT заявка подтверждается только на экране.
const ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT

export async function submitLead(payload) {
  if (!ENDPOINT) return { delivered: false }
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) throw new Error(`lead endpoint responded ${response.status}`)
  return { delivered: true }
}

const DIGITS = /\D/g

export function validateLead({ name, phone }) {
  const errors = {}
  if (name.trim().length < 2) errors.name = 'Напишите, как к вам обращаться'
  const digits = phone.replace(DIGITS, '')
  if (digits.length < 10 || digits.length > 12) errors.phone = 'Укажите телефон целиком, например +7 900 000-00-00'
  return errors
}
