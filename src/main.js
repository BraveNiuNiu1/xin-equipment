import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/style/common.sass';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
// @表示路径
import ChartBox from '@/components/ChartBox.vue';


// use是调用了ElementUI的install方法
// 本质：注册了全局组件，在Vue.prototype上定义了公共方法，定义了自定义指令
Vue.use(ElementUI);

Vue.config.productionTip = false

axios.defaults.timeout = 30000;
// baseURL是接口地址的统一前缀，这里设置以后，请求哪里就可以省略
axios.defaults.baseURL = '/equipment';

// 配置了响应拦截器，在服务器响应返回之后，在接口请求的then之前，添加自己的逻辑
axios.interceptors.response.use(
  ({ data }) => {
    // 只把服务器返回的数据结构出来返回给下一个.then
    // 统一处理接口报错
    if(data.code > 0){
      Vue.prototype.$message.error(data.msg);
      // alert(data.msg);
    }
    // 未登陆的统一处理  统一登陆无权限
    if(data.code === 9){
      location.href = './#/login';
    }
    return data;
  },
  err => Promise.reject(err)
)

// 在Vue构造函数的原型上添加方法属性axios，这样每个组件实例this都可以直接放访问到这个属性
Vue.prototype.axios = axios;

// 注册全局组件
Vue.component('chart-box', ChartBox)

// 在全局作用域下定义一个变量，Vue的实例
window.eventBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
