<script setup lang="ts">
import { useWinnersStore } from '@/stores/winners'
import WinnerCar from '@/components/WinnerCar.vue'
import WinnersControls from '@/components/WinnersControls.vue'
import type { SortOptions } from '@/types/sort-options'

const winners = useWinnersStore()

winners.loadWinners()

const handleSortingOptionsChange = (
  sortOptions: SortOptions
) => {
  winners.setSortMethod(sortOptions.method)
  winners.setSortOrder(sortOptions.order)
}
</script>

<template>
  <div>
    <winners-controls
      @update="handleSortingOptionsChange"
    />

    <div>
      <winner-car
        v-for="winner of winners.data"
        :key="winner.id"
        v-bind="winner"
      />
    </div>
  </div>
</template>

<style scoped>
.winner {
  border-top: var(--color-background-soft) 5px solid;
  margin-top: 10px;
  padding-top: 4px;
}
</style>
