<script setup lang="ts">
import { provide, nextTick, ref } from 'vue'
import { useForm } from '@/composables/useForm'

const props = withDefaults(
  defineProps<{
    onSubmit?: () => void | Promise<void>
    submittingLabel?: string
  }>(),
  {
    onSubmit: undefined,
    submittingLabel: 'Submitting…',
  }
)

const emit = defineEmits(['invalid'])
const form = useForm()
const errorSummary = ref('')
const isSubmitting = ref(false)

provide('formContext', {
  registerField: form.registerField,
  unregisterField: form.unregisterField,
})

async function handleSubmit() {
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true

  try {
    await nextTick()
    const { isValid, firstInvalidField } = await form.validateAll()

    if (isValid) {
      errorSummary.value = ''
      await props.onSubmit?.()
      form.resetAll()
      return
    }

    errorSummary.value = 'Please review the highlighted fields and try again.'

    if (firstInvalidField) {
      form.focusField(firstInvalidField)
    }

    emit('invalid', { firstInvalidField })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <p v-if="errorSummary" role="alert" aria-live="polite" class="form-error-summary">
      {{ errorSummary }}
    </p>
    <slot :is-submitting="isSubmitting" :submitting-label="props.submittingLabel" />
  </form>
</template>

<style scoped>
.form-error-summary {
  color: #a70000;
  margin: 0 0 0.75rem;
}
</style>
