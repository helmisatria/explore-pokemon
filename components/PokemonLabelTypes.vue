<template>
  <ul class="flex items-center space-x-2">
    <li
      v-for="(pokemonType, index) in types"
      :key="index"
      class="border border-gray-400 bg-gray-50 rounded px-3 py-[2px] capitalize"
    >
      {{ pokemonType.type.name }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'PokemonLabelTypes',
  props: {
    types: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style></style>
