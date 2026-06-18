export const movements = [{
    path: "/movimientos",
    name: "Movements",
    component: () => import("../views/MovementsView.vue"),
    children: [
        {
            path: "create",
            name: "MovementsCreate",
            component: () => import("../components/movements/MovementsCreate.vue"),
            meta: [{
                rol_access: ["admin"],
                required_auth: true,
                orden: 501,
                menu: false
            }],
        },
        {
            path: "",
            name: "MovementsList",
            component: () => import("../components/movements/MovementsList.vue"),
            meta: [{
                rol_access: ["admin", "operador"],
                required_auth: true,
                orden: 502,
                menu: false
            }]
        }],
    meta: {
        rol_access: ["admin", "operador"],
        required_auth: true,
        orden: 500,
        menu: true
    }
}]
