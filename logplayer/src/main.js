/**
* @FilePath /src/main.js
* @Description 
* @Author wangxin
* @Date 2023-03-20 14:54:09
* @LastEditTime 2023-04-07 10:36:31
 */
export { }

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus);
app.mount('#app')   