<script setup lang="ts">
const links = [
  { title: 'Garage', path: '/' },
  { title: 'Winners', path: '/winners' }
]
</script>

<template>
  <header>
    <nav>
      <ul class="header-links">
        <li
          v-for="link of links"
          :key="link.path"
          class="header-link"
        >
          <router-link :to="link.path">
            {{ link.title }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header-links {
  display: flex;
  list-style: none;
  padding: 0;

  .header-link {
    a {
      font-size: 1.3rem;
      border-radius: 10%;
    }

    .router-link-active {
      color: hsla(160, 100%, 60%, 1);
    }
  }
}
</style>
