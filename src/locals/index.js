// index.js
import {createI18n} from 'vue-i18n'
import zh from './zh'
import en from './en'
import id from './id.js'
import ms from './ms.js'
import { useConfig } from '@/config'

const messages = {
    en,
    zh,
    id,
    ms
}
const { default_lang } = useConfig()


const i18n = createI18n({
    legacy: false,
    locale: default_lang, // 首先从缓存里拿，没有的话就用浏览器语言，
    fallbackLocale: 'zh', // 设置备用语言
    messages,
    globalInjection: true,
})

export default i18n

