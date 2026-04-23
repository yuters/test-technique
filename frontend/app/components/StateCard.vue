<script setup lang="ts">
withDefaults(defineProps<{
  tone?: 'default' | 'error' | 'success'
}>(), {
  tone: 'default',
})
</script>

<template>
  <p
    class="state-card"
    :class="{
      'state-card--error': tone === 'error',
      'state-card--success': tone === 'success',
    }"
  >
    <span
      v-if="tone === 'success'"
      aria-hidden="true"
      class="state-card__icon"
    >
      ✓
    </span>
    <slot />
  </p>
</template>

<style scoped>
.state-card {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 1.25rem;
  border: 1px solid var(--surface-border);
  border-radius: 24px;
  background: var(--surface);
  box-shadow: var(--shadow);
  backdrop-filter: blur(20px);
  color: var(--text-secondary);
}

.state-card--error {
  color: #8a2c2c;
}

.state-card--success {
  border-color: rgba(29, 143, 86, 0.22);
  background: rgba(29, 143, 86, 0.12);
  color: #10613a;
}

.state-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 999px;
  background: rgba(16, 97, 58, 0.12);
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1;
  flex: 0 0 auto;
}
</style>
