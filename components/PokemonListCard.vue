<template>
  <div
    class="py-5 border border-gray-400 rounded-lg shadow flex flex-col items-center"
  >
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
      :alt="pokemon.name"
      class="w-[100px] h-[100px]"
    />
    <p class="mt-2 text-center capitalize">{{ pokemon.name }}</p>
  </div>
</template>

<script>
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
}
</script>

<style></style>
