<template>
    <div class="box_detail">
      <div class="header_box_detail">
        <div class="go_back" @click="goBack"><i class="el-icon-caret-left">返回</i></div>
        <h3>设备详情</h3>
      </div>
      <table class="Box_detail_table">
        <tbody>
        <tr>
          <td>设备序列号</td>
          <td>{{boxDetailObj.serialNumber}}</td>
          <td>设备类型</td>
          <td>{{boxDetailObj.boxName}}</td>
        </tr>
        <tr>
          <td>旅馆名称</td>
          <td>{{boxDetailObj.hotelName}}</td>
          <td>设备状态</td>
          <td>{{boxDetailObj.boxStatus}}</td>
        </tr>
        <tr>
          <td>登记客户端版本</td>
          <td>{{boxDetailObj.anlvAppVersion}}</td>
          <td>MDM客户端版本</td>
          <td>{{boxDetailObj.mdmVersion}}</td>
        </tr>
        <tr>
          <td>ROM版本</td>
          <td>{{boxDetailObj.romVersion}}</td>
          <td>MCU版本</td>
          <td>{{boxDetailObj.mcuVersion}}</td>
        </tr>
        <tr>
          <td>IP地址</td>
          <td>{{boxDetailObj.ip}}</td>
          <td>MAC地址</td>
          <td>{{boxDetailObj.mac}}</td>
        </tr>
        <tr>
          <td>USB1</td>
          <td>{{boxDetailObj.usb1}}</td>
          <td>USB2</td>
          <td>{{boxDetailObj.usb2}}</td>
        </tr>
        <tr>
          <td>USB3</td>
          <td>{{boxDetailObj.usb3}}</td>
          <td>USB4</td>
          <td>{{boxDetailObj.usb4}}</td>
        </tr>
        <tr>
          <td>USB5</td>
          <td>{{boxDetailObj.usb5}}</td>
          <td>USB6</td>
          <td>{{boxDetailObj.usb6}}</td>
        </tr>
        <tr>
          <td>内置存储空间已用</td>
          <td>{{boxDetailObj.insideStorageUsed}}</td>
          <td>内置存储空间可用</td>
          <td>{{boxDetailObj.insideStorageUnused}}</td>
        </tr>
        <tr>
          <td>外置存储空间已用</td>
          <td>{{boxDetailObj.externalStorageUsed}}</td>
          <td>外置存储空间可用</td>
          <td>{{boxDetailObj.externalStorageUnused}}</td>
        </tr>
        <tr>
          <td>SAM码</td>
          <td>{{boxDetailObj.samCode}}</td>
          <td>注册时间</td>
          <td>{{boxDetailObj.registrationTIme}}</td>
        </tr>
        <tr>
          <td>最后启动时间</td>
          <td>{{boxDetailObj.startTime}}</td>
          <td>最后报告时间</td>
          <td>{{boxDetailObj.reportTime}}</td>
        </tr>
        </tbody>
      </table>
    </div>
</template>

<script type="text/ecmascript-6">
  import { getBoxDetail } from 'api/boxManage'
  import Box from 'common/js/box'
  export default {
    props: {
      boxId: {
        type: String,
        default: -1
      }
    },
    created() {
      this.getBoxDetail(this.boxId);
    },
    data() {
      return {
        boxDetailObj: {}
      }
    },
    methods: {
      getBoxDetail(id) {
        getBoxDetail(id).then(response => {
          this.boxDetailObj = new Box(response.data.result)
        })
      },
      goBack() {
        this.$emit('goBackBoxManage', { showDetail: false })
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


</style>
