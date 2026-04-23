<script setup lang="ts">
import type { ValidationErrorResponse, ValidationErrors } from '#shared/types/api'
import type { CreateBrokerPayload } from '#shared/types/broker'

const props = defineProps<{
  teamId: string
}>()

const emit = defineEmits<{
  created: []
}>()

const { createBroker } = useTeamsApi()
const isDialogOpen = ref(false)
const form = reactive<CreateBrokerPayload>({
  email: '',
  name: '',
})
const errorMessage = ref('')
const fieldErrors = reactive<Record<keyof CreateBrokerPayload, string>>({
  email: '',
  name: '',
})
const isSubmitting = ref(false)
const succeeded = ref(false)
const formId = 'create-broker-form'
const nameInput = ref<HTMLInputElement | null>(null)
let closeDialogTimeout: ReturnType<typeof setTimeout> | null = null

const clearCloseDialogTimeout = (): void => {
  if (!closeDialogTimeout) {
    return
  }

  clearTimeout(closeDialogTimeout)
  closeDialogTimeout = null
}

const clearFieldErrors = (): void => {
  fieldErrors.email = ''
  fieldErrors.name = ''
}

const resetForm = () => {
  form.email = ''
  form.name = ''
  clearFieldErrors()
}

const setFieldErrors = (errors: ValidationErrors): void => {
  fieldErrors.name = errors.name?.[0] ?? ''
  fieldErrors.email = errors.email?.[0] ?? ''
}

const getApiValidationPayload = (response?: ValidationErrorResponse) => {
  if (!response) {
    return {
      errors: {} as ValidationErrors,
      message: '',
    }
  }

  return {
    errors: response.data?.errors ?? response.errors ?? {},
    message: response.data?.message ?? response.message ?? '',
  }
}

const clearFieldError = (field: keyof CreateBrokerPayload): void => {
  fieldErrors[field] = ''
}

const isValidationErrorResponse = (error: unknown): error is {
  data?: ValidationErrorResponse
  status?: number
  statusCode?: number
} => {
  if (!error || typeof error !== 'object') {
    return false
  }

  return 'data' in error || 'status' in error || 'statusCode' in error
}

const openDialog = () => {
  clearCloseDialogTimeout()
  errorMessage.value = ''
  succeeded.value = false
  clearFieldErrors()
  isDialogOpen.value = true

  nextTick(() => {
    nameInput.value?.focus()
  })
}

const closeDialog = () => {
  if (isSubmitting.value) {
    return
  }

  isDialogOpen.value = false
  errorMessage.value = ''
  clearFieldErrors()
  clearCloseDialogTimeout()
}

const handleSubmit = async () => {
  if (isSubmitting.value) {
    return
  }

  errorMessage.value = ''
  clearFieldErrors()
  isSubmitting.value = true

  try {
    await createBroker(props.teamId, {
      email: form.email,
      name: form.name,
    })

    succeeded.value = true
    emit('created')

    clearCloseDialogTimeout()
    closeDialogTimeout = setTimeout(() => {
      closeDialogTimeout = null
      resetForm()
      isDialogOpen.value = false
      succeeded.value = false
    }, 1400)
  } catch (error: unknown) {
    if (isValidationErrorResponse(error)) {
      const statusCode = error.statusCode ?? error.status
      const apiPayload = getApiValidationPayload(error.data)

      if (statusCode === 422) {
        setFieldErrors(apiPayload.errors)
        errorMessage.value = apiPayload.message || 'Veuillez corriger les champs indiqués.'
        return
      }

      errorMessage.value = apiPayload.message || 'La création du courtier a échoué. Vérifiez les informations et réessayez.'
      return
    }

    errorMessage.value = 'La création du courtier a échoué. Vérifiez les informations et réessayez.'
  } finally {
    isSubmitting.value = false
  }
}

onBeforeUnmount(() => {
  clearCloseDialogTimeout()
})
</script>

