<template>
  <div
    :class="[
      pokemonSpecies.id &&
        `bg-pokemon-${pokemonSpecies.pokemons[0].types[0].type.name} bg-opacity-10`,
    ]"
  >
    <header class="flex items-center shadow-sm sticky top-0 backdrop-blur-sm">
      <a href="#" class="back-btn pl-6 pr-4 py-5" @click="$router.go(-1)">
        <IcoBack />
      </a>
      <h1 v-if="pokemonSpecies.id" class="pokemon-title text-xl font-medium capitalize">
        {{ pokemonSpecies.name }} #{{ formatId(String(pokemonSpecies.id)) }}
      </h1>
    </header>

    <main v-if="pokemonSpecies.id" class="px-6 pt-5 pb-10">
      <div class="flex justify-center">
        <img
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonSpecies.id}.png`"
          :alt="pokemonSpecies.name"
          height="300"
          width="300"
          class="w-[300px] h-auto"
        />
      </div>

      <article>
        <p class="mt-6">{{ pokemonSpecies.description[0].flavor_text }}</p>
      </article>

      <div class="mt-6">
        <h2 class="font-bold">Type</h2>
        <PokemonLabelTypes class="mt-3" :types="pokemonSpecies.pokemons[0].types" />
      </div>

      <div class="mt-6">
        <h2 class="font-bold">Stats</h2>
        <PokemonStats class="mt-3" :stats="pokemonSpecies.pokemons[0].stats" />
      </div>
    </main>

    <PokemonErrorInfo
      v-else-if="fetchFailed === 'pokemon-detail'"
      @reload="fetchPokemonDetail($route.params.name)"
    />
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
import { createDbStore, insertPokemonDetail, openDB } from '~/plugins/db'

export default {
  name: 'PokemonDetailPage',
  components: { IcoBack, PokemonErrorInfo, PokemonLabelTypes, PokemonStats },
  async asyncData({ route, $pinia }) {
    const store = usePokemonStore($pinia)
    if (route.params.name !== store.pokemonDetail?.name) {
      await store.fetchPokemonDetail({ name: route.params.name })
    }
  },
  computed: {
    ...mapState(usePokemonStore, ['fetchFailed']),
    pokemonSpecies() {
      const store = usePokemonStore()

      if (!process.client) return store.pokemonDetail

      if (store.onlineStatus === 'offline') {
        const requestOpenDb = openDB()
        requestOpenDb.onsuccess = (event) => {
          const db = event.target.result
          const dbStore = createDbStore(db, 'pokemon_detail')
          dbStore.get(this.$route.params.name).onsuccess = (event) => {
            store.pokemonDetail = event.target.result ?? {}
          }
        }
      }

      return store.pokemonDetail
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (!process.client) return

      const request = openDB()
      request.onsuccess = (event) => {
        const db = event.target.result
        insertPokemonDetail(this.pokemonSpecies, db)
      }
    },
    ...mapActions(usePokemonStore, ['fetchPokemonDetail']),
    formatId,
  },
}
</script>
