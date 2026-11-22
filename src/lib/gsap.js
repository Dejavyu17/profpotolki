import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export const MEDIA = {
  isDesktop: '(min-width: 769px)',
  isMobile: '(max-width: 768px)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
}

export { gsap, ScrollTrigger, useGSAP }
