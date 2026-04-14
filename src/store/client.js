/**
 * 存储设备信息
 */
import { useStorage } from '@vueuse/core'
// import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import Fingerprint2 from "fingerprintjs2";
import axios from 'axios'
export const finger = useStorage('c-fg2', '')

export function useFinger() {
  if (finger.value) return
  axios.get('https://ipapi.co/json').then(res => {
    Fingerprint2.get(function (components) {
      const values = components.map((component,index) => {
          if(index === 0 ){
              return component.value.replace(/\bNetType\/\w+\b/,'')
          }
          return component.value
      }); // 配置的值的数组
      values.unshift(res.data.ip)
      const murmur = Fingerprint2.x64hash128(values.join(''), 31); // 生成浏览器指纹
      finger.value = murmur
    })
  })
}
