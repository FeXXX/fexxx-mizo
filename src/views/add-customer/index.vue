<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import router from "@/router";
import { ref } from "vue";
import { phone_reg, phone_waring_text } from "@/utils/validate";
import { apiInfo } from "@/utils/domain";

import axios from "axios";
import { showNotify } from "vant";

const formData = ref({
  name: "",
  count: undefined,
  phoneNumber: "",
  isNeedTaxi: undefined,
});

// 检查手机号码正确性
const phoneNumberValidator = (val: string) => {
  if (val && !phone_reg.test(val)) {
    return false;
  }
  return true;
};
// 添加宾客接口

const onSubmit = async () => {
  const { name, count, phoneNumber, isNeedTaxi } = formData.value;
  const postData = {
    name: name,
    count: count,
    phoneNumber: phoneNumber,
    isNeedTaxi: isNeedTaxi,
  };
  const res = await axios({
    method: "post",
    url: `${apiInfo.domain}/api-wedding/customer/add`,
    data: postData,
  });
  console.log(res.data);
  const { code, data } = res.data;
  if (code === 0) {
    showNotify({ type: "warning", message: data?.errMsg });
  }
  if (code === 1) {
    showNotify({
      type: "success",
      message: data?.message,
      onClose: () => {
        router.push({ name: "MoreInfo" });
      },
    });
  }
};
</script>

<template>
  <div class="customer">
    <div class="title">请填写宾客信息</div>
    <van-form @submit="onSubmit" label-width="8rem" class="form">
      <van-cell-group inset>
        <!-- 姓名 -->
        <van-field
          v-model="formData.name"
          name="姓名"
          label="姓名"
          placeholder="请填写用姓名"
          :rules="[{ required: true, message: '请填写用姓名' }]"
        />
        <!-- 人数 -->
        <van-field
          v-model="formData.count"
          type="digit"
          label="请输入人数"
          :rules="[{ required: true, message: '请输入人数' }]"
        />
        <!-- 手机号码 -->
        <van-field
          v-model="formData.phoneNumber"
          type="tel"
          label="请输入手机号码"
          :rules="[
            { validator: phoneNumberValidator, message: phone_waring_text },
          ]"
        />
        <!-- 是否需要滴滴司机接驳 -->
        <van-field
          name="radio"
          label="是否需要司机接驳"
          :rules="[{ required: true, message: '请选择' }]"
        >
          <template #input>
            <van-radio-group
              v-model="formData.isNeedTaxi"
              direction="horizontal"
            >
              <van-radio :name="0">需要</van-radio>
              <van-radio :name="1">不需要</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang="scss" scoped>
.customer {
  width: 100%;
  height: 100vh;
  .title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    background-color: #fff;
  }
  .form {
    margin-top: 20px;
  }
}
</style>
