<script setup lang="ts">
import { useWinnersStore } from '@/stores/winners'

const winners = useWinnersStore()

winners.loadWinners().then(console.log)
</script>

<template>
  <h2>aaa</h2>
</template>
