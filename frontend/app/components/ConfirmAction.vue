<script setup lang="ts">
const props = withDefaults(defineProps<{
  action: () => Promise<unknown>
  cancelLabel?: string
  confirmLabel: string
  description: string
  errorMessage: string
  pendingLabel?: string
  successLabel?: string
  successRedirectDelayMs?: number
  successRedirectTo?: string
  title: string
  triggerLabel: string
  triggerVariant?: 'danger' | 'ghost'
}>(), {
  cancelLabel: 'Annuler',
  pendingLabel: 'Traitement en cours...',
  successLabel: 'Action complétée.',
  successRedirectDelayMs: 1800,
  successRedirectTo: undefined,
  triggerVariant: 'ghost',
})

const router = useRouter()
const isDialogOpen = ref(false)
const currentErrorMessage = ref('')
const isSubmitting = ref(false)
const succeeded = ref(false)

const openDialog = () => {
  currentErrorMessage.value = ''
  succeeded.value = false
  isDialogOpen.value = true
}

const closeDialog = () => {
  if (isSubmitting.value) {
    return
  }

  isDialogOpen.value = false
  currentErrorMessage.value = ''
}

const handleConfirm = async () => {
  if (isSubmitting.value) {
    return
  }

  currentErrorMessage.value = ''
  isSubmitting.value = true

  try {
    await props.action()
    succeeded.value = true

    if (props.successRedirectTo) {
      setTimeout(async () => {
        await router.push(props.successRedirectTo)
      }, props.successRedirectDelayMs)
    }
  } catch {
    currentErrorMessage.value = props.errorMessage
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="confirm-action">
    <AppButton
      :variant="triggerVariant"
      @click="openDialog"
    >
      {{ triggerLabel }}
    </AppButton>

    <AppDialog
      :close-on-backdrop="!isSubmitting"
      :open="isDialogOpen"
      :title="title"
      @close="closeDialog"
    >
      <p class="dialog-copy">
        {{ description }}
      </p>

      <StateCard v-if="isSubmitting">
        {{ pendingLabel }}
      </StateCard>

      <StateCard
        v-else-if="currentErrorMessage"
        tone="error"
      >
        {{ currentErrorMessage }}
      </StateCard>

      <StateCard
        v-else-if="succeeded"
        tone="success"
      >
        {{ successLabel }}
      </StateCard>

      <template #actions>
        <AppButton
          :disabled="isSubmitting || succeeded"
          variant="ghost"
          @click="closeDialog"
        >
          {{ cancelLabel }}
        </AppButton>

        <AppButton
          :disabled="isSubmitting || succeeded"
          variant="danger"
          @click="handleConfirm"
        >
          {{ isSubmitting ? pendingLabel : confirmLabel }}
        </AppButton>
      </template>
    </AppDialog>
  </div>
</template>

<style scoped>
.confirm-action {
  display: flex;
  justify-content: flex-end;
}

.dialog-copy {
  margin: 0 0 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

:deep(.dialog__body .state-card) {
  margin-bottom: 1rem;
}

@media (max-width: 640px) {
  .confirm-action {
    justify-content: stretch;
  }
}
</style>
