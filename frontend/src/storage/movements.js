import { ref } from "vue";
import ApiService from "../service/ApiService";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useMovementStore = defineStore("movimientos", () => {
  const movement = ref({});
  const movements = ref([]);
  const loading = ref(false);
  const api_service = new ApiService("/movimientos/");
  const movementEdit = reactive({
    id: '',
    tipo: '',
    cantidad: '',
    motivo: '',
    user_id: '',
    producto_id: ''
  });

  async function listar_movement() {
    loading.value = true;
    const data = await api_service.getAll();
    if (data) {
      movements.value = data;
    }
    loading.value = false;
  }
  async function getMis() {
    loading.value = true;
    const data = await api_service.getMis();
    if (data) {
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
    await api_service.update(data, data.id);
  }

  async function eliminar(id) {
    await api_service.destroy(id);
  }
  function setMovement(movement) {
    movementEdit.id = movement.id;
    movementEdit.tipo = movement.tipo;
    movementEdit.cantidad = movement.cantidad;
    movementEdit.motivo = movement.motivo;
    movementEdit.producto_id = movement.producto;
    movementEdit.user_id = movement.user;
  }
  return { movements, movement, movementEdit, crear, eliminar, modificar, buscarUno, listar_movement, setMovement,getMis };
});