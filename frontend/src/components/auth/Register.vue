<script setup>
import { computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useRolesStore } from "../../storage/roles";
import { useAuthStore } from "../../storage/auth";

const rolStore = useRolesStore();
const authStore = useAuthStore();
const { roles } = storeToRefs(rolStore);
const { listar } = rolStore;
const { register } = authStore;
const route = useRoute();
const router = useRouter();
const isRegister = computed(() => route.name === 'Register');
const new_user = reactive({
    nombre: "",
    email: "",
    rol_id: "",
    password: ""
});
onMounted(async () => {
    if (isRegister.value) {
        new_user.rol_id = 2;
    } else {
        await listar();
    }
});
async function submit() {
    if (new_user.nombre && new_user.email && new_user.password && new_user.rol_id) {
        await register(new_user);
        new_user.nombre = "";
        new_user.email = "";
        new_user.password = "";
        new_user.rol_id = "";
        if (isRegister) {
            router.push({ name: "Login" });
        } else {
            router.push({ name: 'UsersList' })
        }
    } else {
        alert("Complete todos los campos.");
    }
}
</script>

<template>
    <div class="form-container">
        <form @submit.prevent="submit" class="custom-form">
            <h2>{{ isRegister ? 'Registrarme' : 'Crear usuario' }}</h2>

            <div class="form-group">
                <label>NOMBRE</label>
                <input type="text" v-model="new_user.nombre" placeholder="Ej: Alexis Gómez">
            </div>

            <div class="form-group">
                <label>EMAIL</label>
                <input type="email" v-model="new_user.email" placeholder="correo@ejemplo.com">
            </div>

            <div class="form-group">
                <label>CONTRASEÑA</label>
                <input type="password" v-model="new_user.password" placeholder="••••••••">
            </div>

            <div v-if="!isRegister" class="form-group">
                <label>ROL</label>
                <select v-model="new_user.rol_id">
                    <option value="">-- Seleccionar Rol --</option>
                    <option v-for="rol in roles" :key="rol.id" :value="rol.id">
                        {{ rol.nombre }}
                    </option>
                </select>
            </div>

            <button type="submit" class="submit-btn">
                {{ isRegister ? 'REGISTRARME' : 'CREAR USUARIO' }}
            </button>
        </form>
    </div>
</template>

<style scoped>
.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.custom-form {
    background: #ffffff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
}

h2 {
    margin-top: 0;
    margin-bottom: 24px;
    color: #333333;
    text-align: center;
    font-size: 24px;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

label {
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 6px;
    color: #666666;
    letter-spacing: 0.5px;
}

input[type="text"],
input[type="email"],
input[type="password"],
select {
    padding: 12px;
    border: 1px solid #cccccc;
    border-radius: 6px;
    font-size: 14px;
    color: #333333;
    background-color: #fafafa;
    transition: all 0.3s ease;
    outline: none;
}

input:focus,
select:focus {
    border-color: #4f46e5;
    background-color: #ffffff;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

.submit-btn {
    width: 100%;
    padding: 14px;
    background-color: #4f46e5;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
    margin-top: 10px;
}

.submit-btn:hover {
    background-color: #4338ca;
}

.submit-btn:active {
    transform: scale(0.98);
}
</style>