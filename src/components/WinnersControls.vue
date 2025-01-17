<script setup lang="ts">
import {
  type SortMethod,
  isSortMethod
} from '@/types/sort-method'
import { isSortOrder } from '@/types/sort-order'
import { type SortOptions } from '@/types/sort-options'
import { reactive } from 'vue'
import { isSelectElement } from '@/utils/is-select-element'

const options = reactive<SortOptions>({
  order: 'ASC'
})

const emit = defineEmits<{
  (e: 'update', options: SortOptions): void
}>()

const sortMethods: SortMethod[] = ['id', 'time', 'wins']

const onChange =
  <
    T extends keyof SortOptions,
    B = SortOptions[T] | undefined
  >(
    key: T,
    validator: (value: unknown) => value is B
  ) =>
  (event: Event) => {
    if (
      !isSelectElement(event.target) ||
      !validator(event.target.value)
    ) {
      return
    }

    // @ts-expect-error
    options[key] = event.target.value

    emit('update', options)
  }

const onSortMethodChange = onChange('method', isSortMethod)

const onSortOrderChange = onChange('order', isSortOrder)
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
