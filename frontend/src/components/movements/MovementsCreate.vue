<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useRolesStore } from "../../storage/roles";
import { useUserStore } from "../../storage/users";
import { useProductStore } from "../../storage/products";
import { useMovementStore } from "../../storage/movements";

const productoStore = useProductStore();
const movementStore = useMovementStore();
const userStore = useUserStore()
const { users } = storeToRefs(userStore);
const { products } = storeToRefs(productoStore);
const { listar } = productoStore;
const { listar_users } = userStore;
const { crear } = movementStore;
const router = useRouter();
const cargando = ref(true);

const productoCargado = ref(null);

const new_movement = reactive({
    id: '',
    tipo: '',
    cantidad: '',
    motivo: '',
    user_id: '',
    producto_id: ''
});

onMounted(async () => {
    await listar();
    await listar_users();
    cargando.value = false;
});

const stockInsuficiente = computed(() => {
    if (new_movement.tipo === 'salida' && productoCargado.value) {
        const cantidadIngresada = Number(new_movement.cantidad) || 0;
        return cantidadIngresada > productoCargado.value.stock_actual;
    }
    return false;
});

async function submit() {
    if (stockInsuficiente.value) return;

    if (new_movement.tipo && new_movement.cantidad && new_movement.motivo && new_movement.user_id && new_movement.producto_id) {
        await crear(new_movement);
        new_movement.tipo = "";
        new_movement.cantidad = "";
        new_movement.motivo = "";
        new_movement.user_id = "";
        new_movement.producto_id = "";
        productoCargado.value = null; 
        router.push({ name: 'Movements' })
    } else {
        alert("Complete todos los campos.");
    }
}

async function productoSelect(){
    if (!new_movement.producto_id) {
        productoCargado.value = null;
        return;
    }

    const product = await productoStore.buscarUno(new_movement.producto_id);
    productoCargado.value = product;
}
</script>

<template>
    <div class="form-container">
        <div class="layout-wrapper">
            
            <form @submit.prevent="submit" class="custom-form">
                <button type="button" @click="router.push({ name: 'Movements' })" class="cancel-btn" title="Cancelar">
                    <mdicon name="close" size="18"></mdicon>
                </button>

                <h2>Crear movimiento</h2>

                <div class="form-group">
                    <label>TIPO DE MOVIMIENTO</label>
                    <div class="radio-group">
                        <label class="radio-label">
                            <input 
                                type="radio" 
                                name="tipo_movimiento" 
                                value="entrada" 
                                v-model="new_movement.tipo"
                            >
                            <span class="custom-radio"></span>
                            ENTRADA
                        </label>

                        <label class="radio-label">
                            <input 
                                type="radio" 
                                name="tipo_movimiento" 
                                value="salida" 
                                v-model="new_movement.tipo"
                            >
                            <span class="custom-radio"></span>
                            SALIDA
                        </label>
                    </div>
                </div>

                <div v-if="!cargando" class="form-group">
                    <label>PRODUCTO</label>
                    <select v-model="new_movement.producto_id" @change="productoSelect">
                        <option value="">-- Seleccionar Producto --</option>
                        <option v-for="product in products" :key="product.id" :value="product.id">
                            {{ product.nombre }}
                        </option>
                    </select>
                </div>
                <div v-else class="loading-text">
                    <p>Cargando productos...</p>
                </div>

                <div class="form-group">
                    <label>CANTIDAD</label>
                    <input 
                        type="number" 
                        min="1" 
                        v-model="new_movement.cantidad" 
                        placeholder="0"
                        :class="{ 'input-error': stockInsuficiente }"
                    >
                    <span v-if="stockInsuficiente" class="error-msg">
                        Stock insuficiente para realizar esta salida.
                    </span>
                </div>

                <div class="form-group">
                    <label>MOTIVO</label>
                    <input type="text" v-model="new_movement.motivo" placeholder="Ej: Venta presencial, Reposición...">
                </div>
                
                <div v-if="!cargando" class="form-group">
                    <label>USUARIO</label>
                    <select v-model="new_movement.user_id">
                        <option value="">-- Seleccionar Usuario --</option>
                        <option v-for="user in users" :key="user.id" :value="user.id">
                            {{ user.nombre }}
                        </option>
                    </select>
                </div>
                <div v-else class="loading-text">
                    <p>Cargando usuarios...</p>
                </div>
                <button type="submit" class="submit-btn" :disabled="stockInsuficiente">
                    CREAR MOVIMIENTO
                </button>
            </form>

            <div v-if="productoCargado" class="info-dashboard">
                <div class="dashboard-header">
                    <span class="pulse-indicator"></span>
                    <h3>Información del Producto</h3>
                </div>
                
                <div class="product-title-section">
                    <span class="label-badge">PRODUCTO</span>
                    <h4>{{ productoCargado.nombre }}</h4>
                    <p class="desc">{{ productoCargado.descripcion || 'Sin descripción' }}</p>
                </div>

                <div class="dashboard-grid">
                    <div class="dash-item main-stock" :class="{ 'stock-danger': productoCargado.stock_actual <= productoCargado.stock_minimo || stockInsuficiente }">
                        <p class="dash-label">STOCK ACTUAL</p>
                        <p class="dash-value">{{ productoCargado.stock_actual }} </p>
                    </div>

                    <div class="dash-item">
                        <p class="dash-label">STOCK MÍNIMO</p>
                        <p class="dash-value small">{{ productoCargado.stock_minimo }} </p>
                    </div>

                    <div class="dash-item price-item">
                        <p class="dash-label">PRECIO COSTO</p>
                        <p class="dash-value small">${{ productoCargado.precio_costo }}</p>
                    </div>

                    <div class="dash-item price-item">
                        <p class="dash-label">PRECIO VENTA</p>
                        <p class="dash-value small">${{ productoCargado.precio_venta }}</p>
                    </div>
                </div>

                <div v-if="stockInsuficiente" class="critical-alert stock-insufficient-alert">
                    <p><strong> ERROR CRÍTICO:</strong> No puedes retirar {{ new_movement.cantidad }} unidades. Solo dispones de {{ productoCargado.stock_actual }} en inventario.</p>
                </div>
                <div v-else-if="productoCargado.stock_actual <= productoCargado.stock_minimo" class="critical-alert">
                    <p><strong> ALERTA DE INVENTARIO:</strong> El nivel de stock actual se encuentra en o por debajo del margen de resguardo mínimo establecido.</p>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.form-container {
    display: block;
    min-height: 100vh;
    padding: 40px 20px;
    background-color: #0f172a;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-sizing: border-box;
}

