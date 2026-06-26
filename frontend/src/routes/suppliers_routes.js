export const suppliers = [{
    path: "/proveedores",
    name: "Suppliers",
    component: () => import("../views/SuppliersView.vue"),
    children: [
        {
            path: "create",
            component: () => import("../components/suppliers/SuppliersCreate.vue"),
            name: "SuppliersCreate",
            meta: {
                rol_access: ["admin", "operador"],
                required_auth: true,
                orden: 301,
                menu: false
            }
        },
        {
            path: "",
            component: () => import("../components/suppliers/SuppliersList.vue"),
            name: "SuppliersList",
            meta: {
                rol_access: ["admin", "operador"],
                required_auth: true,
                orden: 302,
                menu: false
            }
        }
    ],
    meta: {
        rol_access: ["admin", "operador"],
        required_auth: true,
        orden: 300,
        menu: true
    }
}]