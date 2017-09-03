<template>
    <div>
      <div class="search_header"></div>
      <div class="box_manage_main">
        <box-manage v-show="showDetailFlag===false && showLogFlag===false" hotelCode="11111" @showDetail="showDetail" @showLog="showLog"></box-manage>
        <box-detail v-if="showDetailFlag===true" :boxId="detailId" @goBackBoxManage="goback"></box-detail>
        <box-log v-if="showLogFlag===true" :boxId="detailId" @goBackBoxManage="goback2"></box-log>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import BoxManage from './boxManage.vue'
  import BoxDetail from 'components/boxManage/boxDetail.vue'
  import BoxLog from 'components/boxManage/boxLog.vue'
  export default {
    props: {},
//    created() {
//    },
    data() {
      return {
        showDetailFlag: false,
        showLogFlag: false,
        detailId: -1
      }
    },
    methods: {
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
      BoxManage,
      BoxDetail,
      BoxLog
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
