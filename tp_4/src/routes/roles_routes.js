export const roles = [{
    path: "/roles",
    name: "Roles",
    component: () => import("../views/RolesView.vue"),
    children: [
        {
            path: "create",
            component: () => import("../components/roles/RolesCreate.vue"),
            name: "RolesCreate",
            meta: {
                rol_access: ["admin"],
                required_auth: true,
                orden: 201,
                menu: false
            }
        },
        {
            path: "",
            component: () => import("../components/roles/RolesList.vue"),
            name: "RolesList",
            meta: {
                rol_access: ["admin", "operador"],
                required_auth: true,
                orden: 202,
                menu: false
            }
        }
    ],
    meta: {
        rol_access: ["admin", "operador"],
        required_auth: true,
        orden: 200,
        menu: true
    }
}]