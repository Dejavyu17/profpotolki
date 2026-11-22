import { COMPANY } from '../data.js'

const NAV = [
  ['Потолки', '#types'],
  ['Расчёт', '#calc'],
  ['Этапы', '#steps'],
  ['Отзывы', '#reviews'],
  ['Контакты', '#contact'],
]

export default function Header() {
  const [phone] = COMPANY.phones
  return (
    <header
      data-header
      className="site-header fixed inset-x-0 top-0 z-40 border-b border-transparent text-plaster"
    >
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
        <a href="#top" className="flex items-center gap-3 text-[1.05rem] font-medium tracking-[-0.03em]" translate="no">
          <span aria-hidden="true" className="block h-px w-6 bg-led shadow-[0_0_10px_1px_rgba(229,194,135,0.8)]" />
          {COMPANY.name}
        </a>
        <nav aria-label="Разделы" className="hidden gap-8 text-[0.9375rem] lg:flex">
          {NAV.map(([label, href]) => (
            <a key={href} href={href} className="nav-link">
              {label}
            </a>
          ))}
        </nav>
        <a href={phone.href} className="spec nav-link text-[0.9375rem]">
          {phone.label}
        </a>
      </div>
    </header>
  )
}
