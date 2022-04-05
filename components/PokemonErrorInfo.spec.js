import { createLocalVue, shallowMount } from '@vue/test-utils'
import { PiniaVuePlugin } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import PokemonErrorInfo from './PokemonErrorInfo.vue'

describe('Component: PokemonErrorInfo', () => {
  let wrapper

  const localVue = createLocalVue()
  localVue.use(PiniaVuePlugin)

  const generateWrapper = () => {
    return shallowMount(PokemonErrorInfo, {
      localVue,
      pinia: createTestingPinia(),
    })
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should mount component properly', () => {
    expect(wrapper.element).toMatchSnapshot()
    expect(wrapper.find('.error-information > p').text()).toBe(
      'Something went wrong, please try again'
    )
  })

  it('should emit reload, given user click the reload button', () => {
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('reload')).toBeTruthy()
  })
})
