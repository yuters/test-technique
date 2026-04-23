import { mountSuspended } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'

import { AppButton } from '#components'

describe('AppButton', () => {
  it('renders slot content with the requested presentation props', async () => {
    const wrapper = await mountSuspended(AppButton, {
      props: {
        size: 'sm',
        type: 'submit',
        variant: 'primary',
      },
      slots: {
        default: 'Save team',
      },
    })

    expect(wrapper.text()).toContain('Save team')
    expect(wrapper.attributes('type')).toBe('submit')
    expect(wrapper.classes()).toContain('app-button')
    expect(wrapper.classes()).toContain('app-button--primary')
    expect(wrapper.classes()).toContain('app-button--sm')
  })

  it('forwards the disabled state to the native button element', async () => {
    const wrapper = await mountSuspended(AppButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Delete team',
      },
    })

    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})
