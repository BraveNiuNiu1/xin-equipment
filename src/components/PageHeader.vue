<template>
  <header>
    <h1 class="logo">设备管理系统</h1>
    <el-dropdown @command="onCommand">
      <span>{{$store.state.user.name}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="changePw">修改密码</el-dropdown-item>
        <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      <!-- .sync修饰符 相当于组件的v-model双向绑定 -->
    <el-dialog title="修改密码" :visible.sync="show" append-to-body>
      <el-form ref="form" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="旧密码" prop="oldPw">
          <el-input v-model="formData.oldPw" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPw">
          <el-input v-model="formData.newPw" />
        </el-form-item>
        <el-form-item label="重复新密码" prop="newPw2">
          <el-input v-model="formData.newPw2" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </div>
    </el-dialog>
  </header>
</template>
<script>
export default {
  data() {
    // 自定义的校验函数
    const validator = ({field}, value, callback) =>{
      console.log(field);
      // 通过field参数区分现在校验的是那个表单项
      // 如果触发校验的是第一次输入新密码，那就就去手动触发第二次输入新密码的校验（如果两次新密码都输入完成了，这是再去修改第一次输入，那么需要再次判断第二个和第一个是否一样）
      if(field === 'newPw' && this.formData.newPw2){
        this.$refs.form.validateField('newPw2');

      }
      if(field === 'newPw2'){
        // 未通过校验，callback传参是错误对象，否则不传参
        if(value !== this.formData.newPw){
          callback(new Error('两次输入必须一样'));
        }else{
          callback();
        }
      }

    };
    return {
      show: false, // 修改密码的弹窗
      formData:{
        oldPw: '',
        newPw: '',
        newPw2: '',
      },
      // 表单的校验规则
      rules:{
        oldPw: [
          {
            required: true, // 必填项
            message: '请输入旧密码', // 错误提示
            trigger: 'blur' // 如何触发校验
          }
        ],
        newPw: [
          {
            required: true, // 必填项
            message: '请输入新密码', // 错误提示
            trigger: 'blur' // 如何触发校验
          },{
            validator,
            trigger: 'blur'
          }
        ],
        newPw2: [
          {
            required: true, // 必填项
            message: '请再次输入新密码', // 错误提示
            trigger: 'blur' // 如何触发校验
          },
          {
            validator,
            trigger: 'blur'
          }
        ],
      }
    }
  },
  watch: {
    show(v){
      if(!v){
        // 如果show变成false，说明弹窗关闭了，统一做下清理工作
        this.fromData = {
          oldPw: '',
          newPw: '',
          newPw2: '',
        };
        this.$refs.form.clearValidate();
      }
    }
  },
  methods: {
    changePw(){
      console.log('修改密码');
      this.show=true;
    },
    logout(){
      console.log('退出登陆');

    },
    onCommand(key){
      console.log(key);
      // if(key === 'changePw')this.changePw();
      // if(key === 'logout')this.logout();
      this[key]();
    },
    // 取消表单验证
    onCancel(){
      this.show = false;

    },
    // 确认表单验证
    onConfirm(){
      // 统一校验，把所有字段都校验一下
      this.$refs.form.validate(pass =>{
        if(!pass) return;
        // TODO:调用接口
      })
    }
  },
}
</script>
<style lang="sass" scoped>
header
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0 30px
  color: #fff
  .el-dropdown
    color: #fff
</style>
