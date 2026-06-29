<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '../../storage/users';
import { onMounted, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductStore } from '../../storage/products';
import { useMovementStore } from '../../storage/movements';

const router = useRouter();
const userStore = useUserStore();
const productStore = useProductStore();
const movementStore = useMovementStore();
const { products } = storeToRefs(productStore);
const { listar } = productStore;
const { users } = storeToRefs(userStore);
const { listar_users } = userStore;
const { movementEdit } = storeToRefs(movementStore);
const { modificar } = movementStore;
const cargando = ref(true);

onMounted(async () => {
    await listar_users();
    const nombreUsuarioMovimiento = movementEdit.value.user_id || movementEdit.value.user_nombre;
    if (nombreUsuarioMovimiento && users.value.length > 0) {
        const userEncontrado = users.value.find(
            (r) => r.nombre.toLowerCase().trim() === nombreUsuarioMovimiento.toLowerCase().trim()
        );
        if (userEncontrado) {
            movementEdit.value.user_id = userEncontrado.id;
        }
    }
    await listar();
    const nombreProductoMovimiento = movementEdit.value.producto_id || movementEdit.value.producto_nombre;
    if (nombreProductoMovimiento && products.value.length > 0) {
        const productoEncontrado = products.value.find(
            (r) => r.nombre.toLowerCase().trim() === nombreProductoMovimiento.toLowerCase().trim()
        );
        if (productoEncontrado) {
            movementEdit.value.producto_id = productoEncontrado.id;
        }
    }
    cargando.value = false;
})

async function editar() {
    await modificar(movementEdit.value);
    router.push({ name: 'Movements' })
}
</script>

<template>
    <div class="form-container">
        <form @submit.prevent="editar" class="custom-form">

            <button type="button" @click="router.push({ name: 'Movements' })" class="cancel-btn" title="Cancelar">
                <mdicon name="close" size="18"></mdicon>
            </button>

            <h2>Editar movimiento</h2>

            <!-- SECCIÓN TIPO CON RADIO BUTTONS -->
            <div class="form-group">
                <label>TIPO DE MOVIMIENTO</label>
                <div class="radio-group">
                    <label class="radio-label">
                        <input type="radio" name="tipo_movimiento" value="entrada" v-model="movementEdit.tipo">
                        <span class="custom-radio"></span>
                        ENTRADA
                    </label>

                    <label class="radio-label">
                        <input type="radio" name="tipo_movimiento" value="salida" v-model="movementEdit.tipo">
                        <span class="custom-radio"></span>
                        SALIDA
                    </label>
                </div>
            </div>

            <div class="form-group">
                <label>CANTIDAD</label>
                <input type="number" min="1" v-model="movementEdit.cantidad" placeholder="0">
            </div>

            <div class="form-group">
                <label>MOTIVO</label>
                <input type="text" v-model="movementEdit.motivo" placeholder="Ej: Venta presencial, Reposición...">
            </div>

            <!-- CORREGIDO: SELECCIÓN DE USUARIO -->
            <div v-if="!cargando" class="form-group">
                <label>USUARIO</label>
                <select v-model="movementEdit.user_id">
                    <option value="">-- Seleccionar Usuario --</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                        {{ user.nombre }}
                    </option>
                </select>
            </div>
            <div v-else class="loading-text">
                <p>Cargando usuarios...</p>
            </div>

            <!-- CORREGIDO: SELECCIÓN DE PRODUCTO -->
            <div v-if="!cargando" class="form-group">
                <label>PRODUCTO</label>
                <select v-model="movementEdit.producto_id">
                    <option value="">-- Seleccionar Producto --</option>
                    <option v-for="product in products" :key="product.id" :value="product.id">
                        {{ product.nombre }}
                    </option>
                </select>
            </div>
            <div v-else class="loading-text">
                <p>Cargando productos...</p>
            </div>

            <button type="submit" class="submit-btn">
                ACEPTAR CAMBIOS
            </button>
        </form>
    </div>
</template>

<style scoped>
.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #0f172a;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-sizing: border-box;
}

.custom-form {
    position: relative;
    background: #1e293b;
    padding: 40px 30px 30px 30px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    border: 1px solid #334155;
}

h2 {
    margin-top: 0;
    margin-bottom: 24px;
    color: #f8fafc;
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 1.5px;
}

.form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

label {
    font-size: 12px;
    font-weight: 700;
    margin-bottom: 6px;
    color: #94a3b8;
    letter-spacing: 0.5px;
}

input[type="text"],
input[type="number"],
select {
    padding: 12px;
    border: 1px solid #475569;
    border-radius: 6px;
    font-size: 14px;
    color: #f8fafc;
    background-color: #0f172a;
    transition: all 0.3s ease;
    outline: none;
    width: 100%;
    box-sizing: border-box;
}

input::placeholder {
    color: #64748b;
}

input:focus,
select:focus {
    border-color: #10b981;
    background-color: #0f172a;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
}

.loading-text {
    font-size: 13px;
    color: #64748b;
    margin-top: 4px;
}

.submit-btn {
    width: 100%;
    padding: 14px;
    background-color: #10b981;
    color: #0f172a;
    border: none;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.1s ease;
    margin-top: 10px;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.submit-btn:hover {
    background-color: #059669;
}

.submit-btn:active {
    transform: scale(0.98);
}

.cancel-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: #ef4444;
    color: #f8fafc;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(239, 68, 68, 0.25);
    transition: background-color 0.2s ease, transform 0.1s ease;
}

.cancel-btn:hover {
    background-color: #dc2626;
}

.cancel-btn:active {
    transform: scale(0.92);
}

/* ESTILOS DE LOS RADIO BUTTONS PERSONALIZADOS */
.radio-group {
    display: flex;
    gap: 20px;
    margin-top: 4px;
    padding: 6px 0;
}

.radio-label {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: #f8fafc;
    cursor: pointer;
    position: relative;
    user-select: none;
    letter-spacing: 0.5px;
}

.radio-label input[type="radio"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.custom-radio {
    height: 18px;
    width: 18px;
    background-color: #0f172a;
    border: 2px solid #475569;
    border-radius: 50%;
    margin-right: 8px;
    display: inline-block;
    position: relative;
    transition: all 0.25s ease;
}

.radio-label:hover input[type="radio"] ~ .custom-radio {
    border-color: #10b981;
}

.radio-label input[type="radio"]:checked ~ .custom-radio {
    border-color: #10b981;
    background-color: #0f172a;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
}

.custom-radio::after {
    content: "";
    position: absolute;
    display: none;
    top: 4px;
    left: 4px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #10b981;
}

.radio-label input[type="radio"]:checked ~ .custom-radio::after {
    display: block;
}
</style>