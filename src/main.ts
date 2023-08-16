import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "animate.css";
import "vant/lib/index.css";
import "@/styles/reset.scss";
import "@/styles/animate.css";

import {
  Button,
  Form,
  Field,
  CellGroup,
  RadioGroup,
  Radio,
  Notify,
  Cascader,
  Popup,
} from "vant";

createApp(App)
  .use(router)
  .use(Button)
  .use(Form)
  .use(Field)
  .use(CellGroup)
  .use(RadioGroup)
  .use(Radio)
  .use(Notify)
  .use(Cascader)
  .use(Popup)
  .mount("#app");
