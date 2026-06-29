import { ref } from "vue";
import ApiService from "../service/ApiService";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useUserStore = defineStore("usuarios", () => {
  const user = ref({});
  const users = ref([]);
  const loading = ref(false);
  const api_service = new ApiService("/users/");
  const userEdit = reactive({
    id: '',
    nombre: '',
    email: '',
    rol_id: ''
  });

  async function listar_users() {
    loading.value = true;
    const data = await api_service.getAll();
    if (data) {
      users.value = data;
    }
    loading.value = false;
  }

  async function buscarUno(id) {
    loading.value = true;
    const data = await api_service.findOne(id);
    if (data) {
      user.value = data;
    }
    loading.value = false;
  }

  async function crear(data) {
    await api_service.create(data);
  }

  async function modificar(data) {
    await api_service.update(data,data.id);
  }

  async function eliminar(id) {
    await api_service.destroy(id);
  }
  function setUser(user) {
    userEdit.id = user.id;
    userEdit.nombre = user.nombre;
    userEdit.email = user.email;
    userEdit.rol_id = user.rol;
  }
  return { users, user, userEdit, crear, eliminar, modificar, buscarUno, listar_users, setUser };
});