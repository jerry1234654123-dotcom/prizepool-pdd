import {showToast} from "vant";
import useClipboard from 'vue-clipboard3'
import i18n from '@/locals/index.js'

const storage = {
    get: (key) => {
        const value = window.localStorage.getItem(key)
        let result;
        try {
            const resultJson = JSON.parse(value)
            result = resultJson
        } catch (e) {
            result = value
        }
        return result
    },
    set: (key, value) => {

        const result = typeof value === 'object' ? JSON.stringify(value) : value.toString();
        window.localStorage.setItem(key, result)
    },
    clean: () => {
        window.localStorage.clear()
        clearAllCookie()
        window.sessionStorage.clear()
    }
}
const clearAllCookie = () => {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
}


const mGetDate = (month) => {
    const date = new Date();
    const year = date.getFullYear();
    const d = new Date(year, month, 0);
    return d.getDate();
}

const handleShare = async (url) => {

    // if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    //    console.log(navigator.share)
    //     if (navigator.share) {
    //         navigator.share({
    //             title: 'welcome',
    //             text: 'welcome',
    //             url: url
    //         })
    //     } else {
    //         const {toClipboard} = useClipboard()
    //         await toClipboard(url)
    //         showToast('复制成功！')
    //     }
    // } else {
    //     const {toClipboard} = useClipboard()
    //     await toClipboard(url)
    //     showToast('复制成功！')
    // }

    const {toClipboard} = useClipboard()
    await toClipboard(url)
    const {t} = i18n.global
    showToast(t('copy'))


}


const randomRange = (min, max) => {
    var returnStr = "",
        range = (max ? Math.round(Math.random() * (max - min)) + min : min),
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    for (var i = 0; i < range; i++) {
        var index = Math.round(Math.random() * (arr.length - 1));
        returnStr += arr[index];
    }
    return returnStr;
}

const generatePhoneNumber = () => {
    let prefix = [130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 145, 147, 150, 151, 152, 153, 155, 156, 157, 158, 159, 186, 187, 188];
    let prefixIndex = Math.floor(Math.random() * prefix.length);
    let phone = prefix[prefixIndex].toString();
    for (let i = 0; i < 8; i++) {
        phone += Math.floor(Math.random() * 10).toString();
    }
    return phone;
}

const getQuery = (key) => new URLSearchParams(window.location.search).get(key)

const getAvatar = () => {
    const ra = Math.ceil((Math.floor(Math.random() * 100) + 1) / 2) // 随机1 - 50
    return `/imgs/avatar/${ra}.svg`
}

export {
    storage,
    mGetDate,
    getQuery,
    getAvatar,
    handleShare,
    randomRange,
    generatePhoneNumber
}