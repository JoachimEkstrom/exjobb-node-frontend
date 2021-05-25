import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        component: () => import("../views/About.vue"),
    },
    {
        path: "/opc",
        name: "OPC",
        component: () => import("../views/OPC.vue"),
        props: {
            host: "http://localhost:3005",
        },
    },
    {
        path: "/influxdb",
        name: "InfluxDb",
        component: () => import("../views/InfluxDb.vue"),
        props: {
            host: "http://localhost:3005",
        },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
