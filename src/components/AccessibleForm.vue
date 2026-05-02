<template>
  <FormProvider @submit="handleSubmit" novalidate>
    <AccessibleInput
      v-model="email"
      label="Email"
      name="email"
      required
      placeholder="e.g. you@example.com"
      :schema="emailSchema"
    />

    <AccessibleTextarea
      v-model="message"
      label="Message"
      name="message"
      required
      placeholder="Your Message"
      :schema="messageSchema"
    />

    <button type="submit">Submit</button>

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
  feedback.value = `Submitted with:
    Email: ${email.value}
    Message: ${message.value}`
}
</script>

<style scoped>
.feedback {
  margin-top: 1rem;
  color: green;
  white-space: pre-line;
}
</style>
