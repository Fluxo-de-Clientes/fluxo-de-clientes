<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { demoContacts, stages } from '~/data/content'
import type { Stage } from '~/types/content'

const contacts = ref(demoContacts.map((contact) => ({ ...contact })))
const query = ref('')
const searchOpen = ref(false)
const searchInput = ref<HTMLInputElement>()
const selectedId = ref<string | null>(null)
const selected = computed(() => contacts.value.find((contact) => contact.id === selectedId.value))
const feedback = ref('')
const filtered = computed(() =>
  contacts.value.filter((contact) =>
    `${contact.name} ${contact.source}`
      .toLocaleLowerCase('pt-BR')
      .includes(query.value.toLocaleLowerCase('pt-BR')),
  ),
)

async function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (!searchOpen.value) query.value = ''
  else {
    await nextTick()
    searchInput.value?.focus()
  }
}

function changeStage(event: Event) {
  const target = event.target as HTMLSelectElement
  if (selected.value && stages.includes(target.value as Stage)) {
    selected.value.stage = target.value as Stage
    feedback.value = `Etapa alterada para ${target.value} neste exemplo.`
  }
}

function explore() {
  feedback.value = ''
  selectedId.value = contacts.value[0]?.id ?? null
}

function openContact(id: string) {
  selectedId.value = id
  feedback.value = ''
}
defineExpose({ explore })
</script>

<template>
  <div id="funil-board" class="pipeline-shell">
    <div class="od-row justify-between gap-3 mb-4">
      <div class="od-row gap-3">
        <AppIcon name="funnel" :size="18" />
        <h3 class="font-semibold">Funil de clientes</h3>
      </div>
      <button
        class="icon-button bg-white"
        aria-label="Buscar contato demonstrativo"
        :aria-expanded="searchOpen"
        aria-controls="contact-search"
        @click="toggleSearch"
      >
        <AppIcon name="search" :size="18" />
      </button>
    </div>
    <div v-if="searchOpen" id="contact-search" class="mb-4">
      <label class="field-label" for="funnel-search">Buscar por nome ou origem</label>
      <input
        id="funnel-search"
        ref="searchInput"
        v-model="query"
        type="search"
        class="field-input"
        placeholder="Ex.: Mariana"
      />
    </div>
    <div class="grid md:grid-cols-3 gap-2">
      <section v-for="stage in stages" :key="stage" class="pipeline-column" :aria-label="stage">
        <h4 class="od-row justify-between text-sm font-medium mb-1">
          <span>{{ stage }}</span
          ><span class="text-muted text-xs"
            >({{ filtered.filter((contact) => contact.stage === stage).length }})</span
          >
        </h4>
        <button
          v-for="contact in filtered.filter((item) => item.stage === stage)"
          :key="contact.id"
          class="contact-card"
          :aria-label="`Ver contato demonstrativo: ${contact.name}`"
          @click="openContact(contact.id)"
        >
          <span class="avatar" :class="`avatar--${contact.tone}`">{{ contact.initials }}</span>
          <span class="od-field od-fill"
            ><span class="od-truncate text-xs font-medium">{{ contact.name }}</span
            ><span class="od-truncate text-xs text-muted"
              >{{ contact.source }} · {{ contact.activity }}</span
            ></span
          >
          <AppIcon name="more" :size="12" />
        </button>
        <p v-if="!filtered.some((contact) => contact.stage === stage)" class="text-sm text-muted py-4">
          Nenhum contato nesta etapa{{ query ? ' para a busca.' : '.' }}
        </p>
      </section>
    </div>
    <p class="text-xs text-muted mt-3">Exemplo ilustrativo · Selecione um contato para explorar.</p>
    <BaseDialog
      :open="Boolean(selected)"
      :title="selected?.name ?? 'Contato'"
      description="Contato fictício · Exemplo ilustrativo"
      @close="selectedId = null"
    >
      <template v-if="selected">
        <dl class="grid grid-cols-2 gap-4">
          <div class="od-field">
            <dt class="text-sm text-muted">Origem</dt>
            <dd class="font-medium">{{ selected.source }}</dd>
          </div>
          <div class="od-field">
            <dt class="text-sm text-muted">Responsável</dt>
            <dd class="font-medium">{{ selected.owner }}</dd>
          </div>
          <div class="od-field col-span-2">
            <dt class="text-sm text-muted">Última atividade</dt>
            <dd class="font-medium">{{ selected.activity }}</dd>
          </div>
        </dl>
        <div class="mt-6">
          <label for="contact-stage" class="field-label">Etapa do funil</label
          ><select id="contact-stage" :value="selected.stage" class="field-input" @change="changeStage">
            <option v-for="stage in stages" :key="stage">{{ stage }}</option>
          </select>
        </div>
        <div class="mt-6 border-t border-border pt-6">
          <h3 class="font-semibold mb-2">Histórico da conversa</h3>
          <p class="text-muted">{{ selected.history }}</p>
        </div>
        <p class="text-sm text-muted mt-4" role="status">
          {{
            feedback || 'Você pode mudar a etapa para experimentar. As alterações ficam apenas nesta página.'
          }}
        </p>
        <BaseButton variant="secondary" class="mt-6" @click="selectedId = null">Voltar ao funil</BaseButton>
      </template>
    </BaseDialog>
  </div>
</template>
