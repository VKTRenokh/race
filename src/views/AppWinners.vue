<script setup lang="ts">
import { useWinnersStore } from '@/stores/winners'
import Car from '@/components/AppCar.vue'
import type { SortMethod } from '@/types/sort-method'
import type { SortOrder } from '@/types/sort-order'
import { watchEffect } from 'vue'

const winners = useWinnersStore()

const sortMethods: SortMethod[] = ['id', 'time', 'wins']

const sortOrders: NonNullable<SortOrder>[] = ['ASC', 'DESC']

winners.loadWinners()

watchEffect(() => {
  console.log(winners.sortOrder, winners.sortMethod)
})
</script>

<template>
  <div>
    <div
      class="winner"
      v-for="winner of winners.data"
      :key="winner.id"
    >
      {{ winner.id }} {{ winner.name }} -
      {{ winner.time.toFixed(2) }} - {{ winner.wins }} wins

      <Car
        :name="winner.name"
        :color="winner.color"
        :id="winner.id"
      />
    </div>

    <select
      v-model="winners.sortMethod"
      name="sort method"
      id="sortMethod"
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
      v-model="winners.sortOrder"
      name="sort order"
      id="sortOrder"
      v-once
    >
      <option value="" selected>Sort order</option>
      <option
        v-for="sortOrder of sortOrders"
        :key="sortOrder"
        :value="sortOrder"
      >
        {{ sortOrder.toLowerCase() }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.winner {
  border-top: var(--color-background-soft) 5px solid;
  margin-top: 10px;
  padding-top: 4px;
}
</style>
