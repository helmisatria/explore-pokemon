import { defineStore } from 'pinia'
import { getPokemonQuery } from '~/graphql/getPokemon'
import { getPokemonsQuery } from '~/graphql/getPokemons'
import { insertPokemonDetail, insertPokemons } from '~/plugins/db'

export const usePokemonStore = defineStore('pokemon', {
  state: () => {
    return {
      pokemons: [],
      pokemonsTotal: 0,

      queryFilter: {
        offset: 0,
        limit: 20,
      },

      pokemonDetail: {},
      fetchFailed: null,
    }
  },
  actions: {
    fetchPokemons() {
      const gqlQuery = getPokemonsQuery

      return fetch('https://beta.pokeapi.co/graphql/v1beta', {
        timeout: 2000,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: gqlQuery,
          variables: this.queryFilter,
        }),
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => {
          this.fetchFailed = null
          this.pokemons = [...this.pokemons, ...res.data.species]
          this.pokemonsTotal = res.data.species_aggregate.aggregate.count
          this.queryFilter.offset += this.queryFilter.limit
          if (process.client) {
            insertPokemons(this.pokemons)
          }
        })
        .catch(() => {
          this.fetchFailed = 'pokemons'
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
          if (process.client) {
            insertPokemonDetail(this.pokemonDetail)
          }
        })
        .catch(() => {
          this.fetchFailed = 'pokemon-detail'
        })
    },
  },
})
