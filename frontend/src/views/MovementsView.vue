<script setup>
import MovementsList from '../components/movements/MovementsList.vue';
import MyMovements from '../components/movements/MyMovements.vue';
import { useAuthStore } from '../storage/auth.js';

const authStore = useAuthStore();
const { rol_user } = authStore;
</script>
<template>
    <section v-if="rol_user === 'admin'">
        <MovementsList></MovementsList>
    </section>
    <section v-else>
        <MyMovements></MyMovements>
    </section>
</template>