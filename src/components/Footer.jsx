import { COMPANY } from '../data.js'

export default function Footer() {
  return (
    <footer className="bg-graphite py-10 text-plaster/70">
      <div className="shell flex flex-col gap-6 text-[0.875rem] md:flex-row md:items-baseline md:justify-between">
        <p className="text-plaster" translate="no">
          {COMPANY.name}
          <span className="text-plaster/60"> — натяжные потолки, {COMPANY.city}</span>
        </p>
        <p>{COMPANY.address}</p>
        <p className="spec flex flex-wrap gap-x-6 gap-y-1">
          {COMPANY.phones.map((phone) => (
            <a key={phone.href} href={phone.href} className="nav-link">
              {phone.label}
            </a>
          ))}
        </p>
      </div>
      <div className="shell mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-[var(--line-light)] pt-6 text-[0.8125rem]">
        <a href="./privacy.html" className="nav-link">
          Политика конфиденциальности
        </a>
        <a href="./consent.html" className="nav-link">
          Согласие на обработку персональных данных
        </a>
      </div>
    </footer>
  )
}
