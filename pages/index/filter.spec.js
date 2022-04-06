import { createLocalVue, shallowMount } from '@vue/test-utils'
import { PiniaVuePlugin } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import PokemonFilterModal from './filter.vue'

// import pokemonDetailData from '~/fixtures/pokemon-detail.json'

describe('Page: Pokemon Detail Page', () => {
  let wrapper

  const localVue = createLocalVue()
  localVue.use(PiniaVuePlugin)

  const generateWrapper = () => {
    return shallowMount(PokemonFilterModal, {
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
})
