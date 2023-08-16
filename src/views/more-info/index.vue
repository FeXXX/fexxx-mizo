<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { apiInfo } from "@/utils/domain";
import { ref } from "vue";
const qrcodeUrl = `${apiInfo.domain}/images/qrcode/wedding-group-1015.jpg`;

const imgLoadedFlag = ref(false);
let count = 0;
const successLoadImg = () => {
  count += 1;
  if (count === 2) imgLoadedFlag.value = true;
};
</script>

<template>
  <div v-show="imgLoadedFlag" class="more-info">
    <div class="bg-box"></div>
    <img
      src="../../assets/images/join-group-bg.jpg"
      alt=""
      class="bg"
      @load="successLoadImg"
    />
    <img :src="qrcodeUrl" alt="" class="qrcode" @load="successLoadImg" />
  </div>
</template>

<style lang="scss" scoped>
.more-info {
  width: 100%;
  height: 100vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #fcdbe0;
  display: flex;
  justify-content: center;
  position: relative;

  .bg {
    height: 100vh;
  }
  .qrcode {
    width: 150px;
    height: 150px;
    position: absolute;
    right: 10%;
    top: 35%;
  }
}
</style>
