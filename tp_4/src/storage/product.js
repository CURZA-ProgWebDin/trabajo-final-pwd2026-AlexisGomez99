import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("product", () => {
    const products = ref([
        { id: 1, nombre: "manzana", stock: 12, precio: 500 },
        { id: 2, nombre: "pera", stock: 11, precio: 500 }
    ]);

    return { products };
},
{
    persist:true
});