<script setup lang="ts">
import {
  ArrowRight,
  ArrowUp,
  ArrowLeft,
  ChevronDown,
  Menu,
  X,
  House,
  MessageSquare,
  Users,
  ChartNoAxesColumn,
  Settings,
  Megaphone,
  Funnel,
  Sparkles,
  Check,
  CircleCheck,
  ShieldCheck,
  Link,
  List,
  Store,
  Search,
  EllipsisVertical,
  Tag,
  User,
  Clock,
  Mail,
  ExternalLink,
  CircleAlert,
} from '@lucide/vue'
import type { IconName } from '~/types/content'

const props = withDefaults(defineProps<{ name: IconName; size?: number }>(), { size: 20 })
const icons = {
  'arrow-right': ArrowRight,
  'arrow-up': ArrowUp,
  'arrow-left': ArrowLeft,
  'chevron-down': ChevronDown,
  menu: Menu,
  close: X,
  home: House,
  messages: MessageSquare,
  users: Users,
  chart: ChartNoAxesColumn,
  settings: Settings,
  megaphone: Megaphone,
  funnel: Funnel,
  sparkles: Sparkles,
  check: Check,
  'check-circle': CircleCheck,
  shield: ShieldCheck,
  link: Link,
  list: List,
  store: Store,
  search: Search,
  more: EllipsisVertical,
  tag: Tag,
  user: User,
  clock: Clock,
  mail: Mail,
  external: ExternalLink,
  alert: CircleAlert,
}
</script>

<template>
  <component :is="icons[props.name]" :size="size" :stroke-width="1.7" aria-hidden="true" class="shrink-0" />
</template>
