<script setup>
import { useRoute } from 'vue-router';
import MenuNav from './components/MenuNav.vue';
import { useAuthStore } from './storage/auth.js';
import { routes } from './routes/configs/navigation.js'
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { rol_user, authenticated } = storeToRefs(authStore);
const route = useRoute();
</script>

<template>
  <div id="app">
    <header v-if="route.path !== '/auth/login'">
      <MenuNav :links="routes" :rol_user="rol_user" :authenticated="authenticated"/>
    </header>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
    </main>
  </div>
</template>
