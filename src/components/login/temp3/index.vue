<template>
  <Overlay :show="props.show" @click="handleClose">
    <div class="wrapper">
      <div class="content" @click.stop>

        <div v-if="maintain.show">
          {{ $t('maintain', { time: maintain.time }) }}
        </div>
        <PhoneLogin  v-else-if="isPhoneLogin" @close="handleClose" />
        <div v-else >
          <div :class="['header', 'textcenter']">
            <img src="./img/login.png" alt="" />
          </div>
      
          <div class="flex justify-center fb-container">
            <VFacebookLogin
              v-if="otherLoginDict && otherLoginDict.facebook"
              :app-id="otherLoginDict.facebook"
              @sdk-init="checkAndLogout"
              @login="fbTryLogin"
            />
          </div>
          <!-- <WhatsappLogin @lineLogin="thirdPartyLogin" /> -->
        </div>
        <!-- <img src="./img/close.png" alt="" class="close-btn" @click="handleClose"> -->
      </div>
    </div>
  </Overlay>
</template>
<script setup>
import { Overlay } from "vant";
import { useConfig } from "@/config";
import DImg from "@/components/img.vue";
import VFacebookLogin from 'vue-facebook-login-component-next'
import 'vue-facebook-login-component-next/dist/style.css'
import PhoneLogin from '@/components/phoneLogin.vue'
import { useMaintain, useThirdPartyDict, useLogin } from '../login.data'

const props = defineProps({
  show: Boolean,
});
const emit = defineEmits(["close"]);
const handleClose = (bool) => {
  emit("close", bool);
};
const maintain = useMaintain()
const { otherLoginDict } = useThirdPartyDict(props)
const { checkAndLogout, fbTryLogin } = useLogin()
const { isPhoneLogin } = useConfig()
</script>

<style scoped lang="scss">
:deep(.van-cell) {
  padding: 8px 0px;
}

:deep(.van-field__control::placeholder) {
  font-size: 14px;
  color: #041b2b;
}

:deep(.van-field) {
  border-bottom: 1px solid #e8e8e8;
}
.textcenter {
  text-align: center;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  
  .content {
    position: relative;
    width: 96vw;
    height: 200px;
    background: url("./img/bg.png") no-repeat;
    background-size: 100% 100%;
    .close-btn {
      position: absolute;
      bottom: -50px;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
    }
    .fb-container {
      margin-top: 12px;
      border-radius: 60px;
    }
    > div {
      padding-top: 90px;
    }

    .header {
      //width: 55px;
      height: 31px;

      img {
        //width: 100%;
        height: 100%;
      }
    }

    .from {
      margin-top: 41px;

      //:first-child.input {

      //}
      :not(:last-child).input {
        margin-bottom: 20px;
      }

      :last-child.input {
        margin-bottom: 10px;
      }
    }

    .change {
      text-align: right;
      color: #57b8ff;
    }

    .btn {
      margin-top: 10px;
      width: 270px;
      height: 44px;
      color: white;
      border-radius: 33px;
      background: #266efe;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
