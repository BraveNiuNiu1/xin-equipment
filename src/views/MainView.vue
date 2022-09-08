<template>
    <div class="main">
      <PageHeader>头部</PageHeader>
      <aside>
        <router-link v-for="d in links" :key="d.name" :to="d.to">{{d.name}}</router-link>
      </aside>
      <main>
        <!-- 子路由/嵌套路由的容器 -->
        <router-view></router-view>
      </main>
    </div>
</template>

<script>
import { routes } from '../router/index';
import PageHeader from '@/components/PageHeader.vue';
export default {
  components: {
    PageHeader,

  },
  data() {
    return {

    }
  },
  computed: {
    links(){
      // 先把有权限的菜单过滤出来，查找符合这样的菜单项：meta中的permission在当前登录用户的所有页面权限数组中存在
      return routes[2].children.filter(i => this.$store.state.user.permissions.includes(i.meta.permission) && !i.meta.hide).map(i => ({
        to: '/main/' + i.path,
        name: i.meta.name,
      }))
    }
  },
  created () {
    // dispatch派发一个getWho  调用action需要通过dispatch，this.$store.dispatch('asyncAdd', 传递的数据)
    this.$store.dispatch('getWho');
    this.$store.dispatch('getInfo');
  },
}
</script>
<style lang="sass" scoped>
header
  position: fixed
  top: 0
  left: 0
  right: 0
  height: 60px
  background: #0079c4
aside
  position: fixed
  top: 60px
  left: 0
  bottom: 0
  padding: 20px
  width: 190px
  background: #2c405a
  a
    display: block
    padding: 5px 10px
    color: #fff
    &.router-link-active
      background: #666
main
  position: fixed
  top: 60px
  right: 0
  bottom: 0
  left: 190px
  padding: 20px
  overflow: auto

</style>
