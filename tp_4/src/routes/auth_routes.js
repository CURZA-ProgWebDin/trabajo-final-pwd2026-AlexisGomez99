export const auth_routes = [{
    path: "/auth",
    name: "Auth",
    component: () => import("../views/LoginView.vue"),
    children: [
        {
            path: "login",
            component: () => import("../components/auth/Login.vue"),
            name: "Login",
            meta: {
                required_auth: false,
                orden: 2,
                menu: true
            }
        }
    ],
    meta: {
        required_auth: false,
        orden: 1,
        menu: true
    }
}]