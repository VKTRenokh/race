<script setup lang="ts">
import { useWinnersStore } from '@/stores/winners'
import WinnerCar from '@/components/WinnerCar.vue'
import WinnersControls from '@/components/WinnersControls.vue'

const winners = useWinnersStore()

winners.loadWinners()
</script>

<template>
  <div>
    <winners-controls />

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
