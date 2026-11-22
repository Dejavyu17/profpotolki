// Слоты под изображения. Если значение null — в слоте рисуется световая сцена (LightScene).
// Сейчас в слотах сгенерированные иллюстрации интерьеров, а не фотографии работ компании.
// Чтобы подставить свой снимок: положите файл в src/assets/photos и замените импорт.
import hero from './assets/photos/hero.webp'
import matte from './assets/photos/matte.webp'
import satin from './assets/photos/satin.webp'
import gloss from './assets/photos/gloss.webp'
import shadow from './assets/photos/shadow.webp'
import detail from './assets/photos/detail.webp'

const size = { width: 1536, height: 1024 }

export const PHOTOS = {
  hero: { src: hero, ...size, alt: 'Гостиная с матовым натяжным потолком и тёплой световой линией' },
  matte: { src: matte, ...size, alt: 'Спальня с матовым натяжным потолком и точечными светильниками' },
  satin: { src: satin, ...size, alt: 'Гостиная с сатиновым натяжным потолком и мягким отсветом' },
  gloss: { src: gloss, ...size, alt: 'Гостиная с глянцевым натяжным потолком, в котором отражается комната' },
  shadow: { src: shadow, ...size, alt: 'Потолок на теневом профиле: тонкий зазор между потолком и стеной' },
  detail: { src: detail, ...size, alt: 'Парящий потолок с тёплой световой линией по периметру' },
}
