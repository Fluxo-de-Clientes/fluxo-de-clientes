import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Phone, Mail, Clock, MessageSquare } from 'lucide-react'
import { toast } from 'sonner'
import { useOrgData } from '../../app/store'
import { owners } from '../../data/mock'
import { contactSchema, type ContactFormValues } from '../../lib/csv'
import { dateLabel, relative } from '../../lib/utils'
import { stages, type PipelineStage } from '../../types'
import { Button } from '../ui/button'
import { Select, Input, Avatar, Status, Badge, Modal, DemoNotice } from '../ui/primitives'
export function NewContact({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (v: boolean) => void
}) {
  const app = useOrgData()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { origin: 'Site', owner: owners[0] },
  })
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Uma nova conversa começa aqui"
      description="Cadastre um contato fictício para explorar o fluxo."
    >
      <form
        className="form-stack"
        onSubmit={handleSubmit((values) => {
          if (app.contacts.some((c) => c.email.toLowerCase() === values.email.toLowerCase())) {
            toast.error('Este e-mail já existe nesta organização.')
            return
          }
          if (app.addContact(values)) {
            toast.success('Contato criado e adicionado à Entrada.')
            reset()
            onOpenChange(false)
          }
        })}
      >
        <div className="form-grid">
          <Input
            label="Nome completo"
            autoComplete="off"
            {...register('name')}
            error={errors.name?.message}
          />
          <Input label="Empresa" {...register('company')} error={errors.company?.message} />
          <Input label="E-mail" type="email" {...register('email')} error={errors.email?.message} />
          <Input label="Telefone" {...register('phone')} error={errors.phone?.message} />
          <Select label="Origem" {...register('origin')}>
            {['Site', 'Instagram', 'WhatsApp', 'Indicação', 'Importação CSV'].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </Select>
          <Select label="Responsável" {...register('owner')}>
            {owners.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </Select>
        </div>
        <DemoNotice>Use informações fictícias. O contato fica apenas nesta sessão.</DemoNotice>
        <div className="modal-actions">
          <Button type="button" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary" disabled={app.readOnly}>
            <Plus size={16} />
            Criar contato
          </Button>
        </div>
      </form>
    </Modal>
  )
}
export function ContactDetail({
  contactId,
  onClose,
}: {
  contactId: string | null
  onClose: () => void
}) {
  const app = useOrgData(),
    contact = app.contacts.find((c) => c.id === contactId)
  const [note, setNote] = useState('')
  return (
    <Modal
      open={!!contact}
      onOpenChange={(v) => {
        if (!v) onClose()
      }}
      title="Detalhes do contato"
      drawer
    >
      {contact && (
        <div className="contact-detail">
          <div className="contact-profile">
            <Avatar name={contact.name} />
            <div>
              <h2>{contact.name}</h2>
              <p>{contact.company}</p>
            </div>
            <Status value={contact.status} />
          </div>
          <div className="detail-contact">
            <p>
              <Mail size={16} />
              {contact.email}
            </p>
            <p>
              <Phone size={16} />
              {contact.phone}
            </p>
          </div>
          <div className="tag-row">
            {contact.tags.map((t) => (
              <Badge key={t} icon={false}>
                {t}
              </Badge>
            ))}
          </div>
          <div className="form-grid">
            <Select
              label="Etapa do funil"
              value={contact.stage}
              disabled={app.readOnly}
              onChange={(e) => {
                app.updateContact(contact.id, {
                  stage: e.target.value as PipelineStage,
                  lastActivity: new Date().toISOString(),
                })
                toast.success('Etapa atualizada.')
              }}
            >
              {stages.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Select>
            <Select
              label="Responsável"
              value={contact.owner}
              disabled={app.readOnly}
              onChange={(e) => {
                app.updateContact(contact.id, { owner: e.target.value })
                toast.success('Responsável atualizado.')
              }}
            >
              {owners.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </Select>
          </div>
          <div className="detail-facts">
            <div>
              <span>Origem</span>
              <strong>{contact.origin}</strong>
            </div>
            <div>
              <span>Pontuação</span>
              <strong>{contact.score} / 100</strong>
            </div>
            <div>
              <span>Última atividade</span>
              <strong>{relative(contact.lastActivity)}</strong>
            </div>
            <div>
              <span>Próximo passo</span>
              <strong>{contact.nextStep}</strong>
            </div>
          </div>
          <section>
            <h3>Notas internas</h3>
            {contact.notes.map((n, i) => (
              <div className="note" key={i}>
                <MessageSquare size={15} />
                <p>{n}</p>
              </div>
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (note.trim()) {
                  app.updateContact(contact.id, { notes: [...contact.notes, note.trim()] })
                  app.addActivity('Nota adicionada ao contato', contact.id)
                  setNote('')
                  toast.success('Nota adicionada.')
                }
              }}
            >
              <label className="field">
                <span>Adicionar nota</span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Registre o contexto para a equipe..."
                  required
                  maxLength={2000}
                />
              </label>
              <Button type="submit" size="sm" disabled={app.readOnly}>
                Salvar nota
              </Button>
            </form>
          </section>
          <section>
            <h3>Histórico de atividades</h3>
            <ol className="timeline">
              {app.activities
                .filter((a) => a.contactId === contact.id)
                .map((a) => (
                  <li key={a.id}>
                    <Clock size={14} />
                    <div>
                      {a.text}
                      <small>{dateLabel(a.date)}</small>
                    </div>
                  </li>
                ))}
              <li>
                <Plus size={14} />
                <div>
                  Contato cadastrado via {contact.origin}
                  <small>{dateLabel(contact.createdAt)}</small>
                </div>
              </li>
            </ol>
          </section>
        </div>
      )}
    </Modal>
  )
}
