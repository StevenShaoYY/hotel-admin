<template>
    <div class="box_log">
      <div class="header_box_detail">
        <div class="go_back" @click="goBack"><i class="el-icon-caret-left">返回</i></div>
        <h3>设备日志</h3>
        <el-button type="primary" class="catch_btn" @click="catchLog">抓取日志</el-button>
      </div>
      <el-table
        :data="logList"
        border
        style="width: 100%">
        <el-table-column
          prop="userName"
          label="文件名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="上传时间"
          width="120">
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
  import { catchLog } from 'api/boxManage'
  export default {
    props: {
      boxId: {
        type: String,
        default: -1
      }
    },
    created() {
      this.getLogList(this.pageSize, this.currentPage);
    },
    data() {
      return {
        logList: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    methods: {
      goBack() {
        this.$emit('goBackBoxManage', { showLog: false })
      },
      getLogList(pageSize, currentPage) {
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
      handleSizeChange(val) {
        this.pageSize = val
        this.getLogList(val, this.currentPage)
      },
      handleCurrentChange(val) {
        this.getLogList(this.pageSize, val)
      },
      catchLog() {
        catchLog(this.boxId)
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .box_log
    width 100%
    color #333
    .header_box_detail
      margin-top 1%
      margin-left 3%
      margin-bottom 2%
      .go_back
        display inline-block
        vertical-align top
        i
          color #aaa
          font-size 17px
          margin-top 5px
          cursor pointer
      h3
        display inline-block
        line-height 30px
        font-size 28px
        margin-left 20px
      .catch_btn
        float right
        margin-right 10px
        margin-top 3px
    .Box_detail_table
      width 80%
      margin-left 10%
      margin-top 3%
      line-height 35px


</style>
