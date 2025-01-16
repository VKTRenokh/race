<script setup lang="ts">
import type { SortMethod } from '@/types/sort-method'

const sortMethods: SortMethod[] = ['id', 'time', 'wins']

const onSortMethodChange = (event: Event) => {
  if (!(event.target instanceof HTMLSelectElement)) {
    return
  }
}

const onSortOrderChange = (event: Event) => {
  if (!(event.target instanceof HTMLSelectElement)) {
    return
  }
}
</script>

<template>
  <div class="sort-options">
    <select
      name="sort method"
      id="sortMethod"
      @change="onSortMethodChange"
    >
      <option value="Sort method" selected disabled>
        Sort method
      </option>
      <option
        v-for="sortMethod of sortMethods"
        :value="sortMethod"
        :key="sortMethod"
      >
        {{ sortMethod }}
      </option>
    </select>

    <select
      name="sort order"
      id="sortOrder"
      v-once
      @change="onSortOrderChange"
    >
      <option value="" disabled>Sort order</option>
      <option value="ASC" selected>Ascending</option>
      <option value="DESC">Descending</option>
    </select>
  </div>
</template>

<style scoped>
.sort-options {
  margin-bottom: 1.1rem;
  margin-top: 1.1rem;

  select {
    background-color: var(--background-color-soft);
    border: var(--color-border) solid 1px;
    color: var(--color-text);
    font-size: 1rem;
    padding: 0.3rem 0.4rem;
    border-radius: 8px;
    outline: none;
    margin-right: 5px;
  }
}
</style>
