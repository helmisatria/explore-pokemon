import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      pokemons: [],
    }
  },
  actions: {
    fetchPokemons() {
      return fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then((res) => res.json())
        .then((res) => {
          this.pokemons = res.results
        })
    },
  },
})
