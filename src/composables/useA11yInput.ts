import {
  ref,
  computed,
  watch,
  nextTick,
  type InputHTMLAttributes,
  type HTMLAttributes,
  type ComputedRef,
} from 'vue'
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
    id = `a11y-${Math.random().toString(36).slice(2)}`,
    name,
    placeholder,
    schema,
  } = options

  const value = ref(modelValue ?? '')
  const error = ref<string | null>(null)
  const isTouched = ref(false)
  const inputEl = ref<HTMLInputElement | HTMLTextAreaElement | null>(null)

  const validate = async (): Promise<boolean> => {
    isTouched.value = true

    if (required && value.value.trim() === '') {
      error.value = `${label} ist erforderlich.`
      return false
    }

    if (schema) {
      const result = safeParse(schema, value.value)
      if (!result.success) {
        const firstIssue = result.issues?.[0] as { message?: string }
        error.value = firstIssue?.message ?? 'Ungültige Eingabe'
        return false
      }
    }

    error.value = null
    await nextTick()
    return true
  }

  function reset() {
    isTouched.value = false
    error.value = null
  }

  function setValueFromOutside(nextValue: string) {
    value.value = nextValue
  }

  function focus() {
    inputEl.value?.focus()
  }

  watch(value, () => {
    if (isTouched.value) validate()
  })

  const onBlur = () => {
    isTouched.value = true
    validate()
  }

  const inputId = id
  const errorId = `${id}-error`

  const inputProps = computed(() => ({
    id: inputId,
    name,
    disabled,
    required,
    placeholder,
    'aria-invalid': error.value ? 'true' : undefined,
    'aria-describedby': error.value ? errorId : undefined,
    value: value.value,
    ref: inputEl,
    onInput: (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement
      value.value = target.value
    },
    onBlur,
  })) as unknown as ComputedRef<InputHTMLAttributes>

  const labelProps = computed(() => ({
    for: inputId,
  })) as unknown as ComputedRef<HTMLAttributes>

  const errorMessageProps = computed(() => ({
    id: errorId,
    role: 'alert',
    'aria-live': 'polite',
  })) as unknown as ComputedRef<HTMLAttributes>

  return {
    value,
    isTouched,
    error,
    validate,
    reset,
    focus,
    setValueFromOutside,
    inputProps,
    labelProps,
    errorMessageProps,
  }
}
