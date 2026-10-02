export interface TrendPoint {
  day: number
  current: number
  previous: number
}

// Illustrative cumulative contacts. The dashboard and chart share the same totals.
export const contactTrend: readonly TrendPoint[] = [
  { day: 1, current: 3, previous: 2 },
  { day: 3, current: 8, previous: 6 },
  { day: 6, current: 17, previous: 14 },
  { day: 9, current: 26, previous: 23 },
  { day: 12, current: 38, previous: 32 },
  { day: 15, current: 47, previous: 39 },
  { day: 18, current: 62, previous: 51 },
  { day: 21, current: 73, previous: 65 },
  { day: 24, current: 85, previous: 80 },
  { day: 27, current: 104, previous: 94 },
  { day: 29, current: 116, previous: 106 },
  { day: 30, current: 128, previous: 114 }
]

export const demoContactTotal = contactTrend[contactTrend.length - 1]!.current
export const demoPreviousTotal = contactTrend[contactTrend.length - 1]!.previous
export const demoPipeline = [
  { label: 'Novo contato', value: demoContactTotal, tone: 'coral' },
  { label: 'Em atendimento', value: 32, tone: 'olive' },
  { label: 'Qualificado', value: 18, tone: 'sage' },
  { label: 'Proposta', value: 12, tone: 'green' }
] as const

interface ChartPoint { x: number, y: number }

// Monotone cubic interpolation keeps curves within the supplied data range.
// Unlike hand-drawn paths, both series derive directly from their displayed values.
export function createTrendPath(points: readonly ChartPoint[]): string {
  if (!points.length) return ''
  const first = points[0]!
  if (points.length === 1) return `M ${first.x} ${first.y}`

  const slopes = points.slice(1).map((point, index) => {
    const previous = points[index]!
    return (point.y - previous.y) / (point.x - previous.x)
  })
  const tangents = points.map((_, index) => {
    if (index === 0) return slopes[0]!
    if (index === points.length - 1) return slopes[slopes.length - 1]!
    const before = slopes[index - 1]!
    const after = slopes[index]!
    if (before * after <= 0) return 0
    return Math.sign(before) * Math.min(Math.abs((before + after) / 2), 3 * Math.min(Math.abs(before), Math.abs(after)))
  })

  return points.slice(1).reduce((path, point, index) => {
    const previous = points[index]!
    const third = (point.x - previous.x) / 3
    const rounded = (value: number) => Number(value.toFixed(2))
    return `${path} C ${rounded(previous.x + third)} ${rounded(previous.y + tangents[index]! * third)}, ${rounded(point.x - third)} ${rounded(point.y - tangents[index + 1]! * third)}, ${point.x} ${point.y}`
  }, `M ${first.x} ${first.y}`)
}
