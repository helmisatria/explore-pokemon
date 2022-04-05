<template>
  <div>
    <nav class="px-6 py-5 shadow-sm">
      <h1 class="text-xl font-medium">Pokedex</h1>
    </nav>

    <main v-if="pokemonsTotal" class="p-6">
      <p class="total-pokemon">Total Pokemon: {{ pokemonsTotal }}</p>

      <section id="pokemon-list" class="mt-4 grid grid-cols-2 gap-2">
        <router-link v-for="pokemon in pokemons" :key="pokemon.id" :to="`/pokemon/${pokemon.name}`">
          <PokemonListCard :pokemon="pokemon" />
        </router-link>
      </section>

      <div v-if="busy" class="loading text-gray-600 pt-4 text-center">
        <p>Getting more pokemon data, please wait...</p>
      </div>
    </main>

    <PokemonErrorInfo v-if="fetchFailed === 'pokemons' && !busy" @reload="loadMore" />

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
import { createDbStore, insertPokemons, openDB } from '~/plugins/db'

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
    ...mapState(usePokemonStore, ['pokemons', 'pokemonsTotal', 'fetchFailed', 'onlineStatus']),
    disableInfiniteScroll() {
      return (
        this.busy || this.fetchFailed === 'pokemons' || this.pokemons.length >= this.pokemonsTotal
      )
    },
  },
  watch: {
    onlineStatus: {
      immediate: true,
      handler(newStatus) {
        const store = usePokemonStore()

        if (newStatus === 'offline') {
          const requestOpenDb = openDB()
          requestOpenDb.onsuccess = (event) => {
            const db = event.target.result
            const dbStore = createDbStore(db, 'pokemons')
            dbStore.getAll().onsuccess = (event) => {
              const result = event.target.result ?? []
              store.pokemons = result.sort((a, b) => a.id - b.id)
            }
          }
        }
      },
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(usePokemonStore, ['fetchPokemons']),
    init() {
      if (!process.client) return

      const request = openDB()
      request.onsuccess = (event) => {
        const db = event.target.result
        insertPokemons(this.pokemons, db)
      }
    },
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
