import { CEILINGS, CORNER_PRICE, SPOT_PRICE } from '../data.js'

const byId = new Map(CEILINGS.map((c) => [c.id, c]))

export function estimate({ area, typeId, spots, corners }) {
  const ceiling = byId.get(typeId) ?? CEILINGS[0]
  const canvas = area * ceiling.price
  const light = spots * SPOT_PRICE
  const extraCorners = Math.max(0, corners - 4)
  const cornerCost = extraCorners * CORNER_PRICE
  return { ceiling, canvas, light, cornerCost, total: canvas + light + cornerCost }
}
