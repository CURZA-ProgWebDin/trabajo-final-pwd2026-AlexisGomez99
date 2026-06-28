import { ref } from "vue";
import ApiService from "../service/ApiService";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useRolesStore = defineStore("roles", () => {
  const rol = ref({});
  const roles = ref([]);
  const loading = ref(false);
  const api_service = new ApiService("/roles/");
  const rolEdit = reactive({
    id: '',
    nombre: '',
  });

  async function listar() {
    loading.value = true;
    const data = await api_service.getAll();
    if (data) {
      roles.value = data;
    }
    loading.value = false;
  }

  async function buscarUno(id) {
    loading.value = true;
    const data = await api_service.findOne(id);
    if (data) {
      rol.value = data;
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
  function setRol(rol) {
    rolEdit.id = rol.id;
    rolEdit.nombre = rol.nombre;
  }
  return { roles, rol, rolEdit, crear, eliminar, modificar, buscarUno, listar, setRol };
});