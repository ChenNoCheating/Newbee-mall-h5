import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { Button, Form, Field, Toast, Icon, Swipe, SwipeCell, SwipeItem, PullRefresh, List, Tab, Tabs, CheckboxGroup, Checkbox, SubmitBar, Stepper, Popup, AddressList, AddressEdit, Card } from 'vant'
import 'lib-flexible/flexible'
import './common/style/theme.css'
import 'vant/es/toast/style'
import { createPinia } from 'pinia'
//初始化Vue实例
const app = createApp(App)
// const pinia = createPinia()
//注册路由
app.use(router)
//注册vant组件
app.use(createPinia())
app.use(Button).use(Form).use(Field).use(Toast).use(Icon).use(Swipe).use(SwipeCell).use(SwipeItem).use(PullRefresh).use(List).use(Tab).use(Tabs)
app.use(Checkbox).use(CheckboxGroup).use(SubmitBar).use(Stepper).use(Popup).use(AddressList).use(AddressEdit).use(Card)
//挂载Vue实例
app.mount('#app')
//定义$filters.prefix全局变量
app.config.globalProperties.$filters = {
  prefix(url) {
    if (url && url.startsWith('http')) {
        return url
    } else {
        url = `http://backend-api-01.newbee.ltd${url}`
      return url
    }
  }
}