import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "animate.css";
import "vant/lib/index.css";
import "@/styles/reset.scss";
import "@/styles/animate.css";

import { Button } from "vant";

createApp(App).use(router).use(Button).mount("#app");
