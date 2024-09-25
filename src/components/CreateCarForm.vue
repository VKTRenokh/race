<script setup lang="ts">
import { reactive } from 'vue'

const formData = reactive({
  color: '',
  name: ''
})

const onSubmit = (event: Event) => {
  event.preventDefault()

  console.log(formData)
}
</script>

<template>
  <form @submit="onSubmit">
    <input type="text" v-model="formData.name" />
    <input type="color" v-model="formData.color" />

    <button type="submit">Save</button>
  </form>
</template>
