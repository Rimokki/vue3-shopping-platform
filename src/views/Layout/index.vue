<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>

<script setup lang="ts">
  import LayoutNav from './components/LayoutNav.vue'
  import LayoutHeader from './components/LayoutHeader.vue'
  import LayoutFooter from './components/LayoutFooter.vue'
  import LayoutFixed from './components/LayoutFixed.vue'
  import { RouterView } from 'vue-router'
</script>

<style scoped></style>
