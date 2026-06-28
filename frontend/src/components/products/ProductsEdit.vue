<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '../../storage/users';
import { onMounted, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRolesStore } from '../../storage/roles';
import { useCategorieStore } from '../../storage/categories';
import { useProductStore } from '../../storage/products';
import { useSupplierStore } from '../../storage/suppliers';

const router = useRouter();
const categoriaStore = useCategorieStore();
const productStore = useProductStore();
const supplierStore = useSupplierStore();
const { suppliers } = storeToRefs(supplierStore);
const { listar } = supplierStore;
const { categories } = storeToRefs(categoriaStore);
const { listar_categoria } = categoriaStore;
const { productEdit } = storeToRefs(productStore);
const { modificar } = productStore;
const cargando = ref(true);

onMounted(async () => {
    // todo esto para que el valor 'admin' o cualquier nombre pase a dato numerico como 1 y pueda reflectarse en el select
    await listar();
    await listar_categoria()
    const nombreProveedorProducto = productEdit.value.proveedor_id || productEdit.value.proveedor_nombre;
    if (nombreProveedorProducto && suppliers.value.length > 0) {
        const proveedorEncontrador = suppliers.value.find(
            (r) => r.nombre.toLowerCase().trim() === nombreProveedorProducto.toLowerCase().trim()
        );
        if (proveedorEncontrador) {
            productEdit.value.proveedor_id = proveedorEncontrador.id;
        }
    }
    const nombreCategoriaProducto = productEdit.value.categoria_id || productEdit.value.categoria_nombre;
    if (nombreCategoriaProducto && categories.value.length > 0) {
        const categoriaEncontrador = categories.value.find(
            (r) => r.nombre.toLowerCase().trim() === nombreCategoriaProducto.toLowerCase().trim()
        );
        if (categoriaEncontrador) {
            productEdit.value.categoria_id = categoriaEncontrador.id;
        }
    }
    cargando.value = false;
})

async function editar() {
    await modificar(productEdit.value);
    router.push({ name: 'Products' })
}
</script>

<template>
    <div class="form-container">
        <form @submit.prevent="editar" class="custom-form">

            <button type="button" @click="router.push({ name: 'Products' })" class="cancel-btn" title="Cancelar">
                <mdicon name="close" size="18"></mdicon>
            </button>

            <h2>Editar producto</h2>

            <div class="form-group">
                <label>NOMBRE</label>
                <input type="text" v-model="productEdit.nombre" required>
            </div>
            <div class="form-group">
                <label>DESCRIPCION</label>
                <input type="text" v-model="productEdit.descripcion">
            </div>
            
            <div class="form-group">
                <label>PRECIO_COSTO</label>
                <input type="number" min="0" step="any" v-model="productEdit.precio_costo">
            </div>
            <div class="form-group">
                <label>PRECIO_VENTA</label>
                <input type="number" min="0" step="any" v-model="productEdit.precio_venta">
            </div>
            <div class="form-group">
                <label>STOCK_ACTUAL</label>
                <input type="number" min="0" v-model="productEdit.stock_actual">
            </div>
            <div class="form-group">
                <label>STOCK_MINIMO</label>
                <input type="number" min="0" v-model="productEdit.stock_minimo">
            </div>        
            

            <div v-if="!cargando" class="form-group">
                <label>PROVEEDOR</label>
                <select v-model="productEdit.proveedor_id">
                    <option value="">-- Seleccionar Proveedor --</option>
                    <option v-for="proveedor in suppliers" :key="proveedor.id" :value="Number(proveedor.id)">
                        {{ proveedor.nombre }}
                    </option>
                </select>
            </div>
            <div v-else>
                <p>Cargando proveedores...</p>
            </div>
            <div v-if="!cargando" class="form-group">
                <label>CATEGORIA</label>
                <select v-model="productEdit.categoria_id">
                    <option value="">-- Seleccionar Categoria --</option>
                    <option v-for="categoria in categories" :key="categoria.id" :value="Number(categoria.id)">
                        {{ categoria.nombre }}
                    </option>
                </select>
            </div>
            <div v-else>
                <p>Cargando categorias...</p>
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

/* Agregado input[type="number"] a la lista de estilos globales */
input[type="text"],
input[type="email"],
input[type="password"],
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

/* Agregado input[type="number"]:focus para unificar la transición */
input:focus,
select:focus {
    border-color: #10b981;
    background-color: #0f172a;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15);
}

/* Ocultar las flechas por defecto que traen los inputs de tipo número */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield; /* Para Firefox */
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
</style>