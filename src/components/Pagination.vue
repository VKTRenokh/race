<script setup lang="ts">
import { defineModel } from 'vue'

const page = defineModel<number>({ default: 0 })

const decrement = () =>
  (page.value = page.value === 0 ? 0 : page.value--)
</script>

<template>
  <div>
    {{ page }}
    <button @click="decrement">&lt;</button>
    <button @click="page++">&gt;</button>
  </div>
</template>

<style scoped></style>
