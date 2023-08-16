<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { apiInfo } from "@/utils/domain";
import { ref } from "vue";
const bgmUrl = `${apiInfo.domain}/assets/sound/kun.mp3`;

const audio = ref();

const playBgm = () => {
  audio.value.play();
};
</script>

<template>
  <router-view class="app-container" @click="playBgm" />
  <audio ref="audio" :src="bgmUrl"></audio>
</template>

<style lang="scss">
.app-container {
  background-color: #f7f8fa;
}
</style>
