<template>
  <FormProvider @submit="handleSubmit" novalidate>
    <AccessibleInput
      v-model="email"
      label="E-Mail"
      name="email"
      required
      placeholder="z. B. du@beispiel.de"
      :schema="emailSchema"
    />

    <AccessibleTextarea
      v-model="message"
      label="Nachricht"
      name="message"
      required
      placeholder="Deine Nachricht"
      :schema="messageSchema"
    />

    <button type="submit">Absenden</button>

    <p v-if="feedback" class="feedback" role="status" aria-live="polite">
      {{ feedback }}
    </p>
  </FormProvider>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import AccessibleInput from './AccessibleInput.vue'
  import AccessibleTextarea from './AccessibleTextarea.vue'
  import FormProvider from './FormProvider.vue'
  import { emailSchema, messageSchema } from '@/schemas'

  const email = ref('')
  const message = ref('')
  const feedback = ref('')

  function handleSubmit() {
    feedback.value = `Abgeschickt mit:
    E-Mail: ${email.value}
    Nachricht: ${message.value}`
  }
</script>

<style scoped>
  .feedback {
    margin-top: 1rem;
    color: green;
    white-space: pre-line;
  }
</style>
