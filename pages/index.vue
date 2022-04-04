<template>
  <div>
    <nav class="px-6 py-5 shadow-sm">
      <h1 class="text-xl font-medium">Pokedex</h1>
    </nav>
    <main class="p-6">
      <p>Total Pokemon: XXX</p>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'pinia'
import { useStore } from '~/store'

export default {
  name: 'IndexPage',
  async asyncData({ $pinia }) {
    const store = useStore($pinia)
    await store.fetchPokemons()
  },
  methods: {
    ...mapActions(useStore, ['fetchPokemons']),

    init() {
      this.fetchPokemons()
    },
  },
}
</script>
