<template>
  <div class="p-6 flex flex-col justify-center space-y-2">
    <p>Something went wrong, please try again</p>
    <button class="bg-green-500 rounded px-3 py-2 text-white" @click="reload">
      Reload
    </button>
  </div>
</template>

<script>
export default {
  name: 'PokemonErrorInfo',
  methods: {
    reload() {
      this.$emit('reload')
    },
  },
}
</script>
