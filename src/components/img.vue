<template>
  <img :src="getAssetsFile(newSrc)" alt="">
</template>

<script setup>
import {useI18n} from "vue-i18n";
import {onMounted, ref} from "vue";

const props = defineProps({
  src: String,
})


const getAssetsFile = (url) => {
   console.log(locale.value)
  return new URL(`../assets/images/${url}`, import.meta.url).href
}


const {t, locale} = useI18n()

const newSrc = ref(props.src)


onMounted(() => {
  if (locale.value !== '') {
    const src = props.src.split('/images/')[1]
    if (locale.value !== 'zh') {

      newSrc.value = `${locale.value}/${src}`
    }else{
      newSrc.value = `${src}`
    }
  }

})
</script>

<style scoped lang="scss">


</style>