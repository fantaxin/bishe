import App from './App.vue'
import { createApp } from 'vue'
import { createStore } from 'vuex'
import { PlayState } from './js/util/Constants'
//import { Quasar } from 'quasar'
//import quasarUserOptions from './quasar-user-options'
// import quasarIconSet from 'quasar/icon-set/svg-material-icons'
// import '@quasar/extras/material-icons/material-icons.css'
//import 'quasar/src/css/index.sass'
// import './assets/style/icons/iconfont.css'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from "axios";
import VueAxios from 'vue-axios'
const store = new createStore({
    state() {
        return {
            playState: PlayState.NOTUSED,
            isNight: false,
            isFull: false,
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

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus);
app.use(store);
app.mount('#app')
