<template>
  <transition name="slide-fade">
    <div
      v-show="isShowIndicator || onlineStatus === 'offline'"
      class="online-status-indicator max-w-lg sticky top-0 z-10 transition-all text-white text-center text-sm bg-opacity-90"
      :class="onlineStatus === 'online' ? 'bg-green-600' : 'bg-gray-800'"
    >
      <p v-if="onlineStatus === 'offline'" class="py-2">
        You're offline, please check your connection
      </p>
      <p v-else-if="onlineStatus === 'online'" class="py-2">You're online, welcome back!</p>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'pinia'
import { usePokemonStore } from '~/store'

export default {
  name: 'OnlineOfflineIndicator',
  data() {
    return {
      isShowIndicator: false,
    }
  },
  computed: {
    ...mapState(usePokemonStore, ['onlineStatus']),
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const store = usePokemonStore()

      if (!process.client) return

      if (!navigator.onLine) {
        this.isShowIndicator = true
        store.onlineStatus = 'offline'
      }

      window.addEventListener('online', () => {
        this.isShowIndicator = true
        store.onlineStatus = 'online'

        setTimeout(() => {
          this.isShowIndicator = false
          store.onlineStatus = 'idle'
        }, 3000)
      })

      window.addEventListener('offline', () => {
        this.isShowIndicator = true
        store.onlineStatus = 'offline'
      })
    },
  },
}
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
