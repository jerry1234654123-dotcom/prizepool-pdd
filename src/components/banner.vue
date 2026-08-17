<template>
  <div class="banner">
    <Swipe :autoplay="props.autoplay" :loop="true" :indicator-color="props.indicatorColor">
      <SwipeItem v-for="(item, index) in props.list" :key="index" @click="handleClick">
        <img :src="item" alt="" />
      </SwipeItem>
    </Swipe>
  </div>
</template>

<script setup>
import { Swipe, SwipeItem } from "vant";

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  url: String,
  autoplay: {
    type: Number,
    default: 3000,
  },
  indicatorColor: {
    type: String,
    default: "#FFC24B",
  },
});

const handleClick = () => {
  if (props.url) {
    window.open(props.url);
  }
};
</script>

<style scoped lang="scss">
.banner {
  position: relative;
  z-index: 2;
  margin: 12px 10px 0;
  border-radius: 8px;
  overflow: hidden;

  :deep(.van-swipe-item) {
    cursor: pointer;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }

  :deep(.van-swipe__indicator) {
    background-color: #ffffff;
    opacity: 0.5;
  }
}
</style>
