<template>
  <div>
    <nav class="px-6 py-5 shadow-sm">
      <h1 class="text-xl font-medium">Pokedex</h1>
    </nav>
    <main class="p-6">
      <p>Total Pokemon: {{ pokemonsTotal }}</p>

      <section id="pokemon-list" class="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
        <PokemonListCard
          v-for="pokemon in pokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </section>

      <div v-if="busy" class="text-gray-600 pt-4 text-center">
        <p>Getting more pokemon data, please wait...</p>
      </div>

      <div
        v-if="pokemons.length !== pokemonsTotal"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
      ></div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import PokemonListCard from '../components/PokemonListCard.vue'
import { usePokemonListStore } from '~/store'

export default {
  name: 'ListPokemon',
  components: { PokemonListCard },
  async asyncData({ $pinia }) {
    const store = usePokemonListStore($pinia)
    await store.fetchPokemons()
  },
  data() {
    return {
      busy: false,
    }
  },
  computed: {
    ...mapState(usePokemonListStore, [
      'pokemons',
      'pokemonsTotal',
      'transition',
    ]),
  },
  methods: {
    ...mapActions(usePokemonListStore, ['fetchPokemons']),
    async loadMore() {
      this.busy = true
      await this.fetchPokemons()
      this.busy = false

      console.log('load more!')
    },
  },
}
</script>
