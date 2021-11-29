<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Header from "./components/header/Header.vue";
import Footer from "./components/footer/Footer.vue";
import Menu from "./components/menu/Menu.vue";
</script>

<template>
  <Header />
  <Menu />
  <div class="container mx-auto">
    <router-view></router-view>
  </div>
  <Footer />
</template>