.layout-wrapper {
    display: table;
    margin: 0 auto;
    border-collapse: separate;
    border-spacing: 24px 0;
}

.custom-form,
.info-dashboard {
    display: table-cell;
    vertical-align: top;
    box-sizing: border-box;
}

.custom-form {
    position: relative;
    background: #1e293b;
    padding: 40px 30px 30px 30px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    width: 400px;
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
    display: block;
    margin-bottom: 20px;
}

label {
    display: block;
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

input:focus,
select:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
}

/* ESTILOS NUEVOS DE VALIDACIÓN */
.input-error {
    border-color: #ef4444 !important;
}
.input-error:focus {
    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.15) !important;
}
.error-msg {
    display: block;
    color: #f87171;
    font-size: 12px;
    margin-top: 6px;
    font-weight: 600;
}
.stock-insufficient-alert {
    background-color: rgba(239, 68, 68, 0.2) !important;
    border-color: rgba(239, 68, 68, 0.4) !important;
}
.stock-insufficient-alert p {
    color: #fca5a5 !important;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input[type="number"] {
    -moz-appearance: textfield;
}

.loading-text {
    font-size: 13px;
    color: #64748b;
    margin-bottom: 20px;
}

.info-dashboard {
    background: #1e293b;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    width: 320px;
    border: 1px solid #334155;
    animation: fadeIn 0.4s ease;
}

.dashboard-header {
    display: block;
    border-bottom: 1px solid #334155;
    padding-bottom: 12px;
    margin-bottom: 18px;
}

.pulse-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: #3b82f6;
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: middle;
}

.dashboard-header h3 {
    display: inline-block;
    margin: 0;
    font-size: 14px;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    vertical-align: middle;
}

.product-title-section {
    margin-bottom: 20px;
}

.label-badge {
    display: inline-block;
    font-size: 9px;
    background-color: rgba(59, 130, 246, 0.15);
    color: #3b82f6;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 700;
    margin-bottom: 4px;
}

.product-title-section h4 {
    margin: 0 0 4px 0;
    font-size: 18px;
    color: #f8fafc;
    font-weight: 600;
}

.product-title-section .desc {
    margin: 0;
    font-size: 13px;
    color: #64748b;
    line-height: 1.4;
}

.dashboard-grid {
    display: block;
}

.dash-item {
    display: block;
    background-color: #0f172a;
    border: 1px solid #334155;
    border-radius: 8px;
    padding: 12px 16px;
    margin-bottom: 12px;
    box-sizing: border-box;
}

.main-stock {
    border-left: 4px solid #3b82f6;
    background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
}

.main-stock.stock-danger {
    border-left-color: #ef4444;
    background: linear-gradient(135deg, #0f172a 0%, #451a03 100%);
}

.price-item {
    width: 47%;
    display: inline-block;
    margin-right: 5%;
}
.price-item:last-child {
    margin-right: 0;
}

.dash-label {
    margin: 0 0 4px 0;
    font-size: 10px;
    font-weight: 700;
    color: #64748b;
    letter-spacing: 0.5px;
}

.dash-value {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #f8fafc;
    line-height: 1;
}

.dash-value span {
    font-size: 12px;
    color: #64748b;
    font-weight: 400;
}

.dash-value.small {
    font-size: 16px;
}

.stock-danger .dash-value {
    color: #ef4444;
}

.critical-alert {
    background-color: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 6px;
    padding: 12px;
    margin-top: 15px;
}

.critical-alert p {
    margin: 0;
    font-size: 11px;
    color: #f87171;
    line-height: 1.5;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateX(10px); }
    to { opacity: 1; transform: translateX(0); }
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

.submit-btn:hover:not(:disabled) {
    background-color: #059669;
}

.submit-btn:disabled {
    background-color: #475569;
    color: #1e293b;
    cursor: not-allowed;
    box-shadow: none;
}

.submit-btn:active:not(:disabled) {
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