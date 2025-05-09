import { ref } from 'vue'

type FieldValidator = () => Promise<boolean>

export function useForm() {
  const fields = ref<Record<string, FieldValidator>>({})
  const errors = ref<Record<string, string | null>>({})
  const forceShowErrors = ref(false)

  function registerField(name: string, validateFn: FieldValidator) {
    fields.value[name] = validateFn
  }

  function unregisterField(name: string) {
    delete fields.value[name]
  }

  async function validate(): Promise<boolean> {
    const results = await Promise.all(
      Object.entries(fields.value).map(async ([name, validateFn]) => {
        const isValid = await validateFn()
        errors.value[name] = isValid ? null : 'Fehler im Feld'
        return isValid
      })
    )
    return results.every(Boolean)
  }

  function reset() {
    Object.keys(errors.value).forEach((key) => {
      errors.value[key] = null
    })
    forceShowErrors.value = false
  }

  function triggerAllTouched() {
    forceShowErrors.value = true
  }

  return {
    registerField,
    unregisterField,
    validate,
    reset,
    errors,
    forceShowErrors,
    triggerAllTouched,
  }
}
