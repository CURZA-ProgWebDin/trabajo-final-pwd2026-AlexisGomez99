export const users = [{
    path: "/usuarios",
    name: "Users",
    component: () => import("../views/UsersView.vue"),
    children: [
        {
            path: "create",
            component: () => import("../components/users/UsersCreate.vue"),
            name: "UsersCreate",
            meta: {
                rol_access: ["admin"],
                required_auth: true,
                orden: 301,
                menu: false
            }
        },
        {
            path: "",
            component: () => import("../components/users/UsersList.vue"),
            name: "UsersList",
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