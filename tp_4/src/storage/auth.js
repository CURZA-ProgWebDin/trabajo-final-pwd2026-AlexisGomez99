import AuthService from "../service/AuthService";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const auth_user = ref(null);
    const rol_user = ref("");
    const authenticated = ref(false);
    const jwt = ref("");
    const service = new AuthService();
    const errors = ref([]);
    const status_code = ref(null);

     async function login(user) {
      await service.login(user);
      auth_user.value = service.auth_user.nombre;
      authenticated.value = service.auth_user.authenticated;
      jwt.value = service.auth_user.jwt;
      rol_user.value = service.auth_user.rol;
    }
    function logout() {
        auth_user.value = null;
        jwt.value = "";
        authenticated.value = false;
        rol_user.value = "";
    }
    async function register(new_user) {
        const response = await service.register(new_user);
        if (response) {
            status_code.value = response;
        }
    }

    return {
        auth_user, rol_user, jwt, errors, status_code, authenticated, login, logout, register
    }
}, {
    persist: true
});