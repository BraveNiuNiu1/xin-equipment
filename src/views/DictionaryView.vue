<template>
  <div class="dictionary">
    <el-tabs v-model="tab">
      <el-tab-pane label="未入库设备状态" name="a"/>
      <el-tab-pane label="已入库设备状态" name="b"/>
      <el-tab-pane label="设备分类" name="c"/>
    </el-tabs>

    <div class="list">
      <div class="item head">
        <div>编号</div><div>名称</div><div>颜色</div>
      </div>
      <vue-drag v-model="status1">
        <div class="item " v-for="d in $store.state.status1" :key="d.id" >
          <div>{{d.id}}</div>
          <!-- 把当前要编辑的内容传进去 -->
          <div @dblclick="onDbclick(d.name, d.id, 'name')">
            <el-input v-if="active.id === d.id && active.column === 'name'" v-model="active.value" :ref="d.id + 'name'" @blur="onBlur(d)"/>
            <template v-else>{{d.name}}</template>
          </div>
          <div @dblclick="onDbclick(d.color, d.id, 'color')">
            <el-input v-if="active.id === d.id && active.column === 'color'" v-model="active.value" :ref="d.id + 'color'"  @blur="onBlur(d)"/>
            <template v-else>{{d.color}}</template>
          </div>
        </div>
      </vue-drag>

    </div>
    <!-- <p v-if="tab === 'a'">1</p>
    <p v-if="tab === 'b'">2</p>
    <p v-if="tab === 'c'">3</p> -->
    <!-- <h1>{{ tab }}</h1> -->
  </div>
</template>


<script>
import VueDrag from 'vuedraggable'
export default {
  components:{
    VueDrag
  },
  data() {
    return {
      tab: "c",
      // 当前要编辑的数据id和字段column
      active:{
        value: '',// 当前编辑的内容
        id:'',
        column: ''
      },
      // dom:''
    };
  },
  computed: {
    // 计算属性的get/set方法，让计算属性即可以读（获取它的值），也可以写（设置他的值，给它赋值）
    status1: {
      // 取值 写一个默认值走的是get
      get() {
        return this.$store.state.status1;
      },
      // 设置
      set(arr) {
        // 调用接口
        this.axios.post('/status-order', {
          type: 'pre',
          // 排好序的id
          ids: arr.map(i => i.id)
        }).then(() => {
          // 避免直接修改state，导致两处同时改变
          this.$store.commit('setStatus1', arr);
        })
      }
    }
  },
  methods: {
    onDbclick(value, id, column) {
      this.active = {
        value, id, column
      }
      // 数据改变，组件的渲染也需要时间是异步的
      // ！！在v-for中出现的ref，绑定出来的都是数组
      this.$nextTick(() => {
        this.$refs[id + column][0].focus();
        // console.log(this.$refs[id + column]);
      })
    },
    onBlur(e){
      console.log(e);
      // TODO:调用接口保存数据，更新state
      this.axios.post('/status-edit', {
        type: 'pre',
        id: e.id,
        name: e.name,
        color: e.color
      }).then((res) => {
        console.log(res);
      })

      // 隐藏 el-input
      this.active = {
        value: '',
        id: '',
        column: ''
      }
    }
  },
};
</script>

<style lang="sass" scoped>
.dictionary
  .item
    display: flex
    border-bottom: 1px solid #f0f0f0
    // .item > div
    // & > div + div
    & > div
      flex: 1
      padding: 10px 20px
      text-align: center
      background: #fff
      & + div
        border-left: 1px solid #f0f0f0
    &.head
      font-weight: bold
      & > div
        background: #f9f9f9

</style>
