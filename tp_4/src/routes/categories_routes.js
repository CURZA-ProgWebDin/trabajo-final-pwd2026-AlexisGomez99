export const categories = [{
    path: "/categoria",
    name: "Categories",
    component: () => import("../views/CategoriesView.vue"),
    children: [
        {
            path: "create",
            component: () => import("../components/categories/CategoriesCreate.vue"),
            name: "CategoriesCreate",
            meta: {
                rol_access: ["admin"],
                required_auth: true,
                orden: 601,
                menu: false
            }
        },
        {
            path: "",
            component: () => import("../components/categories/CategoriesList.vue"),
            name: "CategoriesList",
            meta: {
                rol_access: ["admin", "operador"],
                required_auth: true,
                orden: 602,
                menu: false
            }
        }
    ],
    meta: {
        rol_access: ["admin", "operador"],
        required_auth: true,
        orden: 600,
        menu: true
    }
}]