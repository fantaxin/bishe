/**
* @FilePath /src/main.js
* @Description 
* @Author wangxin
* @Date 2023-03-20 14:54:09
* @LastEditTime 2023-04-17 10:31:13
 */
export { }

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/style/icons/iconfont.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus);
app.mount('#app')