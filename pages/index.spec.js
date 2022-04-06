import { createLocalVue, shallowMount } from '@vue/test-utils'
import { PiniaVuePlugin } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import pokemonsData from '../fixtures/pokemons.json'

import index from './index'

describe('Page: Homepage', () => {
  let wrapper

  const localVue = createLocalVue()
  localVue.use(PiniaVuePlugin)

  jest.useFakeTimers()

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
    expect(wrapper.find('.total-pokemon').text()).toBe('Got 100 pokémon')
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

  it('should call fetch, given on load more', async () => {
    wrapper.vm.$pinia.state.value.pokemon.pokemonsTotal = 100
    wrapper.vm.$pinia.app.fetchPokemons = jest.fn()
    wrapper.vm.loadMore()

    await wrapper.vm.$nextTick()
    expect(wrapper.vm.$pinia.app.fetchPokemons).toHaveBeenCalledTimes(1)
    expect(wrapper.find('.loading').exists()).toBe(true)

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.loading').exists()).toBe(false)
  })

  describe('Handle Search', () => {
    it('should trigger fetch pokemons, given search input is changed', () => {
      const input = wrapper.find('input')
      input.element.value = 'bulbasaur'
      input.trigger('input')
      wrapper.vm.$pinia.app.fetchPokemons = jest.fn()

      jest.runOnlyPendingTimers()

      expect(wrapper.vm.$pinia.app.fetchPokemons).toHaveBeenCalledWith({ isAdvancedSearch: true })
      expect(wrapper.vm.$pinia.state.value.pokemon.queryFilter).toEqual({
        limit: 20,
        name: '%bulbasaur%',
        offset: 0,
      })
    })
  })
})
