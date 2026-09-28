import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import {
  X,
  Check,
  AlertCircle,
  Minus,
  Search,
  Inbox,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react'
import { Button } from './button'
import { cn, initials } from '../../lib/utils'
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={cn('card', className)}>{children}</section>
}
export function SectionTitle({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="section-title">
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  )
}
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && <div className="heading-actions">{action}</div>}
    </div>
  )
}
export function Badge({
  children,
  tone = 'neutral',
  icon = true,
}: {
  children: ReactNode
  tone?: 'neutral' | 'green' | 'orange' | 'red'
  icon?: boolean
}) {
  const Icon = tone === 'green' ? Check : tone === 'orange' || tone === 'red' ? AlertCircle : Minus
  return (
    <span className={'badge badge-' + tone}>
      {icon && <Icon size={12} />} {children}
    </span>
  )
}
export function Status({ value }: { value: string }) {
  return (
    <Badge
      tone={
        ['Ativo', 'Verificado', 'Concluída', 'Saudável', 'Cliente'].includes(value)
          ? 'green'
          : ['Atenção', 'Alta', 'Pendente', 'Aguardando', 'Agendada', 'Proposta'].includes(value)
            ? 'orange'
            : ['Falha', 'Perdido', 'Com atenção'].includes(value)
              ? 'red'
              : 'neutral'
      }
    >
      {value}
    </Badge>
  )
}
export function Avatar({ name, small = false }: { name: string; small?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn('avatar', small && 'avatar-small', 'avatar-tone-' + (name.charCodeAt(0) % 4))}
    >
      {initials(name)}
    </span>
  )
}
export function Select({
  label,
  children,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className={cn('field select-field', className)}>
      <span>{label}</span>
      <div className="select-wrap">
        <select aria-label={label} {...props}>
          {children}
        </select>
        <ChevronDown size={14} />
      </div>
    </label>
  )
}
export function Input({
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input aria-invalid={!!error} {...props} />
      {error && (
        <span className="field-error" role="alert">
          {error}
        </span>
      )}
    </label>
  )
}
export function SearchInput({
  value,
  onChange,
  label = 'Buscar',
  placeholder = 'Pesquisar...',
}: {
  value: string
  onChange: (v: string) => void
  label?: string
  placeholder?: string
}) {
  return (
    <label className="search-field">
      <Search size={17} />
      <span className="sr-only">{label}</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {value && (
        <button aria-label="Limpar busca" onClick={() => onChange('')}>
          <X size={15} />
        </button>
      )}
    </label>
  )
}
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  wide = false,
  drawer = false,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
  title: string
  description?: string
  children: ReactNode
  wide?: boolean
  drawer?: boolean
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="modal-overlay" />
        <DialogPrimitive.Content
          className={cn('modal', wide && 'modal-wide', drawer && 'modal-drawer')}
        >
          <div className="modal-header">
            <div>
              <DialogPrimitive.Title>{title}</DialogPrimitive.Title>
              <DialogPrimitive.Description
                className={description ? 'modal-description' : 'sr-only'}
              >
                {description || 'Revise as informações e use as ações disponíveis.'}
              </DialogPrimitive.Description>
            </div>
            <DialogPrimitive.Close asChild>
              <Button size="icon" variant="ghost" aria-label="Fechar painel">
                <X size={20} />
              </Button>
            </DialogPrimitive.Close>
          </div>
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
export function Menu({
  trigger,
  items,
  label,
}: {
  trigger: ReactNode
  items: { label: string; onSelect: () => void; disabled?: boolean }[]
  label: string
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="menu-trigger" aria-label={label}>
          {trigger}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="menu-content" sideOffset={8}>
          {items.map((item, i) => (
            <DropdownMenu.Item key={i} disabled={item.disabled} onSelect={item.onSelect}>
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
export function Switch({
  checked,
  onCheckedChange,
  label,
  disabled = false,
}: {
  checked: boolean
  onCheckedChange: (v: boolean) => void
  label: string
  disabled?: boolean
}) {
  return (
    <label className="switch-label">
      <span>{label}</span>
      <SwitchPrimitive.Root
        className="switch"
        aria-label={label}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      >
        <SwitchPrimitive.Thumb className="switch-thumb" />
      </SwitchPrimitive.Root>
    </label>
  )
}
export function Empty({
  title = 'Nenhum resultado encontrado',
  description = 'Tente ajustar a busca ou os filtros.',
  action,
}: {
  title?: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="empty-state">
      <span className="empty-icon">
        <Inbox size={26} />
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  )
}
export function Skeleton() {
  return (
    <div aria-label="Carregando seção" role="status" className="skeleton-page">
      <div className="skeleton sk-title" />
      <div className="metric-grid">
        {[1, 2, 3, 4].map((n) => (
          <div className="skeleton sk-card" key={n} />
        ))}
      </div>
      <div className="skeleton sk-chart" />
    </div>
  )
}
export function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="progress"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
    >
      <span style={{ width: Math.min(100, Math.max(0, value)) + '%' }} />
    </div>
  )
}
export function Metric({
  label,
  value,
  change,
  icon,
  warning = false,
}: {
  label: string
  value: ReactNode
  change: string
  icon: ReactNode
  warning?: boolean
}) {
  return (
    <Card className="metric">
      <div className="metric-label">
        <span>{label}</span>
        <span className={warning ? 'metric-icon warning' : 'metric-icon'}>{icon}</span>
      </div>
      <strong>{value}</strong>
      <div className="metric-foot">
        <span className={warning ? 'text-warning' : 'text-green'}>
          {change.trim().startsWith('-') || change.trim().startsWith('−') ? (
            <ArrowDownRight size={13} />
          ) : (
            <ArrowUpRight size={13} />
          )}
          {change}
        </span>
        {!warning && <span>vs. período anterior</span>}
      </div>
    </Card>
  )
}
export function DemoNotice({ children }: { children?: ReactNode }) {
  return (
    <div className="demo-notice">
      <span className="demo-dot" />
      <p>
        {children || 'Ambiente demonstrativo. Dados fictícios e ações locais, sem envios reais.'}
      </p>
    </div>
  )
}
