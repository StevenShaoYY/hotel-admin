<template>
  <div>
    <div class="title">
      <h1>浙江安旅运维管理平台</h1>
    </div>
    <bread-crumb class="bread-crumb"></bread-crumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" :src="pic">
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class='inlineBlock' to="/">
          <el-dropdown-item>
            返回首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided><span @click="changePassword" style="display:block;color:#7e8c8d">修改密码</span></el-dropdown-item>
        <el-dropdown-item divided><span @click="logout" style="display:block;color:#7e8c8d">退出登录</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="修改密码" :visible.sync="resetPasswordVisible" :before-close="clearPasswordForm">
      <div>
        <el-form ref="passwordForm" :rules="rulesPasswordAdmin" :model="passwordForm" label-width="80px">
          <el-form-item label="原密码" prop="oldPassword">
            <el-input type="password" v-model="passwordForm.oldPassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="输入新密码" prop="password">
            <el-input type="password" v-model="passwordForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passwordRepeat">
            <el-input type="password" v-model="passwordForm.passwordRepeat" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="resetPasswordEnter('passwordForm')">提交</el-button>
            <el-button @click="resetForm('passwordForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import BreadCrumb from 'base/breadcrumb/breadcrumb'
  import { mapGetters, mapActions } from 'vuex'
  import { resetAdminPassword } from 'api/adminManage'
//  import pic from 'common/image/default.png'
  export default{
    data() {
      const validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.passwordForm.passwordRepeat !== '') {
            this.$refs.passwordForm.validateField('passwordRepeat');
          }
          callback();
        }
      };
      const validatePass4 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.passwordForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        resetPasswordVisible: false,
        passwordForm: {
          oldPassword: '',
          password: '',
          passwordRepeat: ''
        },
        rulesPasswordAdmin: {
          Oldpassword: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
          password: [
            { validator: validatePass3, trigger: 'blur' }
          ],
          passwordRepeat: [
            { validator: validatePass4, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      pic() {
        return require('common/image/' + this.avatar + '.png')
      },
      ...mapGetters([
        'avatar'
      ])
    },
    methods: {
      logout() {
        this.LogOut().then(() => {
          location.reload();
        })
      },
      changePassword() {
        this.resetPasswordVisible = true
      },
      resetPasswordEnter(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            resetAdminPassword(this.passwordForm.oldPassword, this.passwordForm.password).then(() => {
              this.$message({
                type: 'info',
                message: '修改密码成功,请重新登录!'
              });
              this.resetPasswordVisible = false;
              setTimeout(() => {
                this.logout()
              }, 1500)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      clearPasswordForm() {
        if (this.$refs.passwordForm)
          this.$refs.passwordForm.resetFields();
        this.resetPasswordVisible = false;
        this.openId = -1
      },
      ...mapActions([
        'LogOut'
      ])
    },
    components: {
      BreadCrumb
    }

  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .title
    color #ccc
    h1
      font-size 20px
      line-height 50px
      padding-left 30px
  .bread-crumb
    padding-left 40px
    margin-top -10px
  .avatar-container
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 55px;
    top 2px
    .avatar-wrapper
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar
        width: 40px;
        height: 40px;
        border-radius: 10px;
      .el-icon-caret-bottom
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;

</style>
