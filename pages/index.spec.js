import { createLocalVue, shallowMount } from '@vue/test-utils'
import { PiniaVuePlugin } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import pokemonsData from '../fixtures/pokemons.json'

import index from './index'

describe('Page: Homepage', () => {
  let wrapper

  const localVue = createLocalVue()
  localVue.use(PiniaVuePlugin)

  const generateWrapper = () => {
    return shallowMount(index, {
      localVue,
      pinia: createTestingPinia(),
    })
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should mount component properly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should show list of pokemon, given total pokemon is set', async () => {
    wrapper.vm.$pinia.state.value.pokemon.pokemonsTotal = 100
    wrapper.vm.$pinia.state.value.pokemon.pokemons = pokemonsData.species
    await wrapper.vm.$nextTick()

    expect(wrapper.find('main').exists()).toBe(true)
    expect(wrapper.find('.total-pokemon').text()).toBe('Total Pokemon: 100')
    expect(wrapper.findAll('router-link > PokemonListCard-stub').length).toBe(
      pokemonsData.species.length
    )
  })

  it('should show failed state, given fetch failed', async () => {
    wrapper.vm.$pinia.state.value.pokemon.fetchFailed = 'pokemons'
    await wrapper.vm.$nextTick()

    expect(wrapper.find('PokemonErrorInfo-stub').exists()).toBe(true)
    expect(wrapper.find('main').exists()).toBe(false)
  })

  it('should show loading state on infinite scroll, given on fetching data', async () => {
    wrapper.vm.$pinia.state.value.pokemon.pokemonsTotal = 100
    await wrapper.setData({ busy: true })

    expect(wrapper.find('.loading').exists()).toBe(true)
  })
})
