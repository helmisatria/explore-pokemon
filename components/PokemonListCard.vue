<template>
  <article
    class="pt-5 pb-3 relative rounded-lg shadow flex flex-col items-center"
    :class="[`${backgroundColor} bg-opacity-30`]"
  >
    <div
      class="absolute leading-none top-[2px] left-[2px] rounded-tl-md rounded py-1 px-2 flex items-center"
      :class="`${backgroundColor} bg-opacity-40`"
    >
      <span class="text-xs text-white"
        >#{{ formatId(String(pokemon.id)) }}</span
      >
    </div>
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
      :alt="pokemon.name"
      height="144"
      width="144"
      class="w-[9rem] h-auto"
    />
    <h2 class="mt-2 text-center capitalize font-semibold">
      {{ pokemon.name }}
    </h2>

    <PokemonLabelTypes
      :types="pokemon.pokemons[0].types"
      class="mt-2"
      variation="small"
    />
  </article>
</template>

<script>
import { formatId } from '../utils/string-helpers'
import PokemonLabelTypes from './PokemonLabelTypes.vue'

export default {
  name: 'PokemonListCard',
  components: { PokemonLabelTypes },
  props: {
    pokemon: {
      type: Object,
      default: () => ({
        id: null,
        name: null,
        types: [{ type: { name: null } }],
      }),
    },
  },
  computed: {
    backgroundColor() {
      return `bg-pokemon-${this.pokemon.pokemons[0].types[0].type.name}`
    },
  },
  methods: {
    formatId,
  },
}
</script>
