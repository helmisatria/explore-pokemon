import { createLocalVue, shallowMount } from '@vue/test-utils'
import { PiniaVuePlugin } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import PokemonStats from './PokemonStats.vue'

import pokemonDetailData from '~/fixtures/pokemon-detail.json'

describe('Component: PokemonStats', () => {
  let wrapper

  const localVue = createLocalVue()
  localVue.use(PiniaVuePlugin)

  const generateWrapper = () => {
    return shallowMount(PokemonStats, {
      localVue,
      pinia: createTestingPinia(),
      propsData: {
        stats: pokemonDetailData.species[0].pokemons[0].stats,
      },
    })
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should mount component properly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should display stats item properly', () => {
    expect(wrapper.findAll('.stats-item').length).toBe(
      pokemonDetailData.species[0].pokemons[0].stats.length
    )
  })
})
