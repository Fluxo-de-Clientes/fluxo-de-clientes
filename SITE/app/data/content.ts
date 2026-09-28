import type { DemoContact, Feature, Stage } from '~/types/content'

export const navigation = [
  { label: 'Plataforma', href: '#plataforma' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Perguntas', href: '#perguntas' },
]

export const features: Feature[] = [
  { title: 'Marketing', description: 'Veja a origem dos contatos.', icon: 'megaphone' },
  { title: 'Funil de clientes', description: 'Acompanhe cada etapa.', icon: 'funnel' },
  { title: 'Atendimento', description: 'Organize conversas e responsáveis.', icon: 'messages' },
  { title: 'IA para negócios', description: 'Encontre pontos de atenção.', icon: 'sparkles' },
  { title: 'Automações', description: 'Agilize tarefas recorrentes.', icon: 'settings' },
  { title: 'Análise e decisão', description: 'Use os dados para escolher o próximo passo.', icon: 'chart' },
]

export const steps: Feature[] = [
  {
    title: 'Conecte seus canais',
    description: 'Integre os seus canais de comunicação em um só lugar.',
    icon: 'link',
  },
  {
    title: 'Organize a operação',
    description: 'Defina etapas, responsáveis e regras do seu processo.',
    icon: 'list',
  },
  {
    title: 'Acompanhe e ajuste',
    description: 'Use os dados para identificar o que pode melhorar.',
    icon: 'chart',
  },
]

export const audiences: Feature[] = [
  {
    title: 'Negócios locais',
    description: 'Centralize o atendimento e acompanhe seus clientes do dia a dia.',
    icon: 'store',
  },
  {
    title: 'Agências e consultores',
    description: 'Organize campanhas, conversas e próximos passos de cada operação.',
    icon: 'users',
  },
  {
    title: 'Equipes comerciais',
    description: 'Dê visibilidade ao funil e mantenha o time alinhado com os próximos passos.',
    icon: 'chart',
  },
]

export const faqs = [
  {
    question: 'Como a plataforma ajuda no atendimento?',
    answer:
      'A proposta é reunir o contexto das conversas, as etapas do funil e os responsáveis em um mesmo fluxo. Assim, a equipe consegue entender o que já aconteceu e organizar o próximo contato. Na demonstração, você pode conhecer os recursos disponíveis para a sua operação.',
  },
  {
    question: 'A IA pode apoiar a minha equipe?',
    answer:
      'A IA pode apoiar a leitura de informações com resumos, sinais de atenção e sugestões de próximos passos. A equipe continua responsável por revisar o contexto e decidir o que fazer. Os painéis desta página são exemplos ilustrativos.',
  },
  {
    question: 'Como conhecer os recursos disponíveis?',
    answer:
      'Solicite uma demonstração para conversar sobre a sua operação e conhecer os recursos disponíveis. A apresentação ajuda a avaliar quais fluxos fazem sentido para os seus canais, sua rotina e sua equipe.',
  },
]

export const stages: Stage[] = ['Em atendimento', 'Qualificados', 'Propostas']

export const demoContacts: DemoContact[] = [
  {
    id: 'c1',
    name: 'Mariana Souza',
    initials: 'MS',
    stage: 'Em atendimento',
    source: 'Instagram',
    activity: 'há 2 horas',
    owner: 'Ana',
    tone: 'orange',
    history: 'Perguntou sobre os serviços e aguarda um primeiro retorno da equipe.',
  },
  {
    id: 'c2',
    name: 'Carlos Lima',
    initials: 'CL',
    stage: 'Em atendimento',
    source: 'WhatsApp',
    activity: 'há 3 horas',
    owner: 'Bruno',
    tone: 'neutral',
    history: 'Compartilhou o contexto da operação. Próximo passo: entender sua necessidade.',
  },
  {
    id: 'c3',
    name: 'Empresa Aurora',
    initials: 'EA',
    stage: 'Em atendimento',
    source: 'Indicação',
    activity: 'há 1 dia',
    owner: 'Ana',
    tone: 'paper',
    history: 'Chegou por indicação e pediu informações sobre uma demonstração.',
  },
  {
    id: 'c4',
    name: 'Paula Martins',
    initials: 'PM',
    stage: 'Em atendimento',
    source: 'Site',
    activity: 'há 1 dia',
    owner: 'Bruno',
    tone: 'neutral',
    history: 'Entrou em contato pelo site. Ainda falta combinar um horário de conversa.',
  },
  {
    id: 'c5',
    name: 'Clínica Bem Viver',
    initials: 'BV',
    stage: 'Qualificados',
    source: 'WhatsApp',
    activity: 'há 2 horas',
    owner: 'Ana',
    tone: 'neutral',
    history: 'Necessidade identificada: organizar as conversas da recepção e os retornos.',
  },
  {
    id: 'c6',
    name: 'Mateus Ferreira',
    initials: 'MF',
    stage: 'Qualificados',
    source: 'Site',
    activity: 'há 5 horas',
    owner: 'Bruno',
    tone: 'paper',
    history: 'Contexto registrado. Próximo passo: apresentar um fluxo adequado à equipe.',
  },
  {
    id: 'c7',
    name: 'Estúdio Horizonte',
    initials: 'EH',
    stage: 'Qualificados',
    source: 'Instagram',
    activity: 'há 1 dia',
    owner: 'Ana',
    tone: 'orange',
    history: 'Busca visibilidade sobre os contatos que chegam pelas campanhas.',
  },
  {
    id: 'c8',
    name: 'Juliana Andrade',
    initials: 'JA',
    stage: 'Qualificados',
    source: 'Indicação',
    activity: 'há 1 dia',
    owner: 'Bruno',
    tone: 'neutral',
    history: 'Conversou com a equipe sobre o acompanhamento de propostas.',
  },
  {
    id: 'c9',
    name: 'Agência Horizonte',
    initials: 'AH',
    stage: 'Propostas',
    source: 'Site',
    activity: 'há 1 hora',
    owner: 'Ana',
    tone: 'orange',
    history: 'Proposta compartilhada. Aguardar avaliação e combinar o próximo retorno.',
  },
  {
    id: 'c10',
    name: 'Ricardo Nunes',
    initials: 'RN',
    stage: 'Propostas',
    source: 'WhatsApp',
    activity: 'há 1 dia',
    owner: 'Bruno',
    tone: 'neutral',
    history: 'Solicitou esclarecimentos sobre o escopo apresentado.',
  },
  {
    id: 'c11',
    name: 'Studio Criativo',
    initials: 'SC',
    stage: 'Propostas',
    source: 'Indicação',
    activity: 'há 3 dias',
    owner: 'Ana',
    tone: 'paper',
    history: 'Sem atividade há três dias. Revisar a conversa antes do próximo contato.',
  },
  {
    id: 'c12',
    name: 'Fernanda Alves',
    initials: 'FA',
    stage: 'Propostas',
    source: 'Instagram',
    activity: 'há 2 dias',
    owner: 'Bruno',
    tone: 'paper',
    history: 'Avaliando a proposta. Próximo passo: confirmar se há dúvidas.',
  },
]
