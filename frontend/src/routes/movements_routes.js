export const movements = [{
    path: "/movimientos",
    name: "Movements",
    component: () => import("../views/MovementsView.vue"),
    meta: {
        rol_access: ["admin", "operador"],
        required_auth: true,
        orden: 400,
        menu: true
    }
},
{
    path: "/movimientos/create",
    name: "MovementsCreate",
    component: () => import("../components/movements/MovementsCreate.vue"),
    meta: [{
        rol_access: ["admin", "operador"],
        required_auth: true,
        orden: 401,
        menu: false
    }],
},
{
    path: "/movimientos/edit",
    name: "MovementsEdit",
    component: () => import("../components/movements/MovementsEdit.vue"),
    meta: [{
        rol_access: ["admin", "operador"],
        required_auth: true,
        orden: 402,
        menu: false
    }]
}]

