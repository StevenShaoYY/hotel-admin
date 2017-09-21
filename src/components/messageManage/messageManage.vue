<template>
  <div>
    <div class="search_header">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input
            placeholder="搜索消息主题、发布人"
            icon="search"
            v-model="searchBoxInput"
            :on-icon-click="searchMessage">
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-select v-model="messageTypeSelected" placeholder="按消息类型筛选">
            <el-option
              v-for="item in messageType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            v-model="dateRangeSelected"
            type="daterange"
            placeholder="按日期筛选">
          </el-date-picker>
        </el-col>
      </el-row>
    </div>
    <div class="box_manage_main">
      <el-table
        :data="messageList"
        border
        style="width: 100%">
        <el-table-column
          prop="type"
          label="消息类型">
        </el-table-column>
        <el-table-column
          label="紧急程度"
          width="120">
          <template scope="scope">
            <el-tag :type="scope.row.dangerType">{{ scope.row.important }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="发送范围">
          <template scope="scope">
            <el-popover
              ref="popover1"
              placement="right-start"
              width="200"
              trigger="hover">
              <p><span>已发送用户数：</span>{{scope.row.sendUser}}</p>
              <p><span>已接收用户数：</span>{{scope.row.receiveUser}}</p>
              <p><span>已查看用户数：</span>{{scope.row.viewUser}}</p>
            </el-popover>
            {{ scope.row.userRange }}<i class="el-icon-view" v-popover:popover1></i>
          </template>
        </el-table-column>
        <el-table-column
          label="消息主题">
          <template scope="scope">
            <el-button @click="watchDetail(scope.row)" type="text" size="small">{{scope.row.title}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="publisher"
          label="发布人">
        </el-table-column>
        <el-table-column
          prop="publishTime"
          label="发布时间">
        </el-table-column>
        <el-table-column
          prop="effectiveTime"
          label="有效期限">
        </el-table-column>
        <el-table-column
          label="发送状态"
          width="120">
          <template scope="scope">
            <el-tag :type="scope.row.sendType">{{ scope.row.transmitState }}</el-tag>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--label="操作">-->
          <!--<template scope="scope">-->
            <!--<el-button @click="resetPassword(scope.row)" type="text" size="small">重置密码</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
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
  import { searchMessageList } from 'api/messageManage'
  import Message from 'common/js/message'
  import { dateFormat } from 'common/js/utils'
  export default {
    props: {},
    created() {
      this.getUserMessage(this.pageSize, this.currentPage);
    },
    data() {
      return {
        messageType: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '通知通告'
        }, {
          value: '2',
          label: '系统消息'
        }],
        messageTypeSelected: '',
        searchBoxInput: '',
        dateRangeSelected: ['', ''],
        messageList: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    methods: {
      searchMessage() {
        this.currentPage = 1
        this.getUserMessage(this.pageSize, 1)
      },
      getUserMessage(pageSize, currentPage) {
        searchMessageList(this.searchBoxInput
          , this.messageTypeSelected
          , dateFormat(this.dateRangeSelected[0])
          , dateFormat(this.dateRangeSelected[1])
          , pageSize
          , currentPage).then(response => {
            this.messageList = [];
            this.totalCount = response.data.result.totalCount;
            response.data.result.content.forEach(item => {
              let dangerType = ''
              let sendType = ''
              if (item.type === 1) {
                item.type = '通知通告'
              } else {
                item.type = '系统消息'
              }
              if (item.important === 1) {
                item.important = '一般'
                dangerType = 'gray'
              } else {
                item.important = '紧急'
                dangerType = 'danger'
              }
              if (item.transmitState === 1) {
                item.transmitState = '未发送'
                sendType = 'warning'
              } else if (item.transmitState === 2) {
                item.transmitState = '发送中'
                sendType = 'danger'
              } else {
                item.transmitState = '已发送'
                sendType = 'success'
              }
              const mes = new Message(item)
              mes.dangerType = dangerType;
              mes.sendType = sendType;
              this.messageList.push(mes)
            })
          })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getUserMessage(val, this.currentPage)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getUserMessage(this.pageSize, val)
      },
      watchDetail(row) {
        this.$router.push({ path: 'message_detail', query: { id: row.id } })
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
