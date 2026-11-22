export default function SectionHead({ index, name, title, children, dark = false }) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
      <p className={`spec text-[0.8125rem] md:col-span-3 ${dark ? 'text-ash' : 'text-stone'}`}>
        {index} / {name}
      </p>
      <div className="md:col-span-9">
        <h2 data-reveal className="max-w-[18ch] text-[clamp(2rem,5.2vw,4.25rem)]">
          {title}
        </h2>
        {children ? (
          <p data-reveal className={`mt-6 max-w-[38rem] ${dark ? 'text-plaster/70' : 'text-stone'}`}>
            {children}
          </p>
        ) : null}
      </div>
    </div>
  )
}
