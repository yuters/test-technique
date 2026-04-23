<script setup lang="ts">
withDefaults(defineProps<{
  closeOnBackdrop?: boolean
  open: boolean
  title: string
}>(), {
  closeOnBackdrop: true,
})

const emit = defineEmits<{
  close: []
}>()

const handleBackdropClick = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="dialog-backdrop"
      @click.self="closeOnBackdrop ? handleBackdropClick() : undefined"
    >
      <section
        class="dialog"
        aria-modal="true"
        aria-labelledby="app-dialog-title"
        role="dialog"
      >
        <h2 id="app-dialog-title">
          {{ title }}
        </h2>

        <div class="dialog__body">
          <slot />
        </div>

        <div
          v-if="$slots.actions"
          class="dialog__actions"
        >
          <slot name="actions" />
        </div>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(19, 35, 27, 0.4);
  backdrop-filter: blur(6px);
}

.dialog {
  width: min(32rem, 100%);
  padding: 1.5rem;
  border: 1px solid var(--surface-border);
  border-radius: 28px;
  background: var(--surface-strong);
  box-shadow: 0 30px 80px rgba(19, 35, 27, 0.2);
}

.dialog h2 {
  margin: 0 0 0.75rem;
  font-size: 1.4rem;
}

.dialog__body {
  color: var(--text-secondary);
}

.dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1rem;
}

@media (max-width: 640px) {
  .dialog__actions {
    flex-direction: column-reverse;
    justify-content: stretch;
  }
}
</style>
