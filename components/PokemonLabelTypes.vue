<template>
  <figure>
    <figcaption class="sr-only">Types</figcaption>
    <ul
      :class="variation === 'small' ? 'space-x-1' : 'space-x-2'"
      class="flex items-center"
    >
      <li
        v-for="(pokemonType, index) in types"
        :key="index"
        :class="variation === 'small' ? 'text-xs px-2' : 'px-3'"
        class="border border-gray-400 bg-gray-50 rounded py-[2px] capitalize"
      >
        {{ pokemonType.type.name }}
      </li>
    </ul>
  </figure>
</template>

<script>
export default {
  name: 'PokemonLabelTypes',
  props: {
    variation: {
      type: String,
      default: 'normal',
    },
    types: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style></style>
