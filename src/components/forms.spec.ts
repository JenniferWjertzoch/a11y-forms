import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
import FormProvider from './FormProvider.vue'
import AccessibleInput from './AccessibleInput.vue'
import AccessibleTextarea from './AccessibleTextarea.vue'
import { emailSchema, messageSchema } from '@/schemas'

const DemoForm = defineComponent({
  components: { FormProvider, AccessibleInput, AccessibleTextarea },
  setup() {
    const email = ref('')
    const message = ref('')

    return { email, message, emailSchema, messageSchema }
  },
  template: `
    <FormProvider v-slot="{ isSubmitting, submittingLabel }">
      <AccessibleInput
        v-model="email"
        label="Email"
        name="email"
        required
        :schema="emailSchema"
      />
      <AccessibleTextarea
        v-model="message"
        label="Message"
        name="message"
        required
        :schema="messageSchema"
      />
      <button type="submit" :disabled="isSubmitting">{{ isSubmitting ? submittingLabel : "Submit" }}</button>
    </FormProvider>
  `,
})

describe('forms accessibility and validation behavior', () => {
  it('shows required + schema errors', async () => {
    const wrapper = mount(DemoForm)

    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()
    await flushPromises()
    expect(wrapper.text()).toContain('Email is required')

    await wrapper.find('input').setValue('invalid-mail')
    await wrapper.find('input').trigger('blur')
    await nextTick()
    await flushPromises()
    expect(wrapper.text()).toContain('Please enter a valid email address')
  })

  it('sets aria-invalid and aria-describedby for invalid fields', async () => {
    const wrapper = mount(DemoForm)

    const input = wrapper.find('input')
    await input.trigger('blur')
    await nextTick()
    await flushPromises()

    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-describedby')).toBeTruthy()
  })

  it('blocks submit and emits invalid when form is invalid', async () => {
    const wrapper = mount(DemoForm)

    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()
    await flushPromises()

    const formProvider = wrapper.findComponent(FormProvider)
    expect(formProvider.emitted('submit')).toBeFalsy()
    expect(formProvider.emitted('invalid')).toBeTruthy()
  })

  it('moves focus to first invalid field on invalid submit', async () => {
    const wrapper = mount(DemoForm, { attachTo: document.body })

    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()
    await flushPromises()

    expect(document.activeElement).toBe(wrapper.find('input').element)
    wrapper.unmount()
  })

  it('prevents double submit while pending and shows loading state', async () => {
    let submitCount = 0

    async function submitWithDelay() {
      submitCount += 1
      await new Promise((resolve) => setTimeout(resolve, 50))
    }

    const PendingForm = defineComponent({
      components: { FormProvider, AccessibleInput, AccessibleTextarea },
      setup() {
        const email = ref('ok@example.com')
        const message = ref('This is a valid message.')

        return { email, message, emailSchema, messageSchema, submitWithDelay }
      },
      template: `
        <FormProvider :on-submit="submitWithDelay" v-slot="{ isSubmitting, submittingLabel }">
          <AccessibleInput v-model="email" label="Email" name="email" required :schema="emailSchema" />
          <AccessibleTextarea v-model="message" label="Message" name="message" required :schema="messageSchema" />
          <button type="submit" :disabled="isSubmitting">{{ isSubmitting ? submittingLabel : 'Submit' }}</button>
        </FormProvider>
      `,
    })

    const wrapper = mount(PendingForm)

    await wrapper.find('form').trigger('submit.prevent')
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()

    expect(submitCount).toBe(1)
    expect(wrapper.find('button').text()).toBe('Submitting…')
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()

    await new Promise((resolve) => setTimeout(resolve, 60))
    await flushPromises()

    expect(wrapper.find('button').text()).toBe('Submit')
  })

  it('calls onSubmit on valid submit', async () => {
    let submitCount = 0

    const ValidForm = defineComponent({
      components: { FormProvider, AccessibleInput, AccessibleTextarea },
      setup() {
        const email = ref('')
        const message = ref('')

        function onSubmit() {
          submitCount += 1
        }

        return { email, message, emailSchema, messageSchema, onSubmit }
      },
      template: `
        <FormProvider :on-submit="onSubmit" v-slot="{ isSubmitting, submittingLabel }">
          <AccessibleInput v-model="email" label="Email" name="email" required :schema="emailSchema" />
          <AccessibleTextarea v-model="message" label="Message" name="message" required :schema="messageSchema" />
          <button type="submit" :disabled="isSubmitting">{{ isSubmitting ? submittingLabel : 'Submit' }}</button>
        </FormProvider>
      `,
    })

    const wrapper = mount(ValidForm)

    await wrapper.find('input').setValue('ok@example.com')
    await wrapper.find('textarea').setValue('This is a valid message.')
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()
    await flushPromises()

    expect(submitCount).toBe(1)
  })
})
