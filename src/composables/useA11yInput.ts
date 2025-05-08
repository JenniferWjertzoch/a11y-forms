import { ref, computed, watch } from 'vue'
import { safeParse, type AnySchema } from 'valibot'

export interface UseA11yInputOptions {
  modelValue: string | undefined
  label: string
  required?: boolean
  disabled?: boolean
  id?: string
  name?: string
  placeholder?: string
  schema?: AnySchema
}

export function useA11yInput(options: UseA11yInputOptions) {
  const {
    modelValue,
    label,
    required = false,
    disabled = false,
    id = `a11y-input-${Math.random().toString(36).slice(2)}`,
    name,
    placeholder,
    schema,
  } = options

  const value = ref(modelValue ?? '')
  const isTouched = ref(false)
  const error = ref<string | null>(null)

  const validate = (): boolean => {
    isTouched.value = true // wichtig!

    if (required && value.value.trim() === '') {
      error.value = `${label} ist erforderlich.`
      return false
    }

    if (schema) {
      const result = safeParse(schema, value.value)
      if (!result.success && result.issues?.length > 0) {
        const firstIssue = result.issues[0] as { message?: string }
        error.value = firstIssue.message ?? 'Ungültige Eingabe'
        return false
      }
    }

    error.value = null
    return true
  }

  watch(value, () => {
    if (isTouched.value) {
      validate()
    }
  })

  const onBlur = () => {
    isTouched.value = true
    validate()
  }

  const inputId = id
  const errorId = `${inputId}-error`

  const inputProps = computed(() => ({
    id: inputId,
    name,
    disabled,
    required,
    placeholder,
    'aria-invalid': !!error.value || undefined,
    'aria-describedby': error.value ? errorId : undefined,
    value: value.value,
    onInput: (e: Event) => {
      const target = e.target as HTMLInputElement
      value.value = target.value
    },
    onBlur,
  }))

  const labelProps = computed(() => ({
    for: inputId,
  }))

  const errorMessageProps = computed(() => ({
    id: errorId,
    role: 'alert',
    'aria-live': 'polite',
  }))

  return {
    value,
    isTouched,
    error,
    inputProps,
    labelProps,
    errorMessageProps,
    validate,
  }
}
