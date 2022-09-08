<template>
<div class="search-box">
  <el-form label-width="90px">
    <el-form-item label="设备编号">
      <el-input v-model="formData.id" />
    </el-form-item>
    <el-form-item label="设备名称">
      <el-input v-model="formData.name" />
    </el-form-item>
    <el-form-item label="设备状态">
      <el-select v-model="formData.status">
        <el-option
          v-for="d in statusList"
          :key="d.id"
          :label="d.name"
          :value="d.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="设备分类">
      <el-select v-model="formData.category">
        <el-option
          v-for="d in categoryList"
          :key="d.id"
          :label="d.name"
          :value="d.id"
        />
      </el-select>
    </el-form-item>
  </el-form>
  <el-button @click="submit">搜索</el-button>
</div>
</template>

<script>
export default {
  data() {
    return {
      statusList: [],
      categoryList: [],
      formData: {
        id: '',
        name: '',
        status: '',
        category: ''
      }
    }
  },
  created () {
    this.axios.get('/status-list?type=pre').then(({ data }) => {
      this.statusList = data;
    });
    this.axios.get('/category-list').then(({ data }) => {
      this.categoryList = data;
    });
  },
  methods: {
    submit() {
      this.$store.commit('setFormData', {
        ...this.formData
      });
    }
  },
};
</script>
