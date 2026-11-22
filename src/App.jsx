import { useCallback, useRef, useState } from 'react'
import Advantages from './components/Advantages.jsx'
import Calculator from './components/Calculator.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import LeadDialog from './components/LeadDialog.jsx'
import Reviews from './components/Reviews.jsx'
import Steps from './components/Steps.jsx'
import Types from './components/Types.jsx'
import { gsap, MEDIA, ScrollTrigger, useGSAP } from './lib/gsap.js'

export default function App() {
  const root = useRef(null)
  // null — закрыто; { config } — открыто (config = null для заявки без расчёта)
  const [request, setRequest] = useState(null)
  const openPlain = useCallback(() => setRequest({ config: null }), [])
  const openPinned = useCallback((config) => setRequest({ config }), [])
  const close = useCallback(() => setRequest(null), [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MEDIA, ({ conditions }) => {
        ScrollTrigger.create({
          start: 80,
          end: () => ScrollTrigger.maxScroll(window) + 200,
          toggleClass: { targets: '[data-header]', className: 'is-solid' },
        })
        if (conditions.reduceMotion) return
        // световая линия под шапкой растёт вместе с прокруткой страницы
        gsap.fromTo(
          '[data-scroll-line]',
          { scaleX: 0 },
          { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } },
        )
        const items = gsap.utils.toArray('[data-reveal]')
        gsap.set(items, { autoAlpha: 0, y: conditions.isDesktop ? 36 : 20 })
        ScrollTrigger.batch(items, {
          start: 'top 92%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
        })
      })

      const refresh = () => ScrollTrigger.refresh()
      document.fonts?.ready.then(refresh)
      window.addEventListener('load', refresh)
      return () => window.removeEventListener('load', refresh)
    },
    { scope: root },
  )

  return (
    <div ref={root}>
      <a href="#main" className="skip-link">
        К содержанию
      </a>
      <Header />
      <main id="main">
        <Hero onRequest={openPlain} />
        <Advantages />
        <Types />
        <Calculator onPin={openPinned} />
        <Steps />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <LeadDialog request={request} onClose={close} />
    </div>
  )
}