<template>
  <button
    class="create-broker-action"
    type="button"
    @click="openDialog"
  >
    <span
      aria-hidden="true"
      class="create-broker-action__icon"
    >
      +
    </span>

    <span class="create-broker-action__copy">
      <span class="create-broker-action__label">
        Ajouter un courtier
      </span>
    </span>
  </button>

  <AppDialog
    :close-on-backdrop="!isSubmitting"
    :open="isDialogOpen"
    title="Ajouter un courtier"
    @close="closeDialog"
  >
    <form
      :id="formId"
      class="broker-form"
      @submit.prevent="handleSubmit"
    >
      <label class="field">
        <span class="field__label">Nom</span>
        <input
          ref="nameInput"
          v-model="form.name"
          :aria-invalid="fieldErrors.name ? 'true' : 'false'"
          autocomplete="name"
          :class="['field__input', { 'field__input--invalid': fieldErrors.name }]"
          maxlength="255"
          placeholder="Nom du courtier"
          required
          type="text"
          @input="clearFieldError('name')"
        >
        <span
          v-if="fieldErrors.name"
          class="field__error"
        >
          {{ fieldErrors.name }}
        </span>
      </label>

      <label class="field">
        <span class="field__label">Email</span>
        <input
          v-model="form.email"
          :aria-invalid="fieldErrors.email ? 'true' : 'false'"
          autocomplete="email"
          :class="['field__input', { 'field__input--invalid': fieldErrors.email }]"
          maxlength="255"
          placeholder="nom@entreprise.com"
          required
          type="email"
          @input="clearFieldError('email')"
        >
        <span
          v-if="fieldErrors.email"
          class="field__error"
        >
          {{ fieldErrors.email }}
        </span>
      </label>
    </form>

    <StateCard v-if="isSubmitting">
      Création du courtier en cours...
    </StateCard>

    <StateCard
      v-else-if="errorMessage"
      tone="error"
    >
      {{ errorMessage }}
    </StateCard>

    <StateCard
      v-else-if="succeeded"
      tone="success"
    >
      Courtier ajouté avec succès.
    </StateCard>

    <template #actions>
      <AppButton
        :disabled="isSubmitting"
        variant="ghost"
        @click="closeDialog"
      >
        Annuler
      </AppButton>

      <AppButton
        :disabled="isSubmitting || succeeded"
        :form="formId"
        type="submit"
        variant="primary"
      >
        {{ isSubmitting ? 'Création...' : 'Créer le courtier' }}
      </AppButton>
    </template>
  </AppDialog>
</template>

<style scoped>
.create-broker-action {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
  padding: 1.25rem;
  border: 1px solid rgba(29, 143, 86, 0.24);
  border-radius: 24px;
  background:
    linear-gradient(135deg, rgba(29, 143, 86, 0.14), rgba(255, 255, 255, 0.96)),
    var(--surface);
  box-shadow: var(--shadow);
  backdrop-filter: blur(20px);
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
}

.create-broker-action:hover {
  transform: translateY(-2px);
  border-color: rgba(29, 143, 86, 0.36);
  box-shadow: 0 22px 48px rgba(19, 35, 27, 0.14);
}

.create-broker-action:focus-visible {
  outline: none;
  border-color: rgba(29, 143, 86, 0.55);
  box-shadow: 0 0 0 4px rgba(29, 143, 86, 0.12);
}

.create-broker-action__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  background: rgba(16, 97, 58, 0.12);
  color: #10613a;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  flex: 0 0 auto;
}

.create-broker-action__copy {
  display: grid;
  gap: 0.3rem;
}

.create-broker-action__label {
  color: var(--accent-strong);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.broker-form {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
}

.field {
  display: grid;
  gap: 0.45rem;
}

.field__label {
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 700;
}

.field__input {
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  background: #fff;
  color: var(--text-primary);
  transition: border-color 180ms ease, box-shadow 180ms ease;
}

.field__input:focus {
  outline: none;
  border-color: rgba(29, 143, 86, 0.5);
  box-shadow: 0 0 0 4px rgba(29, 143, 86, 0.12);
}

.field__input--invalid {
  border-color: rgba(185, 59, 59, 0.55);
  background: rgba(185, 59, 59, 0.04);
}

.field__input--invalid:focus {
  border-color: rgba(185, 59, 59, 0.7);
  box-shadow: 0 0 0 4px rgba(185, 59, 59, 0.12);
}

.field__error {
  color: #8a2c2c;
  font-size: 0.85rem;
  line-height: 1.4;
}

:deep(.dialog__body .state-card) {
  margin-bottom: 1rem;
}
</style>
