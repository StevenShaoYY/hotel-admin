<template>
    <div>
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
</template>

<script type="text/ecmascript-6">
  import { getUserList, resetPassword } from 'api/hotelManage'
  import User from 'common/js/user'
  export default {
    props: {
      hotelCode: {
        type: String,
        default: ''
      }

    },
    created() {
      this.getUserList(this.pageSize, this.currentPage);
    },
    data() {
      return {
        userList: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    methods: {
      getUserList(pageSize, currentPage) {
        getUserList(this.hotelCode, pageSize, currentPage).then(response => {
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
        console.log(row)
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
        this.getUserList(this.pageSize, val)
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .pagenation_wrapper
    margin-top 10px
    margin-bottom 20px
</style>
