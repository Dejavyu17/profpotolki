// План потолка: прямоугольник, у которого каждый «вырез» в углу добавляет два угла,
// а скос — один. Так получаются помещения на 4–12 углов.
const NOTCH = 0.26
const CHAMFER = 0.2

// Углы по часовой стрелке: [x, y, знак по x, знак по y] для смещения внутрь.
const CORNERS = [
  [0, 0, 1, 1],
  [1, 0, -1, 1],
  [1, 1, -1, -1],
  [0, 1, 1, -1],
]

export function planPoints(corners, width = 100, height = 72) {
  const notches = Math.min(4, Math.floor((corners - 4) / 2))
  const chamfer = (corners - 4) % 2 === 1
  const points = []

  CORNERS.forEach(([cx, cy, sx, sy], index) => {
    const x = cx * width
    const y = cy * height
    const horizontalFirst = index % 2 === 0
    if (index < notches) {
      const dx = sx * width * NOTCH
      const dy = sy * height * NOTCH
      points.push(horizontalFirst ? [x, y + dy] : [x + dx, y])
      points.push([x + dx, y + dy])
      points.push(horizontalFirst ? [x + dx, y] : [x, y + dy])
    } else if (chamfer && index === notches) {
      const dx = sx * width * CHAMFER
      const dy = sy * height * CHAMFER
      points.push(horizontalFirst ? [x, y + dy] : [x + dx, y])
      points.push(horizontalFirst ? [x + dx, y] : [x, y + dy])
    } else {
      points.push([x, y])
    }
  })
  return points
}

function inside([px, py], polygon) {
  let hit = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) hit = !hit
  }
  return hit
}

// Светильники раскладываются по сетке внутри контура.
export function spotPositions(count, polygon, width = 100, height = 72) {
  if (count <= 0) return []
  for (let cols = Math.max(1, Math.ceil(Math.sqrt(count * (width / height)))); cols < 24; cols++) {
    const rows = Math.max(1, Math.ceil(count / cols) + (cols > 6 ? 1 : 0))
    const cells = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const point = [((c + 0.5) / cols) * width, ((r + 0.5) / rows) * height]
        if (inside(point, polygon)) cells.push(point)
      }
    }
    if (cells.length >= count) {
      const step = cells.length / count
      return Array.from({ length: count }, (_, i) => cells[Math.floor(i * step)])
    }
  }
  return []
}
