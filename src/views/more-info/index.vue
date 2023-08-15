<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import router from "@/router";
import { apiInfo } from "@/utils/domain";
const qrcodeUrl = `${apiInfo.domain}/images/qrcode/wedding-group-1015.jpg`;

const toGoodBye = () => {
  router.push({ name: "GoodBye" });
};
</script>

<template>
  <div class="more-info">
    <div class="title">请用微信扫码进群</div>
    <img :src="qrcodeUrl" alt="" class="img" />

    <div style="margin: 16px">
      <van-button round block type="primary" @click="toGoodBye">
        我已经入群啦~
      </van-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.more-info {
  height: 100vh;
  .title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    background-color: #f7f8fa;
  }
  .img {
    width: 100%;
  }
}
</style>
