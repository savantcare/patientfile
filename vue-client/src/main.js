import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'


// External-UI-Ct-1/5 Integrate Element.io library
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUI, { locale });

/* External-UI-Ct-2/5 Ref: https://github.com/NightCatSama/vue-slider-component
Q) Why use a different slider instead of slider from elemenet.io?
Read: MultiStateDisplayAreaHeader.vue:15
*/
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
Vue.component('VueSlider', VueSlider)

// External-UI-Ct-3/5 Ref: http://vue-js-toggle-button.yev.io/
import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)

// External-UI-Ct-4/5 Ref: https://github.com/bajaniyarohit/vue-split-panel
import VueSplit from 'vue-split-panel'
Vue.use(VueSplit)

// External-UI-Ct-5/5 Ref: https://github.com/rigor789/vue-scrollto
const VueScrollTo = require('vue-scrollto')
Vue.use(VueScrollTo)

// Initialize socket.io
import SocketIO from 'socket.io-client'
import VueSocketIO from 'vue-socket.io';
import { SOCKET_API_URL } from "@/const.js";

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO(SOCKET_API_URL, {}),
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
})
);

import './registerServiceWorker'

Vue.use(require('vue-shortkey'))

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
