import { COMPANY } from '../data.js'
import LeadForm from './LeadForm.jsx'

export default function Contact() {
  return (
    <section id="contact" className="on-plaster bg-plaster py-20 md:py-32">
      <div className="shell grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <p className="spec text-[0.8125rem] text-stone">06 / Заявка и контакты</p>
          <h2 data-reveal className="mt-6 max-w-[14ch] text-[clamp(2.2rem,6vw,5rem)]">
            Замер сегодня. Монтаж уже завтра.
          </h2>

          <address className="mt-12 grid gap-10 not-italic sm:grid-cols-2 md:mt-16">
            <div data-reveal>
              <p className="spec text-[0.8125rem] text-stone">Телефоны</p>
              <ul className="mt-4 grid gap-2">
                {COMPANY.phones.map((phone) => (
                  <li key={phone.href}>
                    <a href={phone.href} className="spec link-line text-[clamp(1.25rem,2.2vw,1.75rem)]">
                      {phone.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="link-line mt-5 inline-block">
                Написать в WhatsApp
              </a>
            </div>
            <div data-reveal>
              <p className="spec text-[0.8125rem] text-stone">Офис</p>
              <p className="mt-4 max-w-[18rem] text-[1.25rem] leading-[1.3]">{COMPANY.address}</p>
            </div>
          </address>
        </div>

        <div data-reveal className="md:col-span-5 lg:col-span-4 lg:col-start-9">
          <div className="border-t-2 border-graphite pt-7">
            <h3 className="text-[1.6rem]">Вызвать замерщика</h3>
            <p className="mb-8 mt-3 text-[0.9375rem] text-stone">Оставьте имя и телефон — перезвоним и договоримся о времени.</p>
            <LeadForm submitLabel="Оставить заявку" />
          </div>
        </div>
      </div>
    </section>
  )
}
