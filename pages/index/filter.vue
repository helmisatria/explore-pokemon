<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!-- Background overlay -->
      <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isActive"
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          @click="closeModal"
        ></div>
      </transition>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >

      <!-- Modal panel -->
      <transition
        enter-active-class="ease-out duration-300"
        enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="ease-in duration-200"
        leave-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <form
          v-if="isActive"
          class="relative inline-block align-bottom bg-white rounded-lg px-6 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          @submit.prevent="onSubmit"
        >
          <div>
            <div class="flex items-center space-x-4">
              <div class="flex items-center justify-center h-10 w-10 rounded-full bg-green-100">
                <IcoFilter />
              </div>
              <h2 id="modal-title" class="text-lg leading-6 font-medium text-gray-900">
                Advanced Search
              </h2>
            </div>
            <div class="pt-6">
              <div class="mt-2 space-y-3">
                <div>
                  <label for="pokemon_name" class="block flex-1 relative rounded-md shadow-sm">
                    <p class="sr-only">Pokemon Name</p>
                    <div
                      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                    >
                      <IcoSearch class="text-gray-600" />
                    </div>
                    <input
                      id="pokemon_name"
                      v-model="form.name"
                      class="rounded block text-gray-800 border w-full pl-12 py-3 pr-12"
                      placeholder="Pokemon name"
                      aria-describedby="pokemon-name"
                      autocomplete="off"
                    />
                  </label>
                </div>

                <div>
                  <p class="text-sm font-medium text-gray-500">Types</p>
                  <div class="flex flex-wrap mt-3">
                    <label
                      v-for="type in pokemonTypes"
                      :key="type.id"
                      :class="{
                        'bg-white border border-gray-400 ring-green-400': isChecked(type.id),
                      }"
                      class="inline-flex items-center rounded-lg cursor-pointer mr-2 mb-2 ring-1 ring-transparent transition ease hover:ring-offset-2 hover:ring-green-400"
                    >
                      <input
                        v-model="form.typeIds"
                        :value="type.id"
                        type="checkbox"
                        class="hidden"
                      />
                      <span class="py-[4px] px-4">
                        <span class="text-sm leading-5 font-medium text-gray-900 capitalize">
                          {{ type.name }}
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6">
            <button
              type="submit"
              class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
            >
              Search Pokemon
            </button>
          </div>
        </form>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'

import IcoSearch from '../../components/icons/IcoSearch.vue'
import IcoFilter from '../../components/icons/IcoFilter.vue'
import { usePokemonStore } from '~/store'

export default {
  name: 'FilterPage',
  components: { IcoFilter, IcoSearch },
  data() {
    return {
      isActive: false,
      form: {
        name: '',
        typeIds: [],
      },
    }
  },
  computed: {
    ...mapState(usePokemonStore, ['pokemonTypes', 'queryFilter']),
  },
  mounted() {
    this.isActive = true
    this.prefillData()
  },
  methods: {
    ...mapActions(usePokemonStore, ['fetchPokemons', 'resetFilter']),
    prefillData() {
      this.form.name = this.queryFilter.name
      this.form.typeIds = this.queryFilter.typeIds
    },
    closeModal() {
      this.isActive = false
      setTimeout(() => {
        this.$router.replace('/')
      }, 200)
    },
    isChecked(type) {
      return this.form.typeIds.includes(type)
    },
    async onSubmit() {
      this.resetFilter()
      this.queryFilter.name = this.form.name
      this.queryFilter.typeIds = this.form.typeIds
      await this.fetchPokemons({ isAdvancedSearch: true })
      this.closeModal()
    },
  },
}
</script>
