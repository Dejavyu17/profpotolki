import { PHOTOS } from '../photos.js'
import LightScene from './LightScene.jsx'

const SCENE = { hero: 'hero', matte: 'matte', satin: 'satin', gloss: 'gloss', shadow: 'shadow', detail: 'shadow' }

export default function Photo({ slot, className = '', eager = false, label }) {
  const photo = PHOTOS[slot]
  if (!photo) return <LightScene variant={SCENE[slot]} className={className} label={label} />
  return (
    <img
      className={className}
      src={photo.src}
      width={photo.width}
      height={photo.height}
      alt={photo.alt ?? label ?? ''}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
    />
  )
}
