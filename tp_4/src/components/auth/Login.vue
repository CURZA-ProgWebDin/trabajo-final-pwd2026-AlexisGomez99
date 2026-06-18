<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '../../storage/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router"

const router = useRouter();
const { login } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());
const user = reactive({
    nombre: "",
    password: ""
});

function submit() {
    if (user.password && user.nombre) {
        login(user);
        if (authenticated.value === true) {
            console.log(authenticated.value);
            alert("Acceso correcto");
            router.push({ name: "Home" });
        } else {
            console.log(authenticated.value);
            alert("Acceso denegado usuario o contraseña incorrectos");
        }
    } else {
        alert("debe completar todos los campos");
    }
}
</script>

<template>
    <section>
        <h2>LOGIN</h2>
        <form @submit.prevent="submit">
            <div class="input">
                <label for="">NOMBRE</label>
                <input type="text" v-model="user.nombre" />
            </div>
            <div class="input">
                <label for="">PASSWORD</label>
                <input type="password" v-model="user.password" />
            </div>
            <button @submit.prevent="submit">ENTRAR</button>
        </form>
    </section>
</template>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.input {
    text-align: center;
    display: flex;
    flex-direction: column;
    width: 30%;
}
</style>