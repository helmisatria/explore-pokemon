import { defineStore } from 'pinia'
import { getPokemonQuery } from '~/graphql/getPokemon'
import { getPokemonsAdvancedQuery, getPokemonsQuery } from '~/graphql/getPokemons'
import { insertPokemons } from '~/plugins/db'

export const usePokemonStore = defineStore('pokemon', {
  state: () => {
    return {
      onlineStatus: 'idle',
      fetchTransition: 'idle',

      pokemons: [],
      pokemonTypes: [],
      pokemonsTotal: 0,

      queryFilter: {
        offset: 0,
        limit: 20,
        name: '',
        typeIds: [],
      },

      pokemonDetail: {},
      fetchFailed: null,
    }
  },
  getters: {
    getSerializedQueryFilter: (state) => {
      const typeIds = state.queryFilter.typeIds?.length ? state.queryFilter.typeIds : undefined

      return {
        ...state.queryFilter,
        name: `%${state.queryFilter.name.toLowerCase().replace(/%/g, '')}%`,
        typeIds,
      }
    },
  },
  actions: {
    resetFilter() {
      this.queryFilter.name = '%'
      this.queryFilter.offset = 0
      this.queryFilter.typeIds = []
    },
    fetchPokemons({ isAdvancedSearch = false } = {}) {
      this.fetchTransition = 'submitting'
      let gqlQuery = getPokemonsQuery

      if (this.getSerializedQueryFilter.typeIds?.length) {
        gqlQuery = getPokemonsAdvancedQuery
      }

      return fetch('https://beta.pokeapi.co/graphql/v1beta', {
        timeout: 2000,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: gqlQuery,
          variables: this.getSerializedQueryFilter,
        }),
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => {
          if (isAdvancedSearch) {
            this.pokemons = []
          }

          this.fetchFailed = null
          this.pokemons = [...this.pokemons, ...res.data.species]
          this.pokemonsTotal = res.data.species_aggregate.aggregate.count
          this.pokemonTypes = res.data.types
          this.queryFilter.offset += this.queryFilter.limit
          if (process.client) {
            insertPokemons(res.data.species)
          }
        })
        .catch((e) => {
          this.fetchFailed = 'pokemons'
        })
        .finally(() => {
          this.fetchTransition = 'idle'
        })
    },
    fetchPokemonDetail({ name }) {
      const gqlQuery = getPokemonQuery

      return fetch('https://beta.pokeapi.co/graphql/v1beta', {
        timeout: 2000,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: gqlQuery,
          variables: {
            name,
          },
        }),
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => {
          this.fetchFailed = null
          this.pokemonDetail = res.data.species[0]
        })
        .catch(() => {
          this.fetchFailed = 'pokemon-detail'
        })
    },
  },
})
