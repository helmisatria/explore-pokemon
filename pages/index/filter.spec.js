import { createLocalVue, shallowMount } from '@vue/test-utils'
import { PiniaVuePlugin } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import PokemonFilterModal from './filter.vue'

// import pokemonDetailData from '~/fixtures/pokemon-detail.json'

describe('Page: Pokemon Detail Page', () => {
  let wrapper

  const localVue = createLocalVue()
  localVue.use(PiniaVuePlugin)

  jest.useFakeTimers()

  const generateWrapper = () => {
    return shallowMount(PokemonFilterModal, {
      localVue,
      pinia: createTestingPinia(),
      mocks: {
        $router: { go: jest.fn(), replace: jest.fn() },
      },
    })
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should mount component properly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should submit the form properly, given form submitted', async () => {
    wrapper.vm.$pinia.app.resetFilter = jest.fn()
    wrapper.vm.$pinia.app.fetchPokemons = jest.fn()

    await wrapper.find('form').trigger('submit')

    jest.runOnlyPendingTimers()

    expect(wrapper.vm.$pinia.app.resetFilter).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$pinia.app.fetchPokemons).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.$pinia.app.fetchPokemons).toHaveBeenCalledWith({ isAdvancedSearch: true })
    expect(wrapper.vm.$router.replace).toHaveBeenCalledWith('/')
  })
})
