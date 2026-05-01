<script setup lang="ts">
import { provide, nextTick } from 'vue'
import { useForm } from '@/composables/useForm'

const emit = defineEmits(['submit', 'invalid'])
const form = useForm()

provide('formContext', {
  registerField: form.registerField,
  unregisterField: form.unregisterField,
})

async function handleSubmit() {
  await nextTick()
  const { isValid, firstInvalidField } = await form.validateAll()

  if (isValid) {
    emit('submit')
    form.resetAll()
    return
  }

  if (firstInvalidField) {
    form.focusField(firstInvalidField)
  }

  emit('invalid', { firstInvalidField })
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>
