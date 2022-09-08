const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      // URL 以/equipment开始的URL请求进行代理转发
      '/equipment': {
        target: 'http://jxsjs.com'
      }
    }
  }
})
