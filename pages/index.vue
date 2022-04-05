<template>
  <div>
    <nav class="px-6 py-5 shadow-sm">
      <h1 class="text-xl font-medium">Pokedex</h1>
    </nav>

    <main v-if="pokemonsTotal" class="p-6">
      <p>Total Pokemon: {{ pokemonsTotal }}</p>

      <section id="pokemon-list" class="mt-4 grid grid-cols-2 gap-2">
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
    </main>

    <PokemonErrorInfo v-if="fetchFailed === 'pokemons'" @reload="loadMore" />

    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="disableInfiniteScroll"
      infinite-scroll-distance="300"
    />
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
    if (store.pokemonsTotal === 0) {
      await store.fetchPokemons()
    }
  },
  data() {
    return {
      busy: false,
    }
  },
  computed: {
    ...mapState(usePokemonStore, ['pokemons', 'pokemonsTotal', 'fetchFailed']),
    disableInfiniteScroll() {
      return (
        this.busy ||
        this.fetchFailed === 'pokemons' ||
        this.pokemons.length >= this.pokemonsTotal
      )
    },
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
