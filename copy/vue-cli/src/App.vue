<template>
  <Header :menu="menu" v-if="header && header == 'userHeader'"/>


  <div class="drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle"> 
    <div class="flex flex-col  drawer-content" style="max-height: none">
      <div class="flex flex-col w-full">
          <router-view></router-view>  
      </div>
    </div> 

    <div class="drawer-side mt-1 pt-20">
      <label for="my-drawer-2" class="drawer-overlay"></label> 
      <Menu v-if="menu && menu == 'userMenu'"/>
      <QuestMenu v-if="menu && menu == 'questMenu'"/>
    </div>

  </div>
  <Footer v-if="footer && footer == 'globalFooter'"/>
</template>



<script setup>
import Header from "./components/header/Header.vue";
import Footer from "./components/footer/Footer.vue";
import Menu from "./components/menu/Menu.vue";
import QuestMenu from "./components/menu/QuestMenu.vue";

import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import direction from "./utils/direction"
const route = useRoute();
const menu  = ref(false);
const header  = ref(false);
const footer  = ref(false);

watch(route, (route) => {
  const dir = direction.filter(i => i.page == route.name)[0]
  if(dir){
    menu.value = typeof dir.menu === "undefined" ? direction[0].menu : dir.menu; 
    header.value = typeof dir.header === "undefined" ? direction[0].header : dir.header; 
    footer.value = typeof dir.footer === "undefined" ? direction[0].footer : dir.footer;          
  }else{
    menu.value = direction[0].menu;
    header.value = direction[0].header;
    footer.value = direction[0].footer;
  }

})


</script>