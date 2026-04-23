<script setup lang="ts">
const props = withDefaults(defineProps<{
  closeOnBackdrop?: boolean
  open: boolean
  title: string
}>(), {
  closeOnBackdrop: true,
})

const emit = defineEmits<{
  close: []
}>()

const dialogRef = ref<HTMLElement | null>(null)
const titleId = useId()
let previouslyFocusedElement: HTMLElement | null = null

const getFocusableElements = (): HTMLElement[] => {
  if (!dialogRef.value) {
    return []
  }

  return Array.from(
    dialogRef.value.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute('hidden') && element.getAttribute('aria-hidden') !== 'true')
}

const focusDialog = async (): Promise<void> => {
  await nextTick()

  const [firstFocusableElement] = getFocusableElements()

  if (firstFocusableElement) {
    firstFocusableElement.focus()
    return
  }

  dialogRef.value?.focus()
}

const handleBackdropClick = () => {
  emit('close')
}

const handleKeydown = (event: KeyboardEvent): void => {
  if (!props.open) {
    return
  }

  if (event.key === 'Escape') {
    if (!props.closeOnBackdrop) {
      return
    }

    event.preventDefault()
    emit('close')
    return
  }

  if (event.key !== 'Tab') {
    return
  }

  const focusableElements = getFocusableElements()

  if (!focusableElements.length) {
    event.preventDefault()
    dialogRef.value?.focus()
    return
  }

  const firstFocusableElement = focusableElements[0]
  const lastFocusableElement = focusableElements[focusableElements.length - 1]

  if (!firstFocusableElement || !lastFocusableElement) {
    event.preventDefault()
    dialogRef.value?.focus()
    return
  }

  const activeElement = document.activeElement

  if (event.shiftKey && activeElement === firstFocusableElement) {
    event.preventDefault()
    lastFocusableElement.focus()
    return
  }

  if (!event.shiftKey && activeElement === lastFocusableElement) {
    event.preventDefault()
    firstFocusableElement.focus()
  }
}

watch(() => props.open, async (isOpen) => {
  if (!import.meta.client) {
    return
  }

  if (isOpen) {
    previouslyFocusedElement = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null

    window.addEventListener('keydown', handleKeydown)
    await focusDialog()
    return
  }

  window.removeEventListener('keydown', handleKeydown)
  previouslyFocusedElement?.focus()
  previouslyFocusedElement = null
}, {
  immediate: true,
})

onBeforeUnmount(() => {
  if (!import.meta.client) {
    return
  }

  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="dialog-backdrop"
      @click.self="closeOnBackdrop ? handleBackdropClick() : undefined"
    >
      <section
        ref="dialogRef"
        class="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        role="dialog"
        tabindex="-1"
      >
        <h2 :id="titleId">
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
