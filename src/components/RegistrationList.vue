<template>
<div class="registration-list" v-loading="loading">
  <el-table :data="list">
    <el-table-column label="设备编号" prop="id" />
    <el-table-column label="设备名称" prop="name" />
    <el-table-column label="设备状态">
      <!-- 用数组方法 -->
      <template slot-scope="{row}">
        <!-- find方法找不到返回undefined，用或给个默认值{}空对象就不会报错 -->
        {{($store.state.status1.find(i => i.id === row.status) || {}).name}}
      </template>
    </el-table-column>
    <el-table-column label="设备分类" prop="category" >
      <!-- 转换对象格式 -->
      <template slot-scope="{row}">
        {{($store.getters.categoryObj[row.category] || {}).name }}
        <div></div>
      </template>
    </el-table-column>
    <el-table-column label="设备数量" prop="number" />
    <el-table-column label="设备单价" prop="price" />
    <el-table-column label="购置时间" prop="time" />
    <el-table-column label="操作">
      <!-- 作用域插槽slot-scope，把子组件中的数据送出来给插槽内容使用 -->
      <template slot-scope="scope">
        <!-- scope变量包含下标$index、行row、列column的信息 -->
        <el-button>详情</el-button>
        <template v-if="scope.row.status === 'STATUS1'">
          <!-- 跳转到 一级路由 二级路由最后拼接上动态id -->
          <el-button type="primary" @click="$router.push('/main/registration-edit/' + scope.row.id) ">编辑</el-button>
          <el-button type="primary" v-if="$store.getters.isAdmin">审核</el-button>
        </template>
        <el-button type="primary" v-else-if="$store.getters.isAdmin">入库</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    :total="total"
    :current-page="pageNo"
    :page-size="pageSize"
    :page-sizes="[10, 20, 50, 100]"
    @current-change="onCurrentChange"
    @size-change="onSizeChange"
    layout="total, sizes, prev, pager, next, jumper"
  />
</div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      list: [],
      total: 0,
      pageNo: 1,
      pageSize: 10,
    }
  },
  created () {
    this.getList();
    // 在eventBus实例上注册自定义事件
    window.eventBus.$on('search', this.getList);
  },
  beforeDestroy() {
    // 组件销毁时，注销/解绑事件，防止重复注册
    window.eventBus.$off('search', this.getList);
  },
  methods: {
    getList(formData = {}) {
      this.loading = true;
      const { pageNo, pageSize } = this;
      this.axios.post('/pre-list', {
        pageNo,
        pageSize,
        ...formData
      }).then(({ data }) => {
        this.list = data.list;
        this.total = data.total;
        this.loading = false;
      });
    },
    onCurrentChange(v) {
      this.pageNo = v;
      this.getList();
    },
    onSizeChange(v) {
      this.pageNo = 1;
      this.pageSize = v;
      this.getList();
    },
  },
};
</script>
