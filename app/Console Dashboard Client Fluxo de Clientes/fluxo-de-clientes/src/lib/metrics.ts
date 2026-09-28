import { differenceInDays, format, subDays, parseISO, startOfDay, endOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import type { Contact, Period } from '../types'
import { referenceDate } from '../data/mock'
export function periodContacts(
  contacts: Contact[],
  period: Period,
  range: { from: string; to: string },
  previous = false,
) {
  const end = period === 'custom' ? endOfDay(parseISO(range.to)) : endOfDay(referenceDate)
  const days =
    period === 'custom'
      ? Math.max(1, differenceInDays(end, parseISO(range.from)) + 1)
      : Number(period)
  const until = previous ? endOfDay(subDays(end, days)) : end
  const from = startOfDay(subDays(until, days - 1))
  return contacts.filter((c) => {
    const d = parseISO(c.createdAt)
    return d >= from && d <= until
  })
}
export function chartData(
  contacts: Contact[],
  period: Period,
  range: { from: string; to: string },
) {
  const end = period === 'custom' ? endOfDay(parseISO(range.to)) : endOfDay(referenceDate)
  const days =
    period === 'custom'
      ? Math.max(1, differenceInDays(end, parseISO(range.from)) + 1)
      : Number(period)
  const buckets = Math.min(8, days)
  return Array.from({ length: buckets }, (_, i) => {
    const from = startOfDay(subDays(end, days - 1 - Math.floor((i * days) / buckets)))
    const to = endOfDay(subDays(end, days - Math.floor(((i + 1) * days) / buckets)))
    return {
      label: format(from, 'dd MMM', { locale: ptBR }),
      atual: contacts.filter((c) => parseISO(c.createdAt) >= from && parseISO(c.createdAt) <= to)
        .length,
      anterior: contacts.filter(
        (c) =>
          parseISO(c.createdAt) >= subDays(from, days) &&
          parseISO(c.createdAt) <= subDays(to, days),
      ).length,
    }
  })
}
