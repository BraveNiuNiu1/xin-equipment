import Vue from 'vue';
import Vuex from 'vuex';
// import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 当前登录的用户信息
    user: {
      name: '', // 用户名
      role: '', // 角色，admin管理员/user普通用户
      permissions: [] //页面/栏目权限
    },
    formData: {},
    status1: [],  //状态1
    status2: [],  //状态2
    category: [], //分类
  },
  getters: {
    // 转换对象格式
    categoryObj: state => {
      const obj = {};
      // 分类的数组转换成对象
      state.category.forEach(i => {
        // 用id当key
        obj[i.id] = i;
      });
      return obj;
    },
    // 是否是管理员  计算属性是插值绑定太长了，可以写计算属性
    isAdmin: state => state.user.role === 'admin'
  },
  mutations: {
    // 修改用户信息
    setUser(state, info){
      state.user = info;
    },
    setFormData(state, formData) {
      state.formData = formData;
    },
    setStatus1(state, list){
      state.status1 = list;
    },
    setStatus2(state, list){
      state.status2 = list;
    },
    setCategory(state, list){
      state.category = list;
    },
  },
  actions: {
    // 调用接口获取用户登录信息
    getWho({commit}){
      Vue.prototype.axios.get('/who').then(({data}) => {
        commit('setUser', data);
      })
    },
    // 统一获取状态、分类数据  拿三个接口
    getInfo({commit}){
      // 未入库设备状态
      Vue.prototype.axios.get('/status-list?type=pre').then(({ data }) => {
        // VueX在actions调用commit 要用第一个参数上对象上commit，直接解构commit
        commit('setStatus1',data);
      });
      //已入库设备状态
      Vue.prototype.axios.get('/status-list?type=equip').then(({ data }) => {
        commit('setStatus2',data);
      });
      // 设备分类列表
      Vue.prototype.axios.get('/category-list').then(({ data }) => {
        commit('setCategory',data);
      });
    }
  },
  modules: {
  }
})
