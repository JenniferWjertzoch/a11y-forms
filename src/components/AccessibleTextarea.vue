<template>
  <div class="a11y-input">
    <label v-bind="labelProps">{{ label }}</label>
    <textarea v-bind="inputProps" rows="4"></textarea>
    <p v-if="error" v-bind="errorMessageProps">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
  import { watch } from 'vue'
  import { useA11yInput } from '@/composables/useA11yInput'
  import type { AnySchema } from 'valibot'

  const props = defineProps<{
    modelValue: string
    label: string
    name?: string
    required?: boolean
    disabled?: boolean
    placeholder?: string
    schema?: AnySchema
  }>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()

  const {
    value,
    inputProps,
    labelProps,
    errorMessageProps,
    error,
    validate,
  } = useA11yInput({
    modelValue: props.modelValue,
    label: props.label,
    name: props.name,
    required: props.required,
    disabled: props.disabled,
    placeholder: props.placeholder,
    schema: props.schema,
  })

  watch(value, newValue => {
    emit('update:modelValue', newValue)
  })

  defineExpose({ validate })
</script>

<style scoped>
  .a11y-input {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 1rem;
  }

  textarea[aria-invalid='true'] {
    border: 2px solid red;
  }

  p[role='alert'] {
    color: red;
    font-size: 0.85rem;
    margin: 0;
  }
</style>
