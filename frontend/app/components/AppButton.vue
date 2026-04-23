<script setup lang="ts">
withDefaults(defineProps<{
  disabled?: boolean
  size?: 'md' | 'sm'
  type?: 'button' | 'submit' | 'reset'
  variant?: 'danger' | 'ghost' | 'primary'
}>(), {
  disabled: false,
  size: 'md',
  type: 'button',
  variant: 'ghost',
})
</script>

<template>
  <button
    :class="[
      'app-button',
      `app-button--${variant}`,
      `app-button--${size}`,
    ]"
    :disabled="disabled"
    :type="type"
  >
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  border-radius: 999px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 180ms ease, border-color 180ms ease, color 180ms ease, opacity 180ms ease;
}

.app-button--md {
  padding: 0.8rem 1.15rem;
}

.app-button--sm {
  padding: 0.65rem 0.95rem;
}

.app-button--danger {
  background: #b93b3b;
  color: #fff;
}

.app-button--danger:hover:not(:disabled) {
  background: #9f2929;
}

.app-button--primary {
  background: var(--accent-strong);
  color: #fff;
}

.app-button--primary:hover:not(:disabled) {
  background: #0d5231;
}

.app-button--ghost {
  border-color: var(--surface-border);
  background: var(--surface-strong);
  color: var(--text-primary);
}

.app-button--ghost:hover:not(:disabled) {
  border-color: rgba(18, 40, 30, 0.16);
}

.app-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

@media (max-width: 640px) {
  .app-button {
    width: 100%;
  }
}
</style>
