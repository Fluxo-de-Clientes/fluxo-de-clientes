<script setup lang="ts">
const columns = [
  {
    name: 'Em atendimento',
    tone: 'coral',
    contacts: [
      { name: 'Mariana Souza', initials: 'MS', source: 'Instagram', sourceIcon: 'i-lucide-instagram', nextStep: 'Entender a necessidade', owner: 'Ana' },
      { name: 'Carlos Lima', initials: 'CL', source: 'WhatsApp', sourceIcon: 'i-lucide-message-circle', nextStep: 'Confirmar o interesse', owner: 'Pedro' }
    ]
  },
  {
    name: 'Qualificados',
    tone: 'sage',
    contacts: [
      { name: 'Clínica Bem Viver', initials: 'BV', source: 'Indicação', sourceIcon: 'i-lucide-users-round', nextStep: 'Agendar uma conversa', owner: 'Ana' },
      { name: 'Mateus Ferreira', initials: 'MF', source: 'Site', sourceIcon: 'i-lucide-globe', nextStep: 'Preparar a proposta', owner: 'Luiza' }
    ]
  },
  {
    name: 'Propostas',
    tone: 'forest',
    contacts: [
      { name: 'Estúdio Aurora', initials: 'EA', source: 'Instagram', sourceIcon: 'i-lucide-instagram', nextStep: 'Revisar o escopo', owner: 'Pedro' },
      { name: 'Juliana Andrade', initials: 'JA', source: 'WhatsApp', sourceIcon: 'i-lucide-message-circle', nextStep: 'Acompanhar o retorno', owner: 'Luiza' }
    ]
  }
]

const contactCount = columns.reduce((total, column) => total + column.contacts.length, 0)
const searchId = useId()
const searchInput = ref<HTMLInputElement | null>(null)
const searchQuery = ref('')

function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR')
}

const filteredColumns = computed(() => {
  const query = normalizeSearch(searchQuery.value.trim())

  return columns.map(column => ({
    ...column,
    contacts: column.contacts.filter(contact => normalizeSearch([
      contact.name,
      contact.source,
      contact.nextStep,
      contact.owner,
      column.name
    ].join(' ')).includes(query))
  }))
})

const resultCount = computed(() => filteredColumns.value.reduce((total, column) => total + column.contacts.length, 0))

function clearSearch() {
  searchQuery.value = ''
  searchInput.value?.focus()
}
</script>

<template>
  <figure class="board-preview" aria-label="Funil de clientes por etapa de atendimento">
    <figcaption class="board-heading">
      <div class="board-heading-copy">
        <span class="board-heading-icon" aria-hidden="true"><UIcon name="i-lucide-panels-top-left" /></span>
        <div>
          <h3>Funil de clientes</h3>
          <p>{{ contactCount }} contatos · 3 etapas</p>
        </div>
      </div>
    </figcaption>

    <div class="board-search">
      <label :for="searchId">Buscar no funil</label>
      <div class="board-search-field">
        <UIcon name="i-lucide-search" aria-hidden="true" />
        <input :id="searchId" ref="searchInput" v-model="searchQuery" type="search" autocomplete="off" :aria-describedby="`${searchId}-hint`" />
        <UButton v-if="searchQuery" color="neutral" variant="ghost" class="board-clear-search" @click="clearSearch">Limpar</UButton>
      </div>
      <p :id="`${searchId}-hint`">Encontre por nome, canal, responsável ou próximo passo.</p>
    </div>

    <div class="board-columns">
      <section
        v-for="column in filteredColumns"
        :key="column.name"
        class="board-column"
        :class="`board-column-${column.tone}`"
        :aria-label="`${column.name}: ${column.contacts.length} contatos`"
      >
        <div class="board-column-heading">
          <span class="board-stage-dot" aria-hidden="true" />
          <h4>{{ column.name }}</h4>
          <span class="board-count" aria-hidden="true">{{ column.contacts.length }}</span>
        </div>

        <ul class="board-contact-list">
          <li v-for="contact in column.contacts" :key="contact.name" class="board-contact">
            <div class="board-contact-heading">
              <span class="board-avatar" aria-hidden="true">{{ contact.initials }}</span>
              <div class="board-contact-identity">
                <h5>{{ contact.name }}</h5>
                <p class="board-source"><UIcon :name="contact.sourceIcon" aria-hidden="true" />{{ contact.source }}</p>
              </div>
            </div>
            <div class="board-next-step">
              <span>Próximo passo</span>
              <p>{{ contact.nextStep }}</p>
            </div>
            <p class="board-owner"><UIcon name="i-lucide-user-round" aria-hidden="true" /><span>Responsável: <strong>{{ contact.owner }}</strong></span></p>
          </li>
        </ul>
        <p v-if="!column.contacts.length" class="board-empty">Nenhum contato nesta etapa corresponde à busca.</p>
      </section>
    </div>

    <p class="board-search-result" role="status">{{ searchQuery.trim() ? `${resultCount} de ${contactCount} contatos encontrados.` : '' }}</p>
  </figure>
</template>

