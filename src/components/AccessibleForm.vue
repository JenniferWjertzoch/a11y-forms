<template>
  <form @submit.prevent="handleSubmit">
    <AccessibleTextarea
      ref="messageRef"
      v-model="message"
      label="Nachricht"
      name="message"
      required
      placeholder="Was möchtest du uns sagen?"
      :schema="messageSchema"
    />

    <AccessibleInput
      ref="emailRef"
      v-model="email"
      label="E-Mail"
      name="email"
      required
      placeholder="z. B. du@beispiel.de"
      :schema="emailSchema"
    />

    <button type="submit">Absenden</button>

    <p v-if="feedback" class="feedback" role="status" aria-live="polite">
      {{ feedback }}
    </p>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import AccessibleInput from './AccessibleInput.vue'
  import AccessibleTextarea from './AccessibleTextarea.vue'
  import { emailSchema, messageSchema } from '@/schemas'

  const email = ref('')
  const message = ref('')
  const feedback = ref('')
  const emailRef = ref<InstanceType<typeof AccessibleInput> | null>(null)

  function handleSubmit() {
    const isValid = emailRef.value?.validate?.() ?? false
    if (!isValid) {
      feedback.value = 'Bitte korrigiere die Eingabe.'
      return
    }

    feedback.value = `Formular abgeschickt mit: ${message.value} ${email.value}`
  }
</script>

<style scoped>
  .feedback {
    margin-top: 1rem;
    color: green;
  }
</style>
