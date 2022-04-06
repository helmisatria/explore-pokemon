<template>
  <div class="bg-[#FEFEFE]">
    <header class="px-6 pt-12">
      <h1 class="text-4xl font-semibold">Pokédex</h1>
      <p class="text-gray-800 mt-2">Find your favorite Pokémon</p>
    </header>

    <div
      class="flex space-x-2 items-center justify-between px-6 py-4 bg-[#FEFEFE] sticky top-0 z-10 bg-opacity-40"
    >
      <label for="pokemon_name" class="block flex-1 relative rounded-md shadow-sm">
        <p class="sr-only">Pokemon Name</p>
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IcoSearch class="text-gray-600" />
        </div>
        <input
          id="pokemon_name"
          class="rounded block text-gray-800 bg-green-50 w-full pl-12 py-3 pr-12"
          placeholder="Pokemon name"
          aria-describedby="pokemon-name"
          autocomplete="off"
          :value="queryFilter.name.replace(/\%/g, '')"
          @input="handleSearch"
        />
      </label>

      <router-link to="/filter">
        <p class="sr-only">Advanced Filter</p>
        <div class="px-3 py-3 bg-white rounded h-full">
          <IcoFilter />
        </div>
      </router-link>
    </div>

    <main class="px-6 pb-6">
      <p class="total-pokemon text-sm text-gray-500 text-right">Got {{ pokemonsTotal }} pokémon</p>

      <div v-if="pokemonsTotal" class="pokemon-list-wrapper">
        <section id="pokemon-list" class="mt-3 grid grid-cols-2 gap-2">
          <router-link
            v-for="pokemon in pokemons"
            :key="pokemon.id"
            :to="`/pokemon/${pokemon.name}`"
          >
            <PokemonListCard :pokemon="pokemon" />
          </router-link>
        </section>

        <div v-if="busy" class="loading text-gray-600 pt-4 text-center">
          <p>Getting more pokemon data, please wait...</p>
        </div>
      </div>
    </main>

    <PokemonErrorInfo v-if="fetchFailed === 'pokemons' && !busy" @reload="loadMore" />

    <div
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="disableInfiniteScroll"
      infinite-scroll-distance="300"
    />

    <Nuxt />
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'

import IcoFilter from '../components/icons/IcoFilter.vue'
import IcoSearch from '../components/icons/IcoSearch.vue'

import PokemonErrorInfo from '../components/PokemonErrorInfo.vue'
import PokemonListCard from '../components/PokemonListCard.vue'
import { usePokemonStore } from '~/store'
import { createDbStore, insertPokemons, openDB } from '~/plugins/db'

export default {
  name: 'ListPokemon',
  components: { PokemonListCard, PokemonErrorInfo, IcoSearch, IcoFilter },
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
    ...mapState(usePokemonStore, [
      'pokemons',
      'pokemonsTotal',
      'fetchFailed',
      'onlineStatus',
      'queryFilter',
    ]),
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
    ...mapActions(usePokemonStore, ['fetchPokemons', 'resetFilter']),
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
    handleSearch(e) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
        this.searchTimeout = null
      }

      this.searchTimeout = setTimeout(() => {
        this.resetFilter()

        this.queryFilter.name = e.target.value
        this.fetchPokemons({ isAdvancedSearch: true })

        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 500)
    },
  },
}
</script>
