<template>
  <div class="error-information p-6 flex flex-col justify-center space-y-2">
    <p v-if="onlineStatus === 'offline'">You're offline, please check your connection</p>
    <p v-else>Something went wrong, please try again</p>
    <button class="bg-green-500 rounded px-3 py-2 text-white" @click="reload">Try Again</button>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { usePokemonStore } from '~/store'

export default {
  name: 'PokemonErrorInfo',
  computed: {
    ...mapState(usePokemonStore, ['onlineStatus']),
  },
  watch: {
    onlineStatus(newStatus, previousStatus) {
      if (previousStatus !== 'online' && newStatus === 'online') {
        this.reload()
      }
    },
  },
  methods: {
    reload() {
      this.$emit('reload')
    },
  },
}
</script>
