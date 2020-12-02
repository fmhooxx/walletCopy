import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
import api from '@/common/js/http'
import status from '@/common/js/consts'
import _config from '@/common/js/config'
import emo from '@/common/js/emo'
import tim from './common/tim/tim.js'
import TIM from './common/js/tim.js'
import store from './store'
import 'ican-H5Api'
Vue.use(uView)

Vue.config.productionTip = false
const msg = (title, duration = 1500, mask = true, icon = 'none') => {
    //统一提示方便全局修改
    if (Boolean(title) === false) {
        return;
    }
    uni.showToast({
        title,
        duration,
        mask,
        icon
    });
}
Vue.prototype.$api = {
    api,
    msg
}
Vue.prototype.tim = tim.tim
Vue.prototype.cos = tim.cos
Vue.prototype.$status = status
Vue.prototype.$emo = emo
Vue.prototype.$TIM = TIM
Vue.prototype.$store = store
Vue.prototype.$config = _config

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()