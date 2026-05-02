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
    <FormProvider>
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
      <button type="submit">Submit</button>
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

  it('emits submit on valid submit', async () => {
    const wrapper = mount(DemoForm)

    await wrapper.find('input').setValue('ok@example.com')
    await wrapper.find('textarea').setValue('This is a valid message.')
    await wrapper.find('form').trigger('submit.prevent')
    await nextTick()
    await flushPromises()

    const formProvider = wrapper.findComponent(FormProvider)
    expect(formProvider.emitted('submit')).toBeTruthy()
    expect(formProvider.emitted('invalid')).toBeFalsy()
  })
})
