<script setup lang="ts">
const page = defineModel<number>({ default: 0 })
</script>

<template>
  <div class="pagination">
    <button
      :disabled="page === 0"
      @click="page--"
      class="btn"
    >
      &lt;
    </button>
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
