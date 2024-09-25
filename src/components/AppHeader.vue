<script setup lang="ts">
const links = [
  { title: 'Garage', path: '/' },
  { title: 'Winners', path: '/winners' }
]
</script>

<template>
  <header>
    <nav>
      <ul>
        <li v-for="link of links" :key="link.path">
          <router-link :to="link.path">
            {{ link.title }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
