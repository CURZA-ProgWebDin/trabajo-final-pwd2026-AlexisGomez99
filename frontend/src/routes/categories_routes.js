export const categories = [{
    path: "/categoria",
    name: "Categories",
    component: () => import("../views/CategoriesView.vue"),
    meta: {
        rol_access: ["admin"],
        required_auth: true,
        orden: 200,
        menu: true
    }
},
{
    path: "/categoria/create",
    component: () => import("../components/categories/CategoriesCreate.vue"),
    name: "CategoriesCreate",
    meta: {
        rol_access: ["admin"],
        required_auth: true,
        orden: 201,
        menu: false
    }
},
{
    path: "/categoria/edit",
    component: () => import("../components/categories/CategoriesEdit.vue"),
    name: "CategoriesEdit",
    meta: {
        rol_access: ["admin"],
        required_auth: true,
        orden: 202,
        menu: false
    }
}
]
