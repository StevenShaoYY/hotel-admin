<template>
  <div>
    <div class="search_header">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input
            placeholder="搜索角色名、备注"
            icon="search"
            v-model="searchBoxInput"
            :on-icon-click="searchMessage">
          </el-input>
        </el-col>
        <el-col :span="3" :offset="15">
          <el-button @click="addRole" type="primary">添加角色</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box_manage_main">
      <el-table
        :data="roleList"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="角色名">
        </el-table-column>
        <el-table-column
          label="角色权限"
          prop="moduleNameStr">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="100">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="修改日期">
        </el-table-column>
        <el-table-column
          prop="modifyPerson"
          label="修改人"
          width="195">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template scope="scope">
            <el-button
              @click.native.prevent="updateRole(scope)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteRole(scope)"
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
    <el-dialog title="添加角色" :visible.sync="addRoleVisible" :before-close="clearForm">
      <div>
        <el-form ref="addRoleForm" :rules="rulesAddRole" :model="addRoleForm" label-width="80px">
          <el-form-item label="角色名" prop="name">
            <el-input v-model="addRoleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="选择角色拥有的功能权限" prop="moduleCheckedList">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 0px 0;"></div>
            <el-checkbox-group v-model="addRoleForm.moduleCheckedList" >
              <el-checkbox style="display: block;margin-left:0px" v-for="item in moduleNameList" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="addRoleForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="roleAddEnter('addRoleForm')">提交</el-button>
            <el-button @click="resetForm('addRoleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog title="修改角色" :visible.sync="updateRoleVisible" :before-close="clearUpdateForm">
      <div>
        <el-form ref="updateRoleForm" :rules="rulesAddRole" :model="updateRoleForm" label-width="80px">
          <el-form-item label="角色名" prop="name">
            <el-input disabled v-model="updateRoleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="选择角色拥有的功能权限" prop="moduleCheckedList">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 0px 0;"></div>
            <el-checkbox-group v-model="updateRoleForm.moduleCheckedList" >
              <el-checkbox style="display: block;margin-left:0px" v-for="item in moduleNameList" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="updateRoleForm.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="roleUpdateEnter('updateRoleForm')">提交</el-button>
            <el-button @click="resetForm('updateRoleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import Role from 'common/js/role'
  import Module from 'common/js/module'
  import { searchRoleList, getModuleList, addRole, deleteRole, updateRole } from 'api/roleManage'
  export default {
    props: {},
    created() {
      this.getRole(this.pageSize, this.currentPage);
    },
    data() {
      return {
        searchBoxInput: '',
        roleList: [],
        moduleList: [],
        moduleNameList: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1,
        openId: -1,
        isIndeterminate: true,
        checkAll: true,
        addRoleVisible: false,
        updateRoleVisible: false,
        addRoleForm: {
          name: '',
          module: [],
          moduleCheckedList: [],
          remark: ''
        },
        updateRoleForm: {
          name: '',
          module: [],
          moduleCheckedList: [],
          remark: ''
        },
        rulesAddRole: {
          name: [{ required: true, message: '请输入角色名', trigger: 'blur' }]
        }
      }
    },
    watch: {
      'addRoleForm.moduleCheckedList': {
        handler(val) {
          this.addRoleForm.module = []
          val.forEach(item => {
            this.moduleList.forEach(item2 => {
              if (item2.name === item) {
                this.addRoleForm.module.push(item2.id)
              }
            })
          })
        },
        deep: true
      },
      'updateRoleForm.moduleCheckedList': {
        handler(val) {
          this.updateRoleForm.module = []
          val.forEach(item => {
            this.moduleList.forEach(item2 => {
              if (item2.name === item) {
                this.updateRoleForm.module.push(item2.id)
              }
            })
          })
        },
        deep: true
      }
    },
    methods: {
      addRole() {
        getModuleList().then(response => {
          this.moduleList = []
          this.moduleNameList = []
          response.data.result.forEach(item => {
            const module = new Module(item)
            this.moduleList.push(module)
            this.moduleNameList.push(module.name)
          })
          this.addRoleVisible = true
        })
      },
      handleCheckAllChange(event) {
        this.addRoleForm.moduleCheckedList = event.target.checked ? this.moduleNameList : [];
        this.isIndeterminate = false;
      },
      roleAddEnter(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            addRole(this.addRoleForm.name, this.addRoleForm.module, this.addRoleForm.remark).then(() => {
              this.$message({
                type: 'info',
                message: '添加角色成功！'
              });
              this.addRoleVisible = false;
              this.getRole(this.pageSize, this.currentPage);
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
        if (this.$refs.addRoleForm)
          this.$refs.addRoleForm.resetFields();
        this.addRoleVisible = false;
      },
      updateRole(index) {
        getModuleList().then(response => {
          this.moduleList = []
          this.moduleNameList = []
          index.row.module.forEach(item => {
            this.updateRoleForm.moduleCheckedList.push(item.name)
          })
          this.updateRoleForm.name = index.row.name
          this.updateRoleForm.remark = index.row.remark
          this.openId = index.row.id
          response.data.result.forEach(item => {
            const module = new Module(item)
            this.moduleList.push(module)
            this.moduleNameList.push(module.name)
          })
          this.updateRoleVisible = true
        })
      },
      roleUpdateEnter(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            updateRole(this.openId, this.updateRoleForm.name, this.updateRoleForm.module, this.updateRoleForm.remark).then(() => {
              this.$message({
                type: 'info',
                message: '更新角色成功！'
              });
              this.updateRoleVisible = false;
              this.getRole(this.pageSize, this.currentPage);
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      clearUpdateForm() {
        if (this.$refs.updateRoleForm)
          this.$refs.updateRoleForm.resetFields();
        this.openId = -1
        this.updateRoleVisible = false;
      },
      deleteRole(index) {
        this.openId = index.row.id
        const h = this.$createElement;
        this.$msgbox({
          title: '删除角色',
          message: h('p', null, '删除该角色后，该角色的管理员将失去角色相应权限，确认删除吗？'),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              deleteRole(this.openId).then(response => {
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
          this.getRole(this.pageSize, this.currentPage);
        }).catch(() => {
          this.openId = -1
        });
      },
      searchMessage() {
        this.currentPage = 1
        this.getRole(this.pageSize, 1)
      },
      getRole(pageSize, currentPage) {
        searchRoleList(this.searchBoxInput
          , pageSize
          , currentPage).then(response => {
            this.roleList = [];
            this.totalCount = response.data.result.totalCount;
            response.data.result.content.forEach(item => {
              const moduleNameList = []
              item.module = JSON.parse(item.module);
              item.module.forEach(item => {
                moduleNameList.push(item.name)
              })
              const role = new Role(item)
              role.moduleNameStr = moduleNameList.join(',')
              this.roleList.push(role)
            })
          })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getRole(val, this.currentPage)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getRole(this.pageSize, val)
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
