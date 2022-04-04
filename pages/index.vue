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
    </main>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import PokemonListCard from '../components/PokemonListCard.vue'
import { usePokemonListStore } from '~/store'

export default {
  name: 'ListPokemon',
  components: { PokemonListCard },
  async asyncData({ $pinia }) {
    const store = usePokemonListStore($pinia)
    await store.fetchPokemons()
  },
  computed: {
    ...mapState(usePokemonListStore, ['pokemons', 'pokemonsTotal']),
  },
}
</script>
