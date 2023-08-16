<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import router from "@/router";
import { ref } from "vue";

const imgLoadedFlag = ref(false);
const btnFlag = ref(false);

const successLoadImg = () => {
  imgLoadedFlag.value = true;
  setTimeout(() => {
    btnFlag.value = true;
  }, 2000);
};

const toAddCustomer = () => {
  router.push({ name: "AddCustomer" });
};
</script>

<template>
  <div v-show="imgLoadedFlag" class="home">
    <img
      src="../../assets/images/welcome-bg.jpg"
      alt=""
      class="img animate__animated animate__zoomIn animate__faster"
      @load="successLoadImg"
    />
    <van-button
      v-if="btnFlag"
      round
      type="primary"
      class="btn animate__animated animate__fadeInUp"
      @click="toAddCustomer"
      >请填写资料</van-button
    >
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #fcdbe0;
  display: flex;
  justify-content: center;
  position: relative;
  .img {
    height: 100vh;
  }
  .btn {
    position: fixed;
    left: 20%;
    bottom: 10%;
    width: 60%;
  }
}
</style>
