<script setup lang="ts">
import { ref } from 'vue'
const expanded = ref(false)
const created = ref<string[]>([])
const suggestions = [
  {
    id: 'return',
    title: 'Retomar a conversa com Studio Criativo',
    description: 'Revisar o histórico e verificar se há dúvidas sobre a proposta.',
  },
  {
    id: 'context',
    title: 'Organizar o próximo contato com Mariana',
    description: 'Identificar a necessidade e definir um responsável pelo retorno.',
  },
]
</script>

<template>
  <div class="ai-panel" data-dark>
    <div class="od-cluster justify-between gap-3 mb-4">
      <div class="od-row gap-3">
        <BrandLogo symbol />
        <h3 class="font-semibold">Assistente de análise</h3>
      </div>
      <span class="demo-badge demo-badge--dark">Exemplo ilustrativo</span>
    </div>
    <div class="ai-inner">
      <div class="od-row-top gap-4">
        <AppIcon name="sparkles" :size="32" class="text-brand mt-1" />
        <div class="od-field od-fill">
          <h4 class="font-semibold text-lg leading-snug">Há conversas aguardando retorno.</h4>
          <p class="mt-2 text-dark-muted leading-normal">
            Alguns contatos estão sem atividade há mais de 3 dias. Reveja e defina o próximo passo.
          </p>
          <button
            class="button button--light justify-self-start mt-4"
            :aria-expanded="expanded"
            aria-controls="ai-suggestions"
            @click="expanded = !expanded"
          >
            {{ expanded ? 'Recolher sugestões' : 'Revisar sugestões' }}
          </button>
        </div>
      </div>
      <div v-if="expanded" id="ai-suggestions" class="od-stack gap-4 mt-6 border-t border-white/20 pt-5">
        <div v-for="suggestion in suggestions" :key="suggestion.id" class="od-stack gap-2">
          <h5 class="font-semibold">{{ suggestion.title }}</h5>
          <p class="text-dark-muted text-sm">{{ suggestion.description }}</p>
          <button
            class="text-link self-start text-sm"
            :disabled="created.includes(suggestion.id)"
            @click="created.push(suggestion.id)"
          >
            <AppIcon :name="created.includes(suggestion.id) ? 'check-circle' : 'list'" :size="16" />{{
              created.includes(suggestion.id) ? 'Tarefa criada no exemplo' : 'Criar tarefa no exemplo'
            }}
          </button>
        </div>
        <p class="text-dark-muted text-xs" role="status">
          {{
            created.length
              ? `${created.length} tarefa(s) criada(s) apenas nesta demonstração.`
              : 'Revise cada sugestão antes de agir. Nenhuma mensagem real será enviada.'
          }}
        </p>
      </div>
    </div>
    <div class="ai-inner mt-4">
      <h4 class="font-semibold text-sm mb-4">Sugestão de automação</h4>
      <ol class="list-none p-0 m-0 flex flex-col sm:flex-row gap-4 sm:gap-2 sm:items-center justify-between">
        <li class="od-row gap-3">
          <span class="flex items-center justify-center size-11 rounded-control bg-paper/15"
            ><AppIcon name="user" :size="24" /></span
          ><span class="text-sm">Novo contato</span>
        </li>
        <li aria-hidden="true" class="text-dark-muted pl-3 sm:pl-0">
          <AppIcon name="arrow-right" :size="20" class="rotate-90 sm:rotate-0" />
        </li>
        <li class="od-row gap-3">
          <span class="flex items-center justify-center size-11 rounded-control bg-paper/15"
            ><AppIcon name="messages" :size="24" /></span
          ><span class="text-sm">Enviar mensagem</span>
        </li>
        <li aria-hidden="true" class="text-dark-muted pl-3 sm:pl-0">
          <AppIcon name="arrow-right" :size="20" class="rotate-90 sm:rotate-0" />
        </li>
        <li class="od-row gap-3">
          <span class="flex items-center justify-center size-11 rounded-control bg-brand/20"
            ><AppIcon name="tag" :size="24" /></span
          ><span class="text-sm">Criar tarefa</span>
        </li>
      </ol>
    </div>
  </div>
</template>
