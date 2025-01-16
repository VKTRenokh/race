<script setup lang="ts">
import { useWinnersStore } from '@/stores/winners'
import Car from '@/components/AppCar.vue'
import type { SortMethod } from '@/types/sort-method'

const winners = useWinnersStore()

const sortMethods: SortMethod[] = ['id', 'time', 'wins']

winners.loadWinners()

const onSortMethodChange = (event: Event) => {
  if (!(event.target instanceof HTMLSelectElement)) {
    return
  }

  // @ts-expect-error
  winners.setSortMethod(event.target.value)
}

const onSortOrderChange = (event: Event) => {
  if (!(event.target instanceof HTMLSelectElement)) {
    return
  }

  // @ts-expect-error
  winners.setSortOrder(event.target.value)
}
</script>

<template>
  <div>
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

    <div>
      <div
        class="winner"
        v-for="winner of winners.data"
        :key="winner.id"
      >
        {{ winner.id }} {{ winner.name }} -
        {{ winner.time.toFixed(2) }} -
        {{ winner.wins }} wins

        <Car
          :name="winner.name"
          :color="winner.color"
          :id="winner.id"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.winner {
  border-top: var(--color-background-soft) 5px solid;
  margin-top: 10px;
  padding-top: 4px;
}

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
