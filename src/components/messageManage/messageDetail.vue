<template>
  <div class="box_detail">
    <div class="header_box_detail">
      <div class="go_back" @click="goBack"><i class="el-icon-caret-left">返回</i></div>
      <h3>消息详情</h3>
    </div>
    <table class="Box_detail_table">
      <tbody>
      <tr>
        <td class="td_title">发送类型</td>
        <td>{{messObj.type}}</td>
        <td class="td_title">紧急程度</td>
        <td>{{messObj.important}}</td>
      </tr>
      <tr>
        <td class="td_title">发布人</td>
        <td>{{messObj.publisher}}</td>
        <td class="td_title">发布时间</td>
        <td>{{messObj.publishTime}}</td>
      </tr>
      <tr>
        <td class="td_title">有效期限</td>
        <td>{{messObj.effectiveTime}}</td>
        <td class="td_title">发送状态</td>
        <td>{{messObj.transmitState}}</td>
      </tr>
      <tr>
        <td class="td_title">发送用户</td>
        <td>已发送{{messObj.sendUser}}|已接收{{messObj.receiveUser}}|已查看{{messObj.viewUser}}</td>
        <td class="td_title">消息主题</td>
        <td>{{messObj.title}}</td>
      </tr>
      <tr>
        <td class="td_title2">消息内容</td>
        <td colspan="3">{{messObj.content}}</td>
      </tr>
      <tr>
        <td class="td_img">附件</td>
        <td  colspan="3"><img :src="messObj.img" alt=""></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getMessageDetail } from 'api/messageManage'
  import Message from 'common/js/message'
  export default {
    props: {},
    created() {
      this.getMessageDetail()
    },
    data() {
      return {
        id: this.$route.query.id,
        messObj: {}
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
      getMessageDetail() {
        getMessageDetail(this.id).then(res => {
          let dangerType = ''
          let sendType = ''
          const item = res.data.result
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
          this.messObj = new Message(item)
          this.messObj.dangerType = dangerType
          this.messObj.sendType = sendType
        })
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .box_detail
    width 100%
    color #333
    .header_box_detail
      margin-top 1%
      margin-left 3%
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
    .Box_detail_table
      width 80%
      margin-left 10%
      margin-top 3%
      line-height 35px
      .td_title
        width 13%
        padding 10px 0
      .td_title2
        width 13%
        padding 10px 0
      .td_img
        vertical-align top
</style>
