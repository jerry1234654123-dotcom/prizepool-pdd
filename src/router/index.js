import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router';
import routes from './routers.js';
import {storage} from "@/utils/index.js";

const router = createRouter({
    history: createWebHashHistory('/'),
    routes: routes,
});

router.beforeEach(async (_to, _from, next) => {
    if (storage.get('token')) {
        next();
    } else {
        if (_to.path !== '/') {
            next('/')
        } else {
            next();
        }

        // await router.replace('/')
    }

});

export default router;