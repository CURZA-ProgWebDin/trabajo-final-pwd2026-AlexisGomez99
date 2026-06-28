import { ref } from "vue";
import ApiService from "../service/ApiService";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useCategorieStore = defineStore("categories", () => {
  const categorie = ref({});
  const categories = ref([]);
  const loading = ref(false);
  const api_service = new ApiService("/categorias/");
  const categorieEdit = reactive({
    id: '',
    nombre: '',
    descripcion: '',
  });

  async function listar_categoria() {
    loading.value = true;
    const data = await api_service.getAll();
    if (data) {
      categories.value = data;
    }
    loading.value = false;
  }

  async function buscarUno(id) {
    loading.value = true;
    const data = await api_service.findOne(id);
    if (data) {
      categorie.value = data;
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
  function setCategorie(categorie) {
    categorieEdit.id = categorie.id;
    categorieEdit.nombre = categorie.nombre;
    categorieEdit.descripcion = categorie.descripcion;
  }
  return { categories, categorie, categorieEdit, crear, eliminar, modificar, buscarUno, listar_categoria, setCategorie };
});