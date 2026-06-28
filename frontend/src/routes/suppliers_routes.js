export const suppliers = [{
    path: "/proveedores",
    name: "Suppliers",
    component: () => import("../views/SuppliersView.vue"),
    meta: {
        rol_access: ["admin", "operador"],
        required_auth: true,
        orden: 300,
        menu: true
    },
},
{
    path: "/proveedores/create",
    component: () => import("../components/suppliers/SuppliersCreate.vue"),
    name: "SuppliersCreate",
    meta: {
        rol_access: ["admin", "operador"],
        required_auth: true,
        orden: 301,
        menu: false
    }
},{
    path: "/proveedores/edit",
    component: () => import("../components/suppliers/SuppliersEdit.vue"),
    name: "SuppliersEdit",
    meta: {
        rol_access: ["admin"],
        required_auth: true,
        orden: 302,
        menu: false
    }
}]
    