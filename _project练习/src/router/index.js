import Vue from "vue";
import vueRouter from "vue-router";

Vue.use(vueRouter);
const originalPush = vueRouter.prototype.push;
vueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};
const router = new vueRouter({
    routes: [{
            path: '/home',
            component: () =>
                import ('@/views/home'),
        },
        {
            path: '/player',
            component: () =>
                import ('@/views/player')
        },
        {
            path: '',
            redirect: '/home'
        },
    ],
});

export default router;