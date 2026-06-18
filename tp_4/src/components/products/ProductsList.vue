<script setup>
import { useProductStore } from "../../storage/product"
const store = useProductStore();
</script>

<template>
    <h1>LISTA PRODUCTOS</h1>
    <table>
        <thead>
            <tr>
                <th>NOMBRE</th>
                <th>STOCK</th>
                <th>PRECIO</th>
            </tr>
        </thead>
        <tbody v-for="product in store.products" :key="product.id">
            <tr>
                <td>{{ product.nombre }}</td>
                <td>{{ product.stock }}</td>
                <td>{{ product.precio }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}
</style>