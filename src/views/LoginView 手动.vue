<template>
    <!-- wrapper|container、box -->
    <div class="login-wrapper">
			<!-- Vue style和class允许写两个 一个动态的 另一个静态的 允许静态和动态属性同时存在，他们不会覆盖，只会合并运行-->
        <!-- <div :class="{'login': true, 'show': show}"> -->
        <!-- <div :class="['login', show? 'show': '']"> -->
        <div class="login" :class="{show}">
        <div class="l"></div>
        <div class="r"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
          show: false,
        };
    },
		mounted() {
			setTimeout(() =>{
				this.show=true
			}, 1000)
		}
};
</script>

<style lang="sass" scoped>
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
    background: #666
    transform: scale(.2)
    opacity: 0
    transition: .5s
    // &是父选择器，相当于.login.show选择器
    &.show
      transform: scale(1)
      opacity: 1
</style>
