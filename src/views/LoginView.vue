<template>
<!-- wrapper、container、box -->
<div class="login-wrapper">
  <!-- Vue给v-show/v-if切换显示/隐藏的元素外面包一个transition组件，可以实现切换动画 -->
  <!-- 给过渡命名，定义class时可以把v改成name -->
  <transition name="login">
    <div class="login" v-show="show">
      <div class="l">{{ formData }}</div>
      <div class="r">
        <el-tabs v-model="formData.type">
          <el-tab-pane label="短信登陆" name="sms">
            <el-input placeholder="手机号" v-model="formData.phone" />
            <el-input placeholder="验证码" v-model="formData.code">
              <!-- <template slot="append"> -->
              <!-- <template v-slot:append> -->
              <template #append>
                <el-button
                  type="primary"
                  :disabled="codeBtnDisabled"
                  @click="sendCode"
                >{{ codeLabel }}</el-button>
              </template>
            </el-input>
          </el-tab-pane>
          <el-tab-pane label="密码登陆" name="password">
            <el-input placeholder="用户名" v-model="formData.username" />
            <el-input type="password" v-model="formData.password" placeholder="密码" />
          </el-tab-pane>
        </el-tabs>
        <el-button
          type="primary"
          :disabled="loginBtnDisabled"
          @click="login"
        >登陆</el-button>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
// 定义常量，
const TIME = 60;

export default {
    data() {
        return {
          show: false,
					formData:{
						type: 'sms',//短信的登录sms，密码登录password
						phone: '',
						code: '',
						username: '',
						password: ''
					},
          time: TIME, // 倒计时剩余时间
        };
    },
		mounted() {
			setTimeout(() => {
				this.show=true
			}, 1000);

      // 为了开发环境/本地用，上线发布/生成环境中就不要这两句代码了
      console.log(process.env)
      // process.env判断在什么环境下
      if(process.env.NODE_ENV === 'development'){
        this.formData.phone = '13800138001';
        this.formData.code = '654321';
      }
		},
    // 把计算属性看成复杂的插值表达式
    computed: {
      // 发送验证码的文本
      codeLabel() {
        // 取时间
        const {time} = this;
        return time < TIME ? `${time}秒后再次发送` : '发送验证码';
      },
      // 是否禁用发送验证码按钮
      codeBtnDisabled(){
        // 手机号通过校验并且倒计时时间为60，按钮才能点，这里返回的是false
        const {phone} = this.formData;
        return !(/^1\d{10}$/.test(phone) && this.time === TIME);
      },
      loginBtnDisabled(){
        //手机号未通过校验或者验证码没通过校验，按钮不能点，这里应该返回true
        return !/^1\d{10}$/.test(this.formData.phone) || !/^[0-9]{6}$/.test(this.formData.code);

      }
    },
    methods: {
      sendCode() {
        // 省略了发送验证码的逻辑
        // 等一秒才会减，不等直接--
        this.time-- ;
        const timeId = setInterval(() => {
          this.time-- ;
          if(this.time === 0){
            clearInterval(timeId);
            this.time = TIME;
          }
        }, 1000)
      },
      // 登录
      login(){
        const {type, phone, code, username, password} = this.formData;
        const data = {type};
        if(type === 'sms'){
          data.phone = phone;
          data.code = code;
        }else{
          data.username = username;
          data.password = password;
        }

        this.axios.post('/login', data).then(res =>{
          console.log(res);
          if(res.code === 0){
            this.$router.push('/main')
          }
        });
      }
    },
};
</script>

<style lang="sass">
.login-wrapper
  display: flex
  justify-content: center
  align-items: center
  width: 100vw
  height: 100vh
  background: #f9f9f9
  // 子元素样式缩进和父元素的样式内容对其
  .login
    width: 800px
    height: 400px
    background: #eee
    .el-input-group__append button.el-button
      color: #fff
      background-color: #409eff
      border-color:#409EFF
      &:hover
        color: #fff
        background-color: #66b1ff
        border-color: #66b1ff
      &.is-disabled
        color: #fff
        background-color: #a0cfff
        border-color: #a0cfff
    .el-tabs__nav-wrap::after
      background-color: transparent


// 元素显示前的状态，来之前是什么样子
// 默认是 .v-enter .v-enter-active
// v-enter 元素显示前的状态
.login-enter
  transform: scale(.2)
  opacity: 0
// 过渡class
.login-enter-active
  transition: .5s
// 离开之后样式
// .v-leave-to
// 离开过渡
// .v-enter-active
</style>
