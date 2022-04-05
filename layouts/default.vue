<template>
  <div class="max-w-lg min-h-screen shadow-md mx-auto">
    <OnlineOfflineIndicator />
    <Nuxt />
  </div>
</template>

<script>
import OnlineOfflineIndicator from '../components/OnlineOfflineIndicator.vue'

export default {
  name: 'DefaultLayout',
  components: { OnlineOfflineIndicator },
  methods: {},
}
</script>
