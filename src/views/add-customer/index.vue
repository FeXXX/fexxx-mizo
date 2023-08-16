<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import router from "@/router";
import { reactive, ref } from "vue";
import { phone_reg, phone_waring_text } from "@/utils/validate";
import { apiInfo } from "@/utils/domain";

import axios from "axios";
import { showNotify } from "vant";

const formData = ref({
  name: "",
  count: undefined,
  phoneNumber: "",
  relationship: "",
  isNeedTaxi: undefined,
});

// 检查手机号码正确性
const phoneNumberValidator = (val: string) => {
  if (val && !phone_reg.test(val)) {
    return false;
  }
  return true;
};

// 关系
const show = ref(false);
const cascaderValue = ref("");
const relationshipList = [
  { text: "亲戚", value: "1" },
  { text: "朋友", value: "2" },
  { text: "同事", value: "3" },
];
const relationshipOptions = reactive([
  {
    text: "新郎",
    value: "1",
    children: [...relationshipList],
  },
  {
    text: "新娘",
    value: "2",
    children: [...relationshipList],
  },
]);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFinish = ({ selectedOptions }: any) => {
  console.log(selectedOptions, "selectedOptions");
  show.value = false;
  formData.value.relationship = selectedOptions
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((option: any) => option.text)
    .join("-");
};

// 添加宾客接口
const onSubmit = async () => {
  const { name, count, phoneNumber, relationship, isNeedTaxi } = formData.value;
  const postData = {
    name: name,
    count: count,
    phoneNumber: phoneNumber,
    relationship: relationship,
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
        <!-- 与新人关系 -->
        <van-field
          v-model="formData.relationship"
          is-link
          readonly
          label="与新人关系"
          placeholder="请选择与新人关系"
          @click="show = true"
          :rules="[{ required: true, message: '请选择与新人关系' }]"
        />
        <!-- 是否需要滴滴司机接驳 -->
        <van-field
          name="radio"
          label="是否需要司机接驳(新造地铁站to婚礼现场)"
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
        <van-popup v-model:show="show" round position="bottom">
          <van-cascader
            v-model="cascaderValue"
            title="请选择与新人关系"
            :options="relationshipOptions"
            @finish="onFinish"
            @close="show = false"
          />
        </van-popup>
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
