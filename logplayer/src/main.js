import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/style/icons/iconfont.css'
import { PlayState } from './js/util/Constants'
//import 'element-plus/theme-chalk/dark/css-vars.css'


const store = new createStore({
    state() {
        return {
            playState: PlayState.NOTUSED,
            frameNum: 60,
            isNight: false,
            isFull: false,
            time: 0,
            speed: 1,
            gameTime: 0,
            gameMode: "",
            gameScore: "",
            maxTime: 0,
        }

    },
    mutations: {
        changePlayState(state, playState) {
            state.playState = playState;
        },
        changeLightState(state, isNight) {
            state.isNight = isNight;
        },
        changeScreenState(state, isFull) {
            state.isFull = isFull;
        },
        changeTimeState(state, time) {
            state.time = time;
        },
        changeSpeedState(state, playerSpeed) {
            state.speed = playerSpeed;
        },
    },
    actions: {}
})

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus);
app.use(store);
app.mount('#app')
