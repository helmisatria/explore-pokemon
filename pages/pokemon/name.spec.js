import { createLocalVue, shallowMount } from '@vue/test-utils'
import { PiniaVuePlugin } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import PokemonDetailPage from './:name.vue'

import pokemonDetailData from '~/fixtures/pokemon-detail.json'

describe('Page: Pokemon Detail Page', () => {
  let wrapper

  const localVue = createLocalVue()
  localVue.use(PiniaVuePlugin)

  const generateWrapper = () => {
    return shallowMount(PokemonDetailPage, {
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

  it('should show pokemon species info, given data fetched', async () => {
    wrapper.vm.$pinia.state.value.pokemon.pokemonDetail = pokemonDetailData.species[0]
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.pokemon-title').exists()).toBe(true)
    expect(wrapper.find('.pokemon-title').text()).toBe('charmander #004')
    expect(wrapper.find('main').exists()).toBe(true)
    expect(wrapper.find('main').element).toMatchSnapshot()
    expect(wrapper.find('PokemonErrorInfo-stub').exists()).toBe(false)
  })

  it('should display error state, given failed fetch pokemon detail', async () => {
    wrapper.vm.$pinia.state.value.pokemon.fetchFailed = 'pokemon-detail'
    await wrapper.vm.$nextTick()

    expect(wrapper.find('PokemonErrorInfo-stub').exists()).toBe(true)
    expect(wrapper.find('main').exists()).toBe(false)
  })
})
