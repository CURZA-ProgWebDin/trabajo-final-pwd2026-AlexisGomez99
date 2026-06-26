export const products = [{
    path: "/productos",
    name: "Products",
    component: () => import("../views/ProductsView.vue"),
    children: [
        {
            path: "create",
            component: () => import("../components/products/ProductsCreate.vue"),
            name: "ProductsCreate",
            meta: {
                rol_access: ["admin","operador"],
                required_auth: true,
                orden: 101,
                menu: false
            }
        },
        {
            path: "",
            component: () => import("../components/products/ProductsList.vue"),
            name: "ProductsList",
            meta: {
                rol_access: ["admin", "operador"],
                required_auth: true,
                orden: 102,
                menu: false
            }
        }
    ],
    meta: {
        rol_access: ["admin", "operador"],
        required_auth: true,
        orden: 100,
        menu: true
    }
}]