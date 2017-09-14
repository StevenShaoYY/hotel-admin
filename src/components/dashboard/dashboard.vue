<template>
    <div class="dashboard">
      <div class="index_block">
        <div class="header">
          <h3>系统资源</h3>
        </div>
        <div class="header_tab_wrapper">
          <div class="header_tab">
            <i></i><span class="tab_font_small">登记盒子总数</span><span class="tab_font_big">{{dashboardData.boxCount}}</span>
          </div>
          <div class="header_tab">
            <i></i><span class="tab_font_small">用户总数</span><span class="tab_font_big">{{dashboardData.userCount}}</span>
          </div>
          <div class="header_tab">
            <i></i><span class="tab_font_small">旅馆总数</span><span class="tab_font_big">{{dashboardData.hotelCount}}</span>
          </div>
          <div class="header_tab">
            <i></i><span class="tab_font_small">房间总数</span><span class="tab_font_big">{{dashboardData.roomCount}}</span>
          </div>
        </div>
      </div>
      <div class="index_block block_2">
        <div class="header">
          <h3>入住情况</h3>
        </div>
        <div class="header_tab_wrapper">
          <div class="header_tab">
            <i></i><span class="tab_font_small">今日入住登记数</span><span class="tab_font_big">{{dashboardData.todayCheckin}}</span>
          </div>
          <div class="header_tab">
            <i></i><span class="tab_font_small">今日访客登记数</span><span class="tab_font_big">{{dashboardData.todayVisitors}}</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import { getDashboardData } from 'api/dashboard'
  export default {
    data() {
      return {
        dashboardData: {
          boxCount: null,
          userCount: null,
          hotelCount: null,
          roomCount: null,
          todayCheckin: null,
          todayVisitors: null
        }
      }
    },
    created() {
      this.getDashboardData()
    },
    methods: {
      getDashboardData() {
        getDashboardData().then(response => {
          this.dashboardData = response.data.result;
        })
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .dashboard
    width 100%
    .index_block
      width 90%
      height 200px
      margin 0 5%
      background-color rgb(238,241,246)
      border 1px solid darkgray
      .header
        height: 50px
        border-bottom 1px solid #ccc
        h3
          line-height 50px
          color #222
          padding-left 30px
      .header_tab_wrapper
        .header_tab
          float left
          width 20%
          height 120px
          background-color rgb(70,141,185)
          margin-left 4%
          margin-top 15px
          text-align center
          color #fff
          .tab_font_small
            display inline-block
            width 100%
            height 35px
            line-height 35px
            border-bottom 1px solid #fff
          .tab_font_big
            font-size 35px
            display inline-block
            line-height 85px
            margin-left 5px
    .block_2
      margin-top 20px
</style>
