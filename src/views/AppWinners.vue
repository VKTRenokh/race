<script setup lang="ts">
import { useWinnersStore } from '@/stores/winners'

const winners = useWinnersStore()

winners.loadWinners().then(console.log)
</script>

<template>
  <tr>
    <td>First</td>
    <td>Second</td>
    <td>Third</td>
  </tr>
</template>
