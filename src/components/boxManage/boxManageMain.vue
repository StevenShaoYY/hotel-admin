<template>
  <div>
    <div class="search_header">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            placeholder="搜索设备序列号、旅馆名称、应用版本"
            icon="search"
            v-model="searchBoxInput"
            :on-icon-click="searchBox">
          </el-input>
        </el-col>
        <el-col :span="12">
          <el-select v-model="boxTypeSelected" placeholder="按设备类型筛选">
            <el-option
              v-for="item in boxType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="boxStatusSelected" placeholder="按设备状态筛选">
            <el-option
              v-for="item in boxStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker
            v-model="dateRangeSelected"
            type="daterange"
            placeholder="按注册日期筛选">
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-button>导入设备</el-button>
          <el-button>应用升级</el-button>
          <el-button>固件升级</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box_manage_main">
      <box-manage v-show="showDetailFlag===false && showLogFlag===false" hotelCode="11111"
                  :isShowSelect=isShowSelect
                  @showDetail="showDetail"
                  @showLog="showLog"
                  @boxManageSelected="selectBox"></box-manage>
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
        detailId: -1,
        isShowSelect: true,
        boxList: [],
        searchBoxInput: '',
        boxTypeSelected: '',
        boxStatusSelected: '',
        dateRangeSelected: '',
        boxType: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '登记盒子'
        }, {
          value: '2',
          label: '查验终端'
        }],
        boxStatus: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '在线'
        }, {
          value: '2',
          label: '离线'
        }, {
          value: '3',
          label: '已注销'
        }]
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
      },
      selectBox(boxList) {
        this.boxList = boxList;
      },
      searchBox() {
        console.log(111);
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
  .search_header
    margin-top 20px
    width 96%
    margin-left 2%
  .box_manage_main
    width 94%
    margin-top 40px
    margin-left 3%
</style>
