import { createRouter, createWebHistory } from "vue-router";
import { products } from "./products_routes.js";
import { categories } from "./categories_routes.js";
import { users } from "./users_routes.js";
import { roles } from "./roles_routes.js";
import { suppliers } from "./suppliers_routes.js";
import { movements } from "./movements_routes.js";
import { auth_routes } from "./auth_routes.js";
import { useAuthStore } from "../storage/auth.js";

const routes = [{
    path: "/",
    name: "Home",
    component: () => import("../views/HomeView.vue"),
    meta: {
        rol_access: ["admin", "operador"],
        required_auth: true,
        orden: 10,
        menu: true
    }
}, ...auth_routes, ...products, ...categories, ...users, ...roles, ...suppliers, ...movements];

export const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from) => {
    const authStore = useAuthStore()
    if (to.meta.rol_access && !authStore.authenticated && to.name !== 'Login') {
        return { name: "Login" }; 
    }
    if (to.meta.rol_access && !to.meta.rol_access.includes(authStore.rol_user) && to.name !== 'Home') {
        return { name: "Home" }
    }
})