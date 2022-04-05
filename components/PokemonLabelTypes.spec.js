import { createLocalVue, shallowMount } from '@vue/test-utils'
import { PiniaVuePlugin } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import PokemonLabelTypes from './PokemonLabelTypes.vue'

import pokemonDetail from '~/fixtures/pokemon-detail.json'

describe('Component: PokemonLabelTypes', () => {
  let wrapper

  const localVue = createLocalVue()
  localVue.use(PiniaVuePlugin)

  const generateWrapper = () => {
    return shallowMount(PokemonLabelTypes, {
      localVue,
      pinia: createTestingPinia(),
    })
  }

  beforeEach(() => {
    wrapper = generateWrapper()
  })

  it('should mount component properly', async () => {
    await wrapper.setProps({
      types: pokemonDetail.species[0].pokemons[0].types,
    })

    expect(wrapper.element).toMatchSnapshot()
  })
})
