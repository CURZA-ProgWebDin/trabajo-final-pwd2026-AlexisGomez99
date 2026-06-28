export const roles = [{
    path: "/roles",
    name: "Roles",
    component: () => import("../views/RolesView.vue"),
    meta: {
        rol_access: ["admin"],
        required_auth: true,
        orden: 600,
        menu: true
    }
},
{
    path: "/create",
    component: () => import("../components/roles/RolesCreate.vue"),
    name: "RolesCreate",
    meta: {
        rol_access: ["admin"],
        required_auth: true,
        orden: 601,
        menu: false
    }
},
{
    path: "/edit",
    component: () => import("../components/roles/RolesEdit.vue"),
    name: "RolesEdit",
    meta: {
        rol_access: ["admin"],
        required_auth: true,
        orden: 602,
        menu: false
    }
}
]