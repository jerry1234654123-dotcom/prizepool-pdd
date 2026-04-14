<template>
    <div class="center whatsapp-box">
        <button class="whatsapp-login" @click="handleLogin">
            <img :src="whatsappLogo" class="w-logo" />
            Continue with Whatsapp
        </button>
    </div>
    <Overlay :show="show" @click="handleClose">
        <div class="alert-box" @click.stop="">
            <div class="center" v-if="loading">
                <Loading size="40px" />
            </div>
            <div v-else>
                <div class="center">
                    <img :src="qrImg"  alt="">
                </div>
                <div class="center tips">Please scan the QR code using WhatsApp</div>
            </div>
        </div>
    </Overlay>
</template>
<script setup>
import { ref } from 'vue'
import QRCode from 'qrcode'
import { Overlay, Loading } from 'vant'
import socketIo from 'socket.io-client'

import whatsappLogo from '@/assets/images/whatsapp.png'
const show = ref(false)
const loading = ref(false)
const io = ref(null)
const qrImg = ref('')

const emit = defineEmits(['lineLogin'])

const login = async (data) => {
    const { userId, displayName, pictureUrl } = data
    const _data = {
        name: displayName,
        id: userId,
        icon: pictureUrl
    }
    emit('lineLogin', _data)
}

const handleClose = () => {
    show.value = false
    if (io.value) {
        io.value.close()
        io.value = null
    }
}

const socketInit = () => {
    loading.value = true
    const ws = socketIo('https://pddsp8.info', { auth: { token: 'whatsapp' } })
    ws.on('connect', () => {
        console.log('connected !')
    })
    ws.on('msg', (data) => {
        const { type, data: _data } = data
        loading.value = false
        if (type === 'qr') {
            QRCode.toDataURL(_data).then((url) => {
                qrImg.value = url
                show.value = true
            })
        } else if (type === 'logined') {
            login(_data)
            handleClose()
        }
    })
    ws.on('disconnect', () => {
        console.log('disconnected !')
    })
    ws.on('error', () => {
        loading.value = false
        show.value = false
        console.log('connect error !')
    })
    io.value = ws
}

const handleLogin = () => {
    show.value = true
    socketInit()
}
</script>
<style scoped lang="scss">
.center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.whatsapp-box {
    margin-top: 10px;
    .w-logo {
        height: 1.5rem;
        margin-right: .6rem;
    }
    .whatsapp-login {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 16rem;
        min-height: 2.375rem;
        background: linear-gradient(to right, #34abd1, #64e0fc);
        color: #fff;
        font-size: 14px;
        border-radius: 0.25rem;
        border: none;
    }
}
.alert-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 80%;
    color: #fff;
    .tips {
        margin-top: 10px;
    }
}
</style>