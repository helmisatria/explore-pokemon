<template>
  <div>
    <nav class="flex space-x-3 items-center px-6 py-5 shadow-sm">
      <IcoBack @click.native="$router.go(-1)" />
      <h1 v-if="pokemon.id" class="text-xl font-medium capitalize">
        {{ pokemon.name }} #{{ formatId(String(pokemon.id)) }}
      </h1>
    </nav>

    <PokemonErrorInfo
      v-if="fetchFailed === 'pokemon-detail'"
      @reload="fetchPokemonDetail"
    />

    <main v-else class="px-6 py-5">
      <div class="flex justify-center">
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`"
          :alt="pokemon.name"
          height="300"
          width="300"
          class="w-[300px] h-auto"
        />
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import PokemonErrorInfo from '../../components/PokemonErrorInfo.vue'
import IcoBack from '../../components/icons/IcoBack.vue'

import { usePokemonStore } from '~/store'
import { formatId } from '~/utils/string-helpers'

export default {
  name: 'PokemonDetailPage',
  components: { IcoBack, PokemonErrorInfo },
  async asyncData({ route, $pinia }) {
    const store = usePokemonStore($pinia)
    await store.fetchPokemonDetail({ name: route.params.name })
  },
  computed: {
    ...mapState(usePokemonStore, {
      pokemon: (state) => state.pokemonDetail,
    }),
  },
  methods: {
    ...mapActions(usePokemonStore, ['fetchPokemonDetail']),
    formatId,
  },
}
</script>
