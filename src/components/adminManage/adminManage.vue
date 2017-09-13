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
              @click.native.prevent="stopAccount(scope)"
              type="text"
              size="small">
              禁用
            </el-button>
            <el-button
              @click.native.prevent="delete(scope)"
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
  </div>
</template>

<script type="text/ecmascript-6">
  import AdminManager from 'common/js/adminManager'
  import { searchAdminList } from 'api/adminManage'
  export default {
    props: {},
    created() {
      this.getAdmin(this.pageSize, this.currentPage);
    },
    data() {
      return {
        searchBoxInput: '',
        adminList: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    methods: {
      addAdminPerson() {
        console.log(111)
      },
      updateAdmin(index) {
        console.log(index)
      },
      resetPassword(index) {
        console.log(index)
      },
      stopAccount(index) {
        console.log(index)
      },
      delete(index) {
        console.log(index)
      },
      searchMessage() {
        this.currentPage = 1
        this.getAdmin(this.pageSize, 1)
      },
      getAdmin(pageSize, currentPage) {
        searchAdminList(this.searchBoxInput
          , pageSize
          , currentPage).then(response => {
            this.adminList = [];
            this.totalCount = response.data.result.totalCount;
            response.data.result.content.forEach(item => {
              let statusType = ''
              if (item.role === 1) {
                item.role = '管理员'
              } else {
                item.role = '客服'
              }
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
