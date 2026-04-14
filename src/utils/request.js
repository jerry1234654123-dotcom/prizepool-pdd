import axios from "axios";
import {storage} from "@/utils/index.js";
import JSONbig from 'json-bigint'
import i18n from '@/locals/index.js'
import { useConfig } from "@/config";

const { base_url } = useConfig()
const baseURL = (import.meta.env.MODE.indexOf('prod') !== -1 ? base_url : '') + '/api'

const service = axios.create({
    baseURL,
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000, // request timeout
});

service.defaults.transformResponse = [
    (data) => {
        const json = JSONbig({storeAsString: true})
        return json.parse(data)
    }

]

// request 拦截器 request interceptor
service.interceptors.request.use(
    (config) => {
        const token = storage.get('token')
        if (token) {
            config.headers['Authorization'] = token
        }
        const {t, locale} = i18n.global
        config.headers['lang'] = locale.value
        config.headers['deviceId'] = storage.get('murmur')
        return config;
    },
    (error) => {
        // do something with request error
        // for debug
        return Promise.reject(error);
    }
);
// respone拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.code !== 0) {
            // 登录超时,重新登录
            if (res.status === 401) {

            }
            return Promise.reject(res || "error");
        } else {
            if (res.code !== 0) {}
            return Promise.resolve(res);
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);

const req = (method) => {
    return (url, data) => {
        const conf = { method }
        if (method === 'get') {
            conf.params = data
        } else {
            conf.data = data
        }
        return service(url, conf).then(res => ({ ...res, res: res.data || res }), err => ({ ...(err || {}), err }))
    }
}

const http = {
    get: req('get'),
    post: req('post')
}
export default http