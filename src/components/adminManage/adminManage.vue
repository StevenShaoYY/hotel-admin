<template>
  <div>
    <div class="search_header">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input
            placeholder="搜索用户名、姓名、备注"
            icon="search"
            v-model="searchBoxInput"
            :on-icon-click="searchMessage">
          </el-input>
        </el-col>
        <el-col :span="3" :offset="15">
          <el-button @click="addAdminPerson" type="primary">添加管理员</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box_manage_main">
      <el-table
        :data="adminList"
        border
        style="width: 100%">
        <el-table-column
          prop="username"
          label="用户名">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="name">
        </el-table-column>
        <el-table-column
          prop="role"
          label="用户角色"
          width="100">
        </el-table-column>
        <el-table-column
          label="用户状态"
          width="95">
          <template scope="scope">
            <el-tag :type="scope.row.statusType">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="修改日期"
          width="195">
        </el-table-column>
        <el-table-column
          prop="modifyPerson"
          label="修改人">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="350">
          <template scope="scope">
            <el-button
              @click.native.prevent="updateAdmin(scope)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click.native.prevent="resetPassword(scope)"
              type="text"
              size="small">
              重置密码
            </el-button>
            <el-button
              v-if="scope.row.status === '启用'"
              @click.native.prevent="stopAccount(scope)"
              type="text"
              size="small">
              禁用
            </el-button>
            <el-button
              v-if="scope.row.status === '禁用'"
              @click.native.prevent="startAccount(scope)"
              type="text"
              size="small">
              启用
            </el-button>
            <el-button
              @click.native.prevent="deleteAccount(scope)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagenation_wrapper">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="添加管理员" :visible.sync="addAdminVisible" :before-close="clearForm">
      <div>
        <el-form ref="adminForm" :rules="rulesAddAdmin" :model="adminForm" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="adminForm.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="adminForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="adminForm.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passwordRepeat">
            <el-input type="password" v-model="adminForm.passwordRepeat" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="role">
            <el-select v-model="adminForm.role" placeholder="请选择角色">
              <el-option v-for="item in roleList" :label="item.name" :value="parseInt(item.id)" :key="parseInt(item.id)"></el-option>
              <!--<el-option label="客服" value="2"></el-option>-->
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="adminForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="adminAddEnter('adminForm')">提交</el-button>
            <el-button @click="resetForm('adminForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="编辑管理员" :visible.sync="updateAdminVisible" :before-close="clearUpdateForm">
      <div>
        <el-form ref="updateForm" :rules="rulesUpdateAdmin" :model="updateForm" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input :disabled="disabledUsername" v-model="updateForm.username"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="updateForm.name"></el-input>
          </el-form-item>
          <el-form-item label="选择角色" prop="role">
            <el-select v-model="updateForm.role" placeholder="请选择角色">
              <el-option v-for="item in roleList" :label="item.name" :value="item.id" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="updateForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="adminUpdateEnter('updateForm')">提交</el-button>
            <el-button @click="resetForm('updateForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!--<el-dialog title="重置密码" :visible.sync="resetPasswordVisible" :before-close="clearPasswordForm">-->
      <!--<div>-->
        <!--<el-form ref="passwordForm" :rules="rulesPasswordAdmin" :model="passwordForm" label-width="80px">-->
          <!--<el-form-item label="密码" prop="password">-->
            <!--<el-input type="password" v-model="passwordForm.password" auto-complete="off"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="确认密码" prop="passwordRepeat">-->
            <!--<el-input type="password" v-model="passwordForm.passwordRepeat" auto-complete="off"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" @click="resetPasswordEnter('passwordForm')">提交</el-button>-->
            <!--<el-button @click="resetForm('passwordForm')">重置</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</div>-->
    <!--</el-dialog>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import AdminManager from 'common/js/adminManager'
  import { searchAdminList, addAdmin, updateAdmin, resetPassword, startAccount, stopAccount, deleteAccount } from 'api/adminManage'
  import Role from 'common/js/role'
  import { searchRoleList } from 'api/roleManage'
  export default {
    props: {},
    created() {
      this.getAdmin(this.pageSize, this.currentPage);
    },
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.adminForm.passwordRepeat !== '') {
            this.$refs.adminForm.validateField('passwordRepeat');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.adminForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
//      const validatePass3 = (rule, value, callback) => {
//        if (value === '') {
//          callback(new Error('请输入密码'));
//        } else {
//          if (this.passwordForm.passwordRepeat !== '') {
//            this.$refs.passwordForm.validateField('passwordRepeat');
//          }
//          callback();
//        }
//      };
//      const validatePass4 = (rule, value, callback) => {
//        if (value === '') {
//          callback(new Error('请再次输入密码'));
//        } else if (value !== this.passwordForm.password) {
//          callback(new Error('两次输入密码不一致!'));
//        } else {
//          callback();
//        }
//      };
      return {
        searchBoxInput: '',
        disabledUsername: true,
        roleList: [],
        adminList: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1,
        openId: -1,
        addAdminVisible: false,
        updateAdminVisible: false,
//        resetPasswordVisible: false,
        adminForm: {
          username: '',
          name: '',
          role: 1,
          password: '',
          passwordRepeat: '',
          remark: ''
        },
        updateForm: {
          id: '',
          userName: '',
          name: '',
          role: 1,
          remark: ''
        },
//        passwordForm: {
//          password: '',
//          passwordRepeat: ''
//        },
        rulesAddAdmin: {
          username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
//          role: [{ required: true, message: '请选择角色', trigger: 'change' },
//            { type: 'string', message: '角色必须为字符串' }],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          passwordRepeat: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
        rulesUpdateAdmin: {
          name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
//          role: [{ required: true, message: '请选择角色', trigger: 'change' }]
        }
//        ,
//        rulesPasswordAdmin: {
//          password: [
//            { validator: validatePass3, trigger: 'blur' }
//          ],
//          passwordRepeat: [
//            { validator: validatePass4, trigger: 'blur' }
//          ]
//        }
      }
    },
    methods: {
      addAdminPerson() {
        this.addAdminVisible = true
      },
      adminAddEnter(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            addAdmin(this.adminForm).then(() => {
              this.$message({
                type: 'info',
                message: '添加管理员成功！'
              });
              this.addAdminVisible = false;
              this.getAdmin(this.pageSize, this.currentPage);
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
      clearForm() {
        if (this.$refs.adminForm)
          this.$refs.adminForm.resetFields();
        this.addAdminVisible = false;
      },
      updateAdmin(index) {
        this.updateForm.username = index.row.username;
        this.updateForm.id = index.row.id;
        this.updateForm.name = index.row.name;
        this.updateForm.role = index.row.role;
        this.updateForm.remark = index.row.remark;
//        if (this.updateForm.role === '管理员')
//          this.updateForm.role = '1'
//        else
//          this.updateForm.role = '2'
        this.roleList.forEach(item => {
          if (this.updateForm.role === item.name) {
            this.updateForm.role = parseInt(item.id)
          }
        })
        this.updateAdminVisible = true
      },
      adminUpdateEnter(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            updateAdmin(this.updateForm).then(() => {
              this.$message({
                type: 'info',
                message: '修改管理员成功！'
              });
              this.updateAdminVisible = false;
              this.getAdmin(this.pageSize, this.currentPage);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      clearUpdateForm() {
        if (this.$refs.updateForm)
          this.$refs.updateForm.resetFields();
        this.updateAdminVisible = false;
      },
//      resetPassword(index) {
//        this.openId = index.row.id
//        this.resetPasswordVisible = true
//      },
      resetPassword(index) {
        this.openId = index.row.id
        const h = this.$createElement;
        this.$msgbox({
          title: '重置密码',
          message: h('p', null, '确认重置该用户密码吗'),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              resetPassword(this.openId).then(response => {
                if (response.data.code === 1) {
                  done();
                  this.$message({
                    type: 'info',
                    message: '重置密码成功！'
                  });
                  setTimeout(() => {
                    instance.confirmButtonLoading = false;
                  }, 300);
                }
              }).catch(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              })
            } else {
              done();
            }
          }
        }).then(() => {
          this.openId = -1
          this.getAdmin(this.pageSize, this.currentPage);
        }).catch(() => {
          this.openId = -1
          console.log('cancle')
        });
      },
//      resetPasswordEnter(formName) {
//        this.$refs[formName].validate(valid => {
//          if (valid) {
//            resetPassword(this.openId, this.passwordForm.password).then(() => {
//              this.$message({
//                type: 'info',
//                message: '重置密码成功！'
//              });
//              this.resetPasswordVisible = false;
//              this.openId = -1
//              this.getAdmin(this.pageSize, this.currentPage);
//            })
//          } else {
//            console.log('error submit!!');
//            return false;
//          }
//        });
//      },
//      clearPasswordForm() {
//        if (this.$refs.passwordForm)
//          this.$refs.passwordForm.resetFields();
//        this.resetPasswordVisible = false;
//        this.openId = -1
//      },
      stopAccount(index) {
        this.openId = index.row.id
        const h = this.$createElement;
        this.$msgbox({
          title: '禁用',
          message: h('p', null, '禁用该管理员账号后，管理员将无法登录使用该平台功能，确认禁用吗？'),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              stopAccount(this.openId).then(response => {
                if (response.data.code === 1) {
                  done();
                  this.$message({
                    type: 'info',
                    message: '禁用成功！'
                  });
                  setTimeout(() => {
                    instance.confirmButtonLoading = false;
                  }, 300);
                }
              }).catch(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              })
            } else {
              done();
            }
          }
        }).then(() => {
          this.openId = -1
          this.getAdmin(this.pageSize, this.currentPage);
        }).catch(() => {
          this.openId = -1
          console.log('cancle')
        });
      },
      startAccount(index) {
        this.openId = index.row.id
        const h = this.$createElement;
        this.$msgbox({
          title: '启用',
          message: h('p', null, '启用该管理员账号后，管理员将可以登录使用该平台功能，确认启用吗？'),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              startAccount(this.openId).then(response => {
                if (response.data.code === 1) {
                  done();
                  this.$message({
                    type: 'info',
                    message: '删除成功！'
                  });
                  setTimeout(() => {
                    instance.confirmButtonLoading = false;
                  }, 300);
                }
              }).catch(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              })
            } else {
              done();
            }
          }
        }).then(() => {
          this.openId = -1
          this.getAdmin(this.pageSize, this.currentPage);
        }).catch(() => {
          this.openId = -1
          console.log('cancle')
        });
      },
      deleteAccount(index) {
        this.openId = index.row.id
        const h = this.$createElement;
        this.$msgbox({
          title: '删除管理员',
          message: h('p', null, '删除该管理员后，管理员将无法登录使用该平台功能，确认删除吗？'),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              deleteAccount(this.openId).then(response => {
                if (response.data.code === 1) {
                  done();
                  this.$message({
                    type: 'info',
                    message: '删除成功！'
                  });
                  setTimeout(() => {
                    instance.confirmButtonLoading = false;
                  }, 300);
                }
              }).catch(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              })
            } else {
              done();
            }
          }
        }).then(() => {
          this.openId = -1
          this.getAdmin(this.pageSize, this.currentPage);
        }).catch(() => {
          this.openId = -1
          console.log('cancle')
        });
      },
      searchMessage() {
        this.currentPage = 1
        this.getAdmin(this.pageSize, 1)
      },
      getAdmin(pageSize, currentPage) {
        searchRoleList('', 99999, 1).then(response => {
          this.roleList = [];
          response.data.result.content.forEach(item => {
            item.module = JSON.parse(item.module);
            const role = new Role(item)
            this.roleList.push(role)
          })
          return searchAdminList(this.searchBoxInput
            , pageSize
            , currentPage)
        }).then(response => {
          this.adminList = [];
          this.totalCount = response.data.result.totalCount;
          response.data.result.content.forEach(item => {
            let statusType = ''
//            if (item.role === 1) {
//              item.role = '管理员'
//            } else {
//              item.role = '客服'
//            }
            this.roleList.forEach(item2 => {
              if (item.role === item2.id) {
                item.role = item2.name
              }
            })
            if (item.status === 1) {
              item.status = '启用'
              statusType = 'success'
            } else {
              item.status = '禁用'
              statusType = 'danger'
            }
            const admin = new AdminManager(item)
            admin.statusType = statusType;
            this.adminList.push(admin)
          })
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getAdmin(val, this.currentPage)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getAdmin(this.pageSize, val)
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .search_header
    margin-top 20px
    width 96%
    margin-left 2%

  .box_manage_main
    width 94%
    margin-top 40px
    margin-left 3%
    .el-icon-view
      margin-left 10px
      color deepskyblue
  .pagenation_wrapper
    margin-top 20px
</style>
