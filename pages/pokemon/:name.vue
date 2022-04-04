<template>
  <div>
    <header class="flex items-center shadow-sm sticky top-0 bg-white">
      <a href="#" class="pl-6 pr-4 py-5" @click="$router.go(-1)">
        <IcoBack />
      </a>
      <h1 v-if="pokemonSpecies.id" class="text-xl font-medium capitalize">
        {{ pokemonSpecies.name }} #{{ formatId(String(pokemonSpecies.id)) }}
      </h1>
    </header>

    <PokemonErrorInfo
      v-if="fetchFailed === 'pokemon-detail'"
      @reload="fetchPokemonDetail($route.params.name)"
    />

    <main v-else-if="pokemonSpecies.id" class="px-6 py-5">
      <div class="flex justify-center">
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonSpecies.id}.png`"
          :alt="pokemonSpecies.name"
          height="300"
          width="300"
          class="w-[300px] h-auto"
        />
      </div>

      <p class="mt-6">{{ pokemonSpecies.description[0].flavor_text }}</p>

      <div class="mt-6">
        <h2 class="font-bold">Type</h2>
        <PokemonLabelTypes
          class="mt-3"
          :types="pokemonSpecies.pokemons[0].types"
        />
      </div>

      <div class="mt-6">
        <h2 class="font-bold">Stats</h2>
        <PokemonStats class="mt-3" :stats="pokemonSpecies.pokemons[0].stats" />
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import PokemonStats from '../../components/PokemonStats.vue'
import PokemonLabelTypes from '../../components/PokemonLabelTypes.vue'
import PokemonErrorInfo from '../../components/PokemonErrorInfo.vue'
import IcoBack from '../../components/icons/IcoBack.vue'

import { usePokemonStore } from '~/store'
import { formatId } from '~/utils/string-helpers'

export default {
  name: 'PokemonDetailPage',
  components: { IcoBack, PokemonErrorInfo, PokemonLabelTypes, PokemonStats },
  async asyncData({ route, $pinia }) {
    const store = usePokemonStore($pinia)
    await store.fetchPokemonDetail({ name: route.params.name })
  },
  computed: {
    ...mapState(usePokemonStore, ['fetchFailed']),
    ...mapState(usePokemonStore, {
      pokemonSpecies: (state) => state.pokemonDetail,
    }),
  },
  methods: {
    ...mapActions(usePokemonStore, ['fetchPokemonDetail']),
    formatId,
  },
}
</script>
