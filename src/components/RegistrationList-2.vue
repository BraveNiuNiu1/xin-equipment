<template>
<div class="registration-list" v-loading="loading">
  <el-table :data="list">
    <el-table-column label="设备编号" prop="id" />
    <el-table-column label="设备名称" prop="name" />
    <el-table-column label="设备状态" prop="status" />
    <el-table-column label="设备分类" prop="category" />
    <el-table-column label="设备数量" prop="number" />
    <el-table-column label="设备单价" prop="price" />
    <el-table-column label="购置时间" prop="time" />
    <el-table-column label="操作">
      <!-- 作用域插槽slot-scope，把子组件中的数据送出来给插槽内容实用 -->
      <template slot-scope="scope">
        <!-- scope变量包含下标$index、行row、列column的信息 -->
        <el-button>详情</el-button>
        <template v-if="scope.row.status === 'STATUS1'">
          <el-button type="primary">编辑</el-button>
          <el-button type="primary">审核</el-button>
        </template>
        <el-button type="primary" v-else>入库</el-button>
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
  watch: {
    '$store.state.formData'() {
      this.getList();
    },
  },
  created () {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      const { pageNo, pageSize } = this;
      this.axios.post('/pre-list', {
        pageNo,
        pageSize,
        ...this.$store.state.formData
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
