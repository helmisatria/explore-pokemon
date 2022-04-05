<template>
  <ul class="space-y-4">
    <li
      v-for="(statistic, index) in stats"
      :key="`${index}-${statistic.stat.name}`"
      class="stats-item"
    >
      <figure>
        <figcaption class="text-sm">
          <span class="capitalize font-semibold">{{ statistic.stat.name }}</span>
          <span class="text-gray-500">({{ statistic.base_stat }})</span>
        </figcaption>
        <span class="mt-2 shadow-sm block relative w-full bg-white h-[6px] rounded-lg">
          <span
            class="block bg-green-400 h-[6px] rounded-lg"
            :style="`width: ${statistic.base_stat > 100 ? 100 : statistic.base_stat}%`"
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
