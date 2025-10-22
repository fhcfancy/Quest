<template>
  <nav class="fixed top-6 left-6 z-50 flex gap-4">
    <router-link 
      v-for="link in navLinks" 
      :key="link.path"
      :to="link.path"
      class="px-6 py-2 rounded-lg bg-cosmic-purple/50 backdrop-blur-md border border-cosmic-accent/30 hover:border-cosmic-accent hover:bg-cosmic-accent/10 transition-all duration-300 text-sm font-medium"
      :class="{ 'border-cosmic-accent bg-cosmic-accent/20': $route.path === link.path }"
    >
      {{ $t(link.label) }}
    </router-link>
  </nav>
</template>

<script setup>
const navLinks = [
  { path: '/', label: 'nav.home' },
  { path: '/browse', label: 'nav.browse' },
  { path: '/ask', label: 'nav.ask' }
]
</script>

