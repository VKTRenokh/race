<script setup lang="ts">
import { useGarageStore } from '@/stores/garage'
import type { Car, CarDto } from '@/types/car'
import { reactive, watchEffect, computed } from 'vue'

const props = defineProps<{ selectedCar?: Car }>()

const isEdit = computed(() => !!props.selectedCar)

const garage = useGarageStore()

const defaultColor = '#000000'

const formData = reactive<CarDto>({
  color: defaultColor,
  name: ''
})

watchEffect(() => {
  if (!props.selectedCar) {
    return
  }

  formData.name = props.selectedCar.name
  formData.color = props.selectedCar.color
})

const resetForm = () => {
  formData.name = ''
  formData.color = defaultColor
}

const isFormValid = () => formData.name !== ''

const editCar = () => {
  if (!props.selectedCar) {
    return
  }

  return garage.editCar(props.selectedCar.id, formData)
}

const mutate = () =>
  isEdit.value ? editCar() : garage.postCar(formData)

const onSubmit = async () => {
  if (!isFormValid()) {
    return
  }

  await mutate()

  resetForm()

  garage.loadCars()
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="form-container">
    <label for="name" class="form-label">Name</label>
    <input
      id="name"
      type="text"
      v-model="formData.name"
      class="form-input"
    />
    <label for="color" class="form-label">Car Color</label>
    <input
      id="color"
      type="color"
      v-model="formData.color"
      class="form-input"
    />
    <button type="submit" class="form-button">
      {{ isEdit ? 'Edit' : 'Create' }}
    </button>
  </form>
</template>

<style scoped>
.form-container {
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  padding: 1.5rem;
  border-radius: 8px;
  max-width: 400px;
  margin: 2rem 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s;
}

.form-container:hover {
  border-color: var(--color-border-hover);
}

.form-label {
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--color-background);
  color: var(--color-text);
  transition: border-color 0.3s;
}

.form-input:hover {
  border-color: var(--color-border-hover);
}

.form-button {
  width: 100%;
  padding: 0.75rem;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-button:hover {
  background-color: hsla(160, 100%, 30%, 1);
}
</style>
