import { ref } from "vue";
import ApiService from "../service/ApiService";
import { defineStore } from "pinia";
import AuthService from "../service/AuthService";

export const useUserStore = defineStore("movements", () => {
    const movement = ref({});
    const movements = ref([]);
    const loading = ref(false);
    const api_service = new ApiService("/movimientos/");
    const auth_service = new AuthService();

    async function listar() {
        loading.value = true;
        const data = await api_service.getAll();
        if (data) {
            console.table(data);
            movements.value = data;
        }
        loading.value = false;
    }
    async function buscarUno(id) {
        loading.value = true;
        const data = await api_service.findOne(id);
        if (data) {
            movement.value = data;
        }
        loading.value = false;
    }
    async function crear(data) {
        await api_service.create(data);
    }
    async function modificar(data) {
        await api_service.update(data);
    }
    async function eliminar(id) {
        await api_service.destroy(id);
    }
    async function misMovimientos() {
        await auth_service.getMe();
    }
    return { movements, movement, crear, eliminar, modificar, buscarUno, listar, misMovimientos };
});