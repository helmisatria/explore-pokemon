import { createLocalVue, shallowMount } from '@vue/test-utils'
import { PiniaVuePlugin } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import PokemonListCard from './PokemonListCard.vue'

import pokemonsData from '~/fixtures/pokemons.json'

describe('Component: PokemonListCard', () => {
  let wrapper

  const localVue = createLocalVue()
  localVue.use(PiniaVuePlugin)

  const generateWrapper = () => {
    return shallowMount(PokemonListCard, {
      localVue,
      pinia: createTestingPinia(),
      propsData: {
        pokemon: pokemonsData.species[0],
      },
    })
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should mount component properly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
