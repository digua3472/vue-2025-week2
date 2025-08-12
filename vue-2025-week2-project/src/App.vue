<script setup>
import { RouterLink, RouterView } from 'vue-router';


</script>

<template>
  <RouterLink to="/home">Home</RouterLink> |
  <RouterLink to="/about">About</RouterLink> |
  <RouterLink to="/week1">第一週作業</RouterLink> |
  <RouterLink to="/week2">第二週作業</RouterLink> |

  <RouterView />
</template>

<style scoped></style>
