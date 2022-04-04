<template>
  <div>
    <nav class="px-6 py-5 shadow-sm">
      <h1 class="text-xl font-medium">Pokedex</h1>
    </nav>

    <PokemonErrorInfo v-if="fetchFailed === 'pokemons'" @reload="loadMore" />

    <main v-else class="p-6">
      <p>Total Pokemon: {{ pokemonsTotal }}</p>

      <section id="pokemon-list" class="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
        <router-link
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          :to="`/pokemon/${pokemon.name}`"
        >
          <PokemonListCard :pokemon="pokemon" />
        </router-link>
      </section>

      <div v-if="busy" class="text-gray-600 pt-4 text-center">
        <p>Getting more pokemon data, please wait...</p>
      </div>

      <div
        v-if="pokemons.length !== pokemonsTotal && fetchFailed !== 'pokemons'"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      ></div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'

import PokemonErrorInfo from '../components/PokemonErrorInfo.vue'
import PokemonListCard from '../components/PokemonListCard.vue'
import { usePokemonStore } from '~/store'

export default {
  name: 'ListPokemon',
  components: { PokemonListCard, PokemonErrorInfo },
  scrollToTop: false,
  async asyncData({ $pinia }) {
    const store = usePokemonStore($pinia)
    await store.fetchPokemons()
  },
  data() {
    return {
      busy: false,
    }
  },
  computed: {
    ...mapState(usePokemonStore, [
      'pokemons',
      'pokemonsTotal',
      'transition',
      'fetchFailed',
    ]),
  },
  methods: {
    ...mapActions(usePokemonStore, ['fetchPokemons']),
    async loadMore() {
      this.busy = true

      try {
        await this.fetchPokemons()
      } finally {
        this.busy = false
      }
    },
  },
}
</script>
