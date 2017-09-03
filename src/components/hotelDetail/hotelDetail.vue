<template>
  <div class="hotel_detail">
    <table class="table_wrapper">
      <tbody>
      <tr>
        <td class="td_name">旅馆代码：</td>
        <td class="text_left">{{hotel.hotelCode}}</td>
        <td class="td_name">旅馆名称：</td>
        <td class="text_left">{{hotel.hotelName}}</td>
        <td class="td_name">旅馆地址：</td>
        <td class="text_left">{{hotel.hotelAddress}}</td>
      </tr>
      <tr>
        <td class="td_name">房间数：</td>
        <td class="text_left">{{hotel.totalRooom}}</td>
        <td class="td_name">床位数：</td>
        <td class="text_left">{{hotel.totalBed}}</td>
        <td class="td_name">所属辖区：</td>
        <td class="text_left">{{hotel.belongArea}}</td>
      </tr>
      <tr>
        <td class="td_name">旅馆负责人：</td>
        <td class="text_left">{{hotel.hotelManager}}</td>
        <td class="td_name">联系电话：</td>
        <td class="text_left">{{hotel.contactNumber}}</td>
        <td class="td_name">创建人：</td>
        <td class="text_left">{{hotel.createPerson}}</td>
      </tr>
      <tr>
        <td class="td_name">创建时间：</td>
        <td class="text_left">{{hotel.createTime}}</td>
        <td class="td_name">修改人：</td>
        <td class="text_left">{{hotel.modifyPerson}}</td>
        <td class="td_name">修改时间：</td>
        <td class="text_left">{{hotel.modifyTime}}</td>
      </tr>
      </tbody>
    </table>
    <div class="tab_wrapper">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="用户信息" name="first">
          <user-detail :hotelCode="hotelCode"></user-detail>
        </el-tab-pane>
        <el-tab-pane label="设备信息" name="second">
          <box-manage v-show="showDetailFlag===false && showLogFlag===false" :hotelCode="hotelCode" @showDetail="showDetail" @showLog="showLog"></box-manage>
          <box-detail v-if="showDetailFlag===true" :boxId="detailId" @goBackBoxManage="goback"></box-detail>
          <box-log v-if="showLogFlag===true" :boxId="detailId" @goBackBoxManage="goback2"></box-log>
        </el-tab-pane>
        <el-tab-pane label="房间信息" name="third">
          <room-detail :hotelCode="hotelCode"></room-detail>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { getHotelDetail } from 'api/hotelManage'
  import UserDetail from './userDetail.vue'
  import BoxManage from 'components/boxManage/boxManage.vue'
  import BoxDetail from 'components/boxManage/boxDetail.vue'
  import BoxLog from 'components/boxManage/boxLog.vue'
  import RoomDetail from './roomDetail.vue'
  import Hotel from 'common/js/hotel'
  export default {
    props: {},
    created() {
      this.getHotelDetail();
    },
    data() {
      return {
        roomList: [],
        hotel: {},
        activeName2: 'first',
        hotelCode: this.$route.query.hotelCode,
        showDetailFlag: false,
        showLogFlag: false,
        detailId: -1
      }
    },
    methods: {
      getHotelDetail() {
        getHotelDetail(this.$route.query.hotelCode).then(response => {
          this.hotel = new Hotel(response.data.result);
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      showDetail(id) {
        this.showDetailFlag = id.showDetail;
        this.detailId = id.id;
      },
      showLog(id) {
        this.showLogFlag = id.showLog;
        this.detailId = id.id;
      },
      goback(flag) {
        this.showDetailFlag = flag.showDetail;
      },
      goback2(flag) {
        this.showLogFlag = flag.showLog;
      }
    },
    components: {
      UserDetail,
      RoomDetail,
      BoxManage,
      BoxDetail,
      BoxLog
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .hotel_detail
    .table_wrapper
      width 90%
      height 170px
      margin-left 5%
      color #333
      margin-top 10px
      .td_name
        width 140px
      .text_left
        text-align left
    .tab_wrapper
      width 94%
      margin-left 3%
</style>
