<template>
  <div
    class="py-5 relative border border-gray-300 rounded-lg shadow flex flex-col items-center"
  >
    <div
      class="absolute leading-none top-[2px] left-[2px] rounded-md border border-gray-300 py-1 px-2 bg-gray-400 bg-opacity-70 flex items-center"
    >
      <span class="text-xs text-white"
        >#{{ formatId(String(pokemon.id)) }}</span
      >
    </div>
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
      :alt="pokemon.name"
      height="120"
      width="120"
      class="w-[120px] h-auto"
    />
    <p class="mt-2 text-center capitalize">{{ pokemon.name }}</p>
  </div>
</template>

<script>
import { formatId } from '../utils/string-helpers'

export default {
  name: 'PokemonListCard',
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
  methods: {
    formatId,
  },
}
</script>
