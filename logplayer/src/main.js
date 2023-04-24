import { createApp } from 'vue'
import { createStore  } from 'vuex'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/style/icons/iconfont.css'
//import 'element-plus/theme-chalk/dark/css-vars.css'


const store = new createStore ({
    state() {
        return {
            isPlaying: false,
            isNight: false,
            isFull: false,
            playerTime: 0,
            playerSpeed: 1,

        }
    }
})

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus);
app.mount('#app')
