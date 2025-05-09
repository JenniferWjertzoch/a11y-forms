<script setup lang="ts">
import { provide, nextTick } from 'vue'
import { useForm } from '@/composables/useForm'

const emit = defineEmits(['submit'])
const form = useForm()

provide('formContext', {
  registerField: form.registerField,
  unregisterField: form.unregisterField,
  errors: form.errors,
  reset: form.reset,
})

async function handleSubmit() {
  await nextTick() // 💥 wichtig: wartet auf onMounted() aller Inputs
  const isValid = await form.validate()

  if (isValid) {
    emit('submit')
    form.reset()
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>
