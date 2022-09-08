<template>
  <!-- 设备编辑 -->
  <div class="edit">
    <p>设备编号：{{$route.params.id}}</p>
    <p>{{ formData }}</p>
    <el-form label-width="100px">
      <el-form-item label="设备名称">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="设备分类">
        <el-select v-model="formData.status">
          <el-option
            v-for="d in $store.state.status1"
            :key="d.id"
            :label="d.name"
            :value="d.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备数量">
        <el-input v-model="formData.number"/>
      </el-form-item>
      <el-form-item label="设备价格">
        <el-input v-model="formData.price"/>
      </el-form-item>
      <el-form-item label="购置日期">
        <!--  -->
        <el-date-picker v-model="formData.time" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" pleceholder="选择日期" >

        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-button @click="submit">保存</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return{
      // 取id要用
      id: this.$route.params.id,
      formData: {
        name:'',
        category:'',
        number:'',
        price:'',
        time:'',
      }
    }
  },
  created () {
    this.axios.get('/pre-detail?id=' + this.id).
    then(({data}) => {
      // console.log(data);
      this.formData = data;
    });
  },
  methods: {
    submit() {
      this.axios.post('/pre-edit',
      this.formData).then(() => {
        // this.
        this.$router.back();
      })
    }
  },
}
</script>
