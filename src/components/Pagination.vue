<script setup lang="ts">
const page = defineModel<number>({ default: 0 })

const decrement = () =>
  (page.value = page.value === 0 ? 0 : page.value - 1)
</script>

<template>
  <div class="pagination">
    <button @click="decrement" class="btn">&lt;</button>
    <button @click="page++" class="btn">&gt;</button>
  </div>
</template>

<style scoped>
.pagination {
  margin-top: 1rem;

  .btn {
    margin-right: 0.4rem;
    padding: 0.7rem 1rem;
  }
}
</style>
