import { ref } from "vue";
import ApiService from "../service/ApiService";
import { defineStore } from "pinia";

export const useProductStore = defineStore("products", () => {
  const product = ref({});
  const products = ref([]);
  const loading = ref(false);
  const api_service = new ApiService("/productos/");

  async function listar() {
    loading.value = true;
    const data = await api_service.getAll();
    if (data) {
      console.table(data);
      products.value = data;
    }
    loading.value = false;
  }
  async function buscarUno(id) {
    loading.value = true;
    const data = await api_service.findOne(id);
    if (data) {
      product.value = data;
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
  return { products, product, crear, eliminar, modificar, buscarUno, listar };
});