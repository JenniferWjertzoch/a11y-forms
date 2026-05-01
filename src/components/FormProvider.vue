<script setup lang="ts">
import { provide, nextTick, ref } from 'vue'
import { useForm } from '@/composables/useForm'

const emit = defineEmits(['submit', 'invalid'])
const form = useForm()
const errorSummary = ref('')

provide('formContext', {
  registerField: form.registerField,
  unregisterField: form.unregisterField,
})

async function handleSubmit() {
  await nextTick()
  const { isValid, firstInvalidField } = await form.validateAll()

  if (isValid) {
    errorSummary.value = ''
    emit('submit')
    form.resetAll()
    return
  }

  errorSummary.value = 'Bitte überprüfe die markierten Felder und versuche es erneut.'

  if (firstInvalidField) {
    form.focusField(firstInvalidField)
  }

  emit('invalid', { firstInvalidField })
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <p v-if="errorSummary" role="alert" aria-live="polite" class="form-error-summary">
      {{ errorSummary }}
    </p>
    <slot />
  </form>
</template>

<style scoped>
.form-error-summary {
  color: #a70000;
  margin: 0 0 0.75rem;
}
</style>
