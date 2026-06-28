import { ref } from "vue";
import ApiService from "../service/ApiService";
import { defineStore } from "pinia";

export const useCategorieStore = defineStore("categories", () => {
  const categoria = ref({});
  const categorias = ref([]);
  const loading = ref(false);
  const api_service = new ApiService("/categorias/");

  async function listar() {
    loading.value = true;
    const data = await api_service.getAll();
    if (data) {
      console.table(data);
      categorias.value = data;
    }
    loading.value = false;
  }
  async function buscarUno(id) {
    loading.value = true;
    const data = await api_service.findOne(id);
    if (data) {
      categoria.value = data;
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
  return { categorias, categoria, crear, eliminar, modificar, buscarUno, listar };
});