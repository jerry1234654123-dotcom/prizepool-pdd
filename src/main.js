import './assets/main.css'

import { createApp } from 'vue'
import router from '@/router';
import App from './App.vue'
import 'vant/lib/index.css';
import './style/index.css'
import {createPinia} from "pinia";
import { Icon, SkeletonAvatar, Skeleton } from 'vant';
const app = createApp(App);
const pinia  = createPinia()
import i18n from './locals'

app.use(pinia);
// 路由
app.use(router);

app.use(i18n)
app.use(Icon)
app.use(SkeletonAvatar)
app.use(Skeleton)

app.mount('#app');
