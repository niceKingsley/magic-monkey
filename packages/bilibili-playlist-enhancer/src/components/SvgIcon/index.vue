<template>
  <svg v-if="icon" :viewBox="icon.viewBox || '0 0 24 24'" aria-hidden="true" class="icon">
    <path :d="icon.d" :fill-rule="icon.fillRule" :clip-rule="icon.clipRule" fill="currentColor" />
  </svg>
</template>

<script setup>
import { ICONS } from './icons';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const icon = computed(() => ICONS[props.name]);
</script>
