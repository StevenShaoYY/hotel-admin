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
        style="width: 94%">
        <el-table-column
          label="文件名称">
          <template scope="scope">
            <a :href=scope.row.filePath style="color:#20a0ff">{{scope.row.fileName}}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
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
  import { getLogList, catchLogList } from 'api/boxManage'
  import Log from 'common/js/log'
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
        getLogList(this.boxId, pageSize, currentPage).then(response => {
          this.logList = [];
          this.totalCount = response.data.result.totalCount;
          response.data.result.content.forEach(item => {
            const log = new Log(item)
            this.logList.push(log)
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
        catchLogList(this.boxId).then(() => {
          this.$message({
            type: 'info',
            message: '日志抓取中！'
          });
        })
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
