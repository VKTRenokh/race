<script setup lang="ts">
import { useWinnersStore } from '@/stores/winners'

const winners = useWinnersStore()

winners.loadWinners()
</script>

<template>
  <div>
    <div v-for="winner of winners.data" :key="winner.id">
      {{ winner.id }} {{ winner.name }} -
      {{ winner.time.toFixed(2) }} - {{ winner.wins }} wins
    </div>
  </div>
</template>
