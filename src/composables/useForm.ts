import { ref } from 'vue'

type FieldValidator = () => Promise<boolean>
type FieldReset = () => void
type FieldFocus = () => void

interface FieldRegistration {
  validate: FieldValidator
  reset: FieldReset
  focus: FieldFocus
}

export function useForm() {
  const fields = ref<Record<string, FieldRegistration>>({})

  function registerField(name: string, registration: FieldRegistration) {
    fields.value[name] = registration
  }

  function unregisterField(name: string) {
    delete fields.value[name]
  }

  async function validateAll(): Promise<{ isValid: boolean; firstInvalidField?: string }> {
    let firstInvalidField: string | undefined

    const results = await Promise.all(
      Object.entries(fields.value).map(async ([name, registration]) => {
        const isValid = await registration.validate()
        if (!isValid && !firstInvalidField) {
          firstInvalidField = name
        }
        return isValid
      })
    )

    return {
      isValid: results.every(Boolean),
      firstInvalidField,
    }
  }

  function resetAll() {
    Object.values(fields.value).forEach((field) => field.reset())
  }

  function focusField(name: string) {
    fields.value[name]?.focus()
  }

  return {
    registerField,
    unregisterField,
    validateAll,
    resetAll,
    focusField,
  }
}
