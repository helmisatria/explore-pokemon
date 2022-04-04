import { defineStore } from 'pinia'
import { getPokemonQuery } from '~/graphql/getPokemon'
import { getPokemonsQuery } from '~/graphql/getPokemons'

export const usePokemonStore = defineStore('pokemon', {
  state: () => {
    return {
      pokemons: [],
      pokemonsTotal: 0,

      queryFilter: {
        offset: 0,
        limit: 5,
      },

      pokemonDetail: {},
    }
  },
  actions: {
    fetchPokemons() {
      const gqlQuery = getPokemonsQuery

      return fetch('https://beta.pokeapi.co/graphql/v1beta', {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: gqlQuery,
          variables: this.queryFilter,
        }),
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res) => {
          this.pokemons = [...this.pokemons, ...res.data.species]
          this.pokemonsTotal = res.data.species_aggregate.aggregate.count
          this.queryFilter.offset += this.queryFilter.limit
        })
    },
    fetchPokemonDetail({ name }) {
      const gqlQuery = getPokemonQuery

      return fetch('https://beta.pokeapi.co/graphql/v1beta', {
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
          console.log('res', JSON.stringify(res))
          this.pokemonDetail = res.data.species[0]
        })
    },
  },
})
