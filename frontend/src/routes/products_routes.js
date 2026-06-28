export const products = [{
    path: "/productos",
    name: "Products",
    component: () => import("../views/ProductsView.vue"),
    meta: {
        rol_access: ["admin", "operador"],
        required_auth: true,
        orden: 100,
        menu: true
    }
},
{
    path: "/productos/create",
    component: () => import("../components/products/ProductsCreate.vue"),
    name: "ProductsCreate",
    meta: {
        rol_access: ["admin", "operador"],
        required_auth: true,
        orden: 101,
        menu: false
    }
},
{
    path: "/productos/edit",
    component: () => import("../components/products/ProductsEdit.vue"),
    name: "ProductsEdit",
    meta: {
        rol_access: ["admin", "operador"],
        required_auth: true,
        orden: 102,
        menu: false
    }
}
]

