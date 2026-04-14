<template>
    <div class="phone-login">
        <div class="center">
            <div class="title">
                {{ isLogin ? '登录' : '注册' }}
                <div class="circle"></div>
            </div>
        </div>
        <div>
            <Field
                v-model="account"
                placeholder="请输入手机号"
            />
            <Field
                v-model="pass"
                type="password"
                placeholder="请输入密码"
            />
            <template v-if="!isLogin">
                <Field
                    v-model="pass2"
                    type="password"
                    placeholder="请确认密码"
                />
                <div class="verify-box">
                    <Field
                        v-model="sms_answer"
                        placeholder="请输入验证码"
                    />
                    <Button type="primary" size="small" :loading="smsloading" :disabled="smsdisabled" class="send" @click="handleSendSMS">{{ sendtext }}</Button>
                </div>
            </template>
            <Button block type="primary" size="small" :loading="loading" class="btn" @click="handleClick">{{ isLogin ? '登录' : '注册' }}</Button>
            <Button block size="small" class="btn" @click="handleChange">前往{{ isLogin ? '注册' : '登录' }}</Button>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { Field, Button, showToast } from 'vant'
import { sendSms, registerSms, loginSms } from '@/utils/api'
import { getQuery } from '@/utils'
import { useConfig } from '@/config'
import { token } from '@/store/userInfo'

const account = ref('')
const pass = ref('')
const pass2 = ref('')
const sms_answer = ref('')
const sms_id = ref('')
const sendtext = ref('发送验证码')
const isLogin = ref(false)
const loading = ref(false)
const smsloading = ref(false)
const smsdisabled = ref(false)
const count = ref(0)
let timmer = null
const user_code = getQuery('user_code')

const emit = defineEmits(['close'])

const { platformId } = useConfig()
const handleCount = () => {
    count.value = 30
    const go = () => {
        count.value --
        if (count.value <= 0) {
            clearInterval(timmer)
            smsdisabled.value = false
            sendtext.value = '发送验证码'
            return
        }
        sendtext.value = `${count.value} s`
    }
    go()
    timmer = setInterval(go, 1000)
}

const handleChange = () => {
    isLogin.value = !isLogin.value
}

const handleSendSMS = async () => {
    if (!account.value) return showToast('请输入手机号码')
    if (!/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(account.value)) return showToast('请输入正确的手机号')
    smsloading.value = true
    const { res } = await sendSms({ phone: account.value })
    smsloading.value = false
    if (res) {
        sms_id.value = res.sms_id
        smsdisabled.value = true
        handleCount()
    }
}

const goLogin = (t) => {
    token.value = t
    emit('close')
}

const login = async () => {
    if (!account.value) return showToast('请输入手机号')
    if (!pass.value) return showToast('请输入密码')
    const data = {
        PlatformId: platformId,
        account: account.value,
        pass: pass.value,
    }
    if (user_code) {
        data.user_code = user_code
    }
    loading.value = true
    const { res, err } = await loginSms(data)
    loading.value = false
    if (res) {
        showToast('登录成功')
        goLogin(res.token)
    }
    err?.msg && showToast(err.msg)
}

const register = async () => {
    if (!account.value) return showToast('请输入手机号')
    if (!pass.value) return showToast('请输入密码')
    if (!pass2.value) return showToast('请确认密码')
    if (pass.value !== pass2.value) return showToast('两次输入的密码不一致')
    if (!sms_id.value) return showToast('请发送验证码')
    if (!sms_answer.value) return showToast('请输入验证码')
    const data = {
        PlatformId: platformId,
        account: account.value,
        pass: pass.value,
        sms_id: sms_id.value,
        sms_answer: sms_answer.value
    }
    if (user_code) {
        data.user_code = user_code
    }
    loading.value = true
    const { res, err } = await registerSms(data)
    loading.value = false
    if (res) {
        showToast('注册成功')
        goLogin(res.token)
    }
    err?.msg && showToast(err.msg)
}

const handleClick = () => {
    isLogin.value ? login() : register()
}
</script>
<style scoped lang="scss">
.phone-login {
    .center {
        text-align: center;
    }
    .title {
        display: inline-block;
        margin: 0 auto 12px;
        padding: 0 16px;
        position: relative;
        color: #041b2b;
        font-size: 22px;
        font-weight: bold;
        text-align: center;
        .circle {
            width: 10px;
            height: 10px;
            border-radius: 100%;
            position: absolute;
            right: 0;
            top: 0;
            border: 3px solid #266efe;
        }
    }
    .verify-box {
        display: flex;
        align-items: center;
        .send {
            width: 120px;
        }
    }
    .btn {
        margin-top: 16px;
    }
    .link {
        color: #266efe;
        font-size: 14px;
        padding: 8px 0;
        margin-top: 8px;
    }
}
</style>