import { ref } from "vue";
import ApiService from "../service/ApiService";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useSupplierStore = defineStore("suppliers", () => {
  const supplier = ref({});
  const suppliers = ref([]);
  const loading = ref(false);
  const api_service = new ApiService("/proveedores/");
  const supplierEdit = reactive({
    id: '',
    nombre: '',
    email: '',
    contacto: '',
    telefono: '',
    activo: ''
  });

  async function listar() {
    loading.value = true;
    const data = await api_service.getAll();
    if (data) {
      suppliers.value = data;
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
  function setUser(supplier) {
    supplierEdit.id = supplier.id;
    supplierEdit.nombre = supplier.nombre;
    supplierEdit.email = supplier.email;
    supplierEdit.contacto = supplier.contacto;
    supplierEdit.activo = supplier.activo;
    supplierEdit.telefono = supplier.telefono;
  }
  return { suppliers, supplier,supplierEdit, crear, eliminar, modificar, buscarUno, listar, setUser };
});