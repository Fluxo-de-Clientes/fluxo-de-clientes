import assert from 'node:assert/strict'
import { test } from 'node:test'
import { contactTrend, createTrendPath, demoContactTotal, demoPipeline, demoPreviousTotal } from '../app/utils/contactTrend.ts'

test('demo totals and funnel agree with the cumulative series', () => {
  assert.equal(demoContactTotal, 128)
  assert.equal(demoPreviousTotal, 114)
  assert.equal(demoPipeline[0].value, demoContactTotal)
  assert.equal(Number((demoPipeline.at(-1).value / demoContactTotal * 100).toFixed(1)), 9.4)
  contactTrend.forEach((point, index) => {
    if (!index) return
    const previous = contactTrend[index - 1]
    assert.ok(point.day > previous.day)
    assert.ok(point.current >= previous.current)
    assert.ok(point.previous >= previous.previous)
  })
  demoPipeline.forEach((stage, index) => {
    if (index) assert.ok(stage.value <= demoPipeline[index - 1].value)
  })
})

test('empty and single-point series do not produce invalid geometry', () => {
  assert.equal(createTrendPath([]), '')
  assert.equal(createTrendPath([{ x: 4, y: 9 }]), 'M 4 9')
})

test('curves stay within each interval, including plateaus and direction changes', () => {
  const fixtures = [
    contactTrend.map(point => ({ x: point.day, y: point.current })),
    contactTrend.map(point => ({ x: point.day, y: point.previous })),
    [{ x: 0, y: 0 }, { x: 3, y: 40 }, { x: 5, y: 40 }, { x: 8, y: 2 }, { x: 12, y: 8 }]
  ]
  for (const points of fixtures) {
    const path = createTrendPath(points)
    assert.ok(!/NaN|Infinity/.test(path))
    const segments = path.split(' C ').slice(1)
    assert.equal(segments.length, points.length - 1)
    segments.forEach((segment, index) => {
      const [x1, y1, x2, y2, x3, y3] = segment.match(/-?\d+(?:\.\d+)?/g).map(Number)
      const start = points[index]
      const end = points[index + 1]
      assert.deepEqual([x3, y3], [end.x, end.y])
      assert.ok(x1 >= start.x && x2 <= end.x)
      for (let step = 0; step <= 100; step++) {
        const t = step / 100
        const y = (1 - t) ** 3 * start.y + 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t ** 2 * y2 + t ** 3 * y3
        assert.ok(y >= Math.min(start.y, end.y) - 0.02 && y <= Math.max(start.y, end.y) + 0.02)
      }
    })
  }
})
