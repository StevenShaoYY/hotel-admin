<template>
  <div>
    <div class="search_header">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input
            placeholder="搜索用户信息、旅馆代码、旅馆名称"
            icon="search"
            v-model="searchBoxInput"
            :on-icon-click="searchUser">
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-select v-model="userRoleSelected" placeholder="按用户角色筛选">
            <el-option
              v-for="item in userRole"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            v-model="dateRangeSelected"
            type="daterange"
            format="yyyy-MM-dd"
            placeholder="按注册日期筛选">
          </el-date-picker>
        </el-col>
      </el-row>
    </div>
    <div class="box_manage_main">
      <el-table
        :data="userList"
        border
        style="width: 100%">
        <el-table-column
          prop="userName"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="certificateNumber"
          label="证件号码">
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="手机号码">
        </el-table-column>
        <el-table-column
          prop="hotelCode"
          label="旅馆代码">
        </el-table-column>
        <el-table-column
          prop="hotelName"
          label="旅馆名称">
        </el-table-column>
        <el-table-column
          prop="type"
          label="用户角色">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template scope="scope">
            <el-button @click="resetPassword(scope.row)" type="text" size="small">重置密码</el-button>
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
  import { searchUserList, resetPassword } from 'api/hotelManage'
  import { dateFormat } from 'common/js/utils'
  import User from 'common/js/user'
  export default {
    props: {},
    created() {
      this.getUserList(this.pageSize, this.currentPage);
    },
    data() {
      return {
        userRole: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '管理员'
        }, {
          value: '2',
          label: '前台'
        }],
        userRoleSelected: '',
        searchBoxInput: '',
        dateRangeSelected: ['', ''],
        userList: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    methods: {
      searchUser() {
        this.currentPage = 1
        this.getUserList(this.pageSize, 1)
      },
      getUserList(pageSize, currentPage) {
        searchUserList(this.searchBoxInput
          , this.userRoleSelected
          , dateFormat(this.dateRangeSelected[0])
          , dateFormat(this.dateRangeSelected[1])
          , pageSize
          , currentPage).then(response => {
            this.userList = [];
            this.totalCount = response.data.result.totalCount;
            response.data.result.content.forEach(item => {
              if (item.type === 1) {
                item.type = '管理员'
              } else {
                item.type = '前台'
              }
              const user = new User(item)
              this.userList.push(user)
            })
          })
      },
      resetPassword(row) {
        this.$confirm(`用户：${row.name},旅馆：${row.hotelName}，确认重置密码吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resetPassword(row.id).then(() => {
            this.$message({
              type: 'info',
              message: '重置密码成功'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置密码'
          });
        });
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getUserList(val, this.currentPage)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getUserList(this.pageSize, val)
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
</style>
