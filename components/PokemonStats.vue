<template>
  <ul class="space-y-4">
    <li
      v-for="(statistic, index) in stats"
      :key="`${index}-${statistic.stat.name}`"
    >
      <figure>
        <figcaption>
          <span class="capitalize">{{ statistic.stat.name }}</span>
          <span>({{ statistic.base_stat }})</span>
        </figcaption>
        <span class="mt-2 block relative w-full bg-gray-200 h-[6px] rounded-lg">
          <span
            class="block bg-green-400 h-[6px] rounded-lg"
            :style="`width: ${statistic.base_stat}%`"
          ></span>
        </span>
      </figure>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    stats: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style></style>
