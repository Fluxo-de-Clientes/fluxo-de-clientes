import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, formatDistance, isValid, parseISO } from 'date-fns'
import { referenceDate } from '../data/mock'
import { ptBR } from 'date-fns/locale'
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
export const number = (n: number) => new Intl.NumberFormat('pt-BR').format(n)
export const money = (n: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(n)
export const demoNow = () => new Date(Math.max(Date.now(), referenceDate.getTime()))
export const initials = (name: string) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
export function dateLabel(value: string) {
  const d = parseISO(value)
  return isValid(d) ? format(d, 'dd MMM, HH:mm', { locale: ptBR }) : 'Sem data'
}
export function relative(value: string) {
  const d = parseISO(value)
  return isValid(d)
    ? formatDistance(d, demoNow(), {
        addSuffix: true,
        locale: ptBR,
      })
    : 'Sem atividade'
}
export function safeRead<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : fallback
  } catch {
    return fallback
  }
}
export function safeWrite(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}
