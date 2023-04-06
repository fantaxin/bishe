/**
* @FilePath /src/main.js
* @Description 
* @Author wangxin
* @Date 2023-03-20 14:54:09
* @LastEditTime 2023-04-06 17:56:47
 */
export { }

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';


const app = createApp(App)
app.use(ElementPlus);
app.mount('#app')   