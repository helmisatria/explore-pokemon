import { createLocalVue, shallowMount } from '@vue/test-utils'
import { PiniaVuePlugin } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import OnlineOfflineIndicator from './OnlineOfflineIndicator.vue'

describe('Component: OnlineOfflineIndicator', () => {
  let wrapper

  const localVue = createLocalVue()
  localVue.use(PiniaVuePlugin)

  delete window.navigator
  window.navigator = { onLine: false }

  const generateWrapper = () => {
    return shallowMount(OnlineOfflineIndicator, {
      localVue,
      pinia: createTestingPinia(),
      mocks: {
        $router: { go: jest.fn() },
      },
    })
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should mount component properly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  describe('Handle Indicator Visibility', () => {
    it('should display indicator, given status is offline', async () => {
      wrapper.vm.$pinia.state.value.pokemon.onlineStatus = 'offline'
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.online-status-indicator').exists()).toBe(true)
    })

    it('should display indicator, given status is not idle', async () => {
      wrapper.vm.$pinia.state.value.pokemon.onlineStatus = 'online'
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.online-status-indicator').exists()).toBe(true)
    })

    it('should NOT display indicator, given status is idle', async () => {
      window.navigator = { onLine: true }
      wrapper = generateWrapper()

      wrapper.vm.$pinia.state.value.pokemon.onlineStatus = 'idle'
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.online-status-indicator').exists()).toBe(false)
    })
  })

  describe('Handle Copy Inside Indicator', () => {
    it('should display text inside indicator properly based on the status', async () => {
      wrapper = generateWrapper()

      wrapper.vm.$pinia.state.value.pokemon.onlineStatus = 'offline'
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.online-status-indicator').text()).toBe(
        `You're offline, please check your connection`
      )

      wrapper.setData({ isShowIndicator: true })
      wrapper.vm.$pinia.state.value.pokemon.onlineStatus = 'online'
      await wrapper.vm.$nextTick()

      expect(wrapper.find('.online-status-indicator').text()).toBe(`You're online, welcome back!`)
    })
  })
})
