import { ref } from "vue";
import ApiService from "../service/ApiService";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useProductStore = defineStore("productos", () => {
  const product = ref({});
  const products = ref([]);
  const loading = ref(false);
  const api_service = new ApiService("/productos/");
  const productEdit = reactive({
    id: '',
    nombre: '',
    descripcion: '',
    precio_costo: '',
    precio_venta: '',
    stock_actual: '',
    stock_minimo: '',
    proveedor_id: '',
    categoria_id: ''
  });

  async function listar() {
    loading.value = true;
    const data = await api_service.getAll();
    if (data) {
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
    await api_service.update(data,data.id);
  }

  async function eliminar(id) {
    await api_service.destroy(id);
  }
  function setProduct(product) {
    productEdit.id = product.id;
    productEdit.nombre = product.nombre;
    productEdit.descripcion = product.descripcion;
    productEdit.precio_costo = product.precio_costo;
    productEdit.precio_venta =  product.precio_venta;
    productEdit.stock_actual = product.stock_actual;
    productEdit.stock_minimo = product.stock_minimo;
    productEdit.categoria_id = product.categoria;
    productEdit.proveedor_id = product.proveedor;
  }
  return { products, product, productEdit, crear, eliminar, modificar, buscarUno, listar, setProduct };
});