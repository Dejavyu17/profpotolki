export default function Stepper({ label, unit, value, min, max, onChange, hint }) {
  const set = (next) => onChange(Math.min(max, Math.max(min, next)))
  return (
    <div className="flex items-center justify-between gap-4 border-t border-[var(--line-dark)] py-5">
      <div className="min-w-0">
        <p className="text-[1.0625rem]">{label}</p>
        {hint ? <p className="mt-1 text-[0.8125rem] text-stone">{hint}</p> : null}
      </div>
      <div role="group" aria-label={label} className="flex shrink-0 items-center">
        <button type="button" className="step-btn" aria-label={`${label}: меньше`} disabled={value <= min} onClick={() => set(value - 1)}>
          <span aria-hidden="true">−</span>
        </button>
        <output aria-live="polite" className="spec w-[4.5rem] text-center text-[1.25rem]">
          {value}
          <span className="ml-1 text-[0.75rem] text-stone">{unit}</span>
        </output>
        <button type="button" className="step-btn" aria-label={`${label}: больше`} disabled={value >= max} onClick={() => set(value + 1)}>
          <span aria-hidden="true">+</span>
        </button>
      </div>
    </div>
  )
}