<style scoped>
.board-preview {
  container-type: inline-size;
  width: 100%;
  min-width: 0;
  margin: 0;
  padding: 20px;
  border: 1px solid var(--preview-border, #dce2d7);
  border-radius: var(--preview-radius, 20px);
  background: #fff;
  color: #242c25;
  box-shadow: var(--preview-shadow, 0 16px 40px rgba(36, 44, 37, .07), 0 2px 6px rgba(36, 44, 37, .03));
}

.board-heading,
.board-heading-copy,
.board-column-heading,
.board-contact-heading,
.board-source,
.board-owner {
  display: flex;
  align-items: center;
}

.board-heading {
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 22px;
}

.board-heading-copy { gap: 12px; }
.board-heading-icon { display: grid; width: 40px; height: 40px; flex: 0 0 40px; place-items: center; border-radius: 12px; background: #f4f5ef; color: #69785e; }
.board-heading-icon :deep(svg), .board-heading-icon :deep(.iconify) { width: 20px; height: 20px; }
.board-heading h3 { margin: 0; font-size: 18px; font-weight: 750; line-height: 1.3; letter-spacing: -.3px; }
.board-heading-copy p { margin: 4px 0 0; color: #697269; font-size: 12px; line-height: 1.5; }
.board-search { margin-bottom: 20px; }
.board-search > label { display: block; margin-bottom: 7px; color: #4a5748; font-size: 12px; font-weight: 650; line-height: 1.4; }
.board-search-field { display: flex; align-items: center; gap: 8px; min-height: 44px; padding: 0 10px; border: 1px solid #dce2d7; border-radius: 9px; background: #f9faf7; color: #69785e; }
.board-search-field:focus-within { outline: 2px solid #69785e; outline-offset: 2px; }
.board-search-field > :deep(.iconify) { width: 16px; height: 16px; flex: 0 0 16px; }
.board-search-field input { width: 100%; min-width: 0; min-height: 42px; border: 0; outline: none; background: transparent; color: #242c25; font: inherit; font-size: 13px; }
.board-clear-search { min-height: 44px; flex: 0 0 auto; color: #4a5748; font-size: 12px; cursor: pointer; }
.board-clear-search:focus-visible { outline: 2px solid #69785e; outline-offset: 2px; }
.board-search > p { margin: 6px 0 0; color: #697269; font-size: 12px; line-height: 1.5; }
.board-columns { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.board-column { --board-accent: #c95a42; --board-tint: #fae9e2; min-width: 0; padding: 10px; border: 1px solid #e9ece6; border-radius: 12px; background: #f7f8f5; }
.board-column-sage { --board-accent: #6c7e56; --board-tint: #e8eedf; }
.board-column-forest { --board-accent: #456d5b; --board-tint: #e0ece5; }
.board-column-heading { gap: 7px; min-height: 30px; margin-bottom: 10px; }
.board-stage-dot { width: 7px; height: 7px; flex: 0 0 7px; border-radius: 50%; background: var(--board-accent); }
.board-column-heading h4 { flex: 1; margin: 0; font-size: 13px; font-weight: 700; line-height: 1.45; }
.board-count { display: grid; min-width: 23px; height: 23px; padding: 0 5px; place-items: center; border: 1px solid #e0e5d9; border-radius: 6px; background: #fff; color: #65705e; font-size: 12px; font-weight: 600; }
.board-contact-list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
.board-contact { min-width: 0; padding: 12px; border: 1px solid #e5e8e0; border-radius: 9px; background: #fff; box-shadow: 0 2px 3px rgba(36, 44, 37, .025); }
.board-contact-heading { align-items: flex-start; gap: 8px; min-height: 45px; }
.board-avatar { display: grid; width: 29px; height: 29px; flex: 0 0 29px; place-items: center; border-radius: 9px; background: var(--board-tint); color: var(--board-accent); font-size: 12px; font-weight: 700; }
.board-contact-identity { min-width: 0; }
.board-contact h5 { margin: 0; font-size: 13px; font-weight: 700; line-height: 1.4; overflow-wrap: anywhere; }
.board-source { gap: 4px; margin: 5px 0 0; color: #697269; font-size: 12px; line-height: 1.4; }
.board-source :deep(svg), .board-source :deep(.iconify), .board-owner :deep(svg), .board-owner :deep(.iconify) { width: 13px; height: 13px; flex: 0 0 13px; }
.board-next-step { margin: 14px 0 12px; }
.board-next-step > span { color: #697269; font-size: 12px; line-height: 1.5; }
.board-next-step p { min-height: 36px; margin: 3px 0 0; font-size: 13px; font-weight: 500; line-height: 1.4; }
.board-owner { flex-wrap: wrap; gap: 5px; margin: 0; padding-top: 10px; border-top: 1px solid #eff1eb; color: #697269; font-size: 12px; line-height: 1.5; }
.board-owner strong { color: #4a5748; font-weight: 600; }
.board-empty { margin: 0; padding: 14px 2px; color: #697269; font-size: 12px; line-height: 1.6; }
.board-search-result { margin: 15px 0 0; color: #697269; font-size: 12px; line-height: 1.5; }
.board-search-result:empty { margin: 0; }

@container (max-width: 560px) {
  .board-columns { grid-template-columns: 1fr; }
  .board-contact-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@container (max-width: 380px) {
  .board-contact-list { grid-template-columns: 1fr; }
  .board-contact-heading { min-height: 0; }
  .board-next-step p { min-height: 0; }
}

@media (max-width: 600px) {
  .board-preview { padding: 14px; border-radius: 16px; }
  .board-heading { gap: 12px; margin-bottom: 16px; }
  .board-columns { grid-template-columns: 1fr; }
}
</style>
