<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <app-header />
  <router-view v-slot="{ Component }">
    <transition name="scale">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.35s ease;
}

.scale-enter-from,
.scale-leave-to {
  position: absolute;
  opacity: 0;
  transform: scale(0.8);
}
</style>
