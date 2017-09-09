<template>
  <div>
    <div class="search_header" v-show="showDetailFlag===false && showLogFlag===false">
      <el-row :gutter="10">
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
          <el-button @click="importDevice">导入设备</el-button>
          <el-button>应用升级</el-button>
          <el-button>固件升级</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box_manage_main">
      <box-manage v-if="flag"
                  v-show="showDetailFlag===false && showLogFlag===false"
                  :isShowSelect=isShowSelect
                  :boxListData=boxList
                  :totalCountOut=totalCount
                  @showDetail="showDetail"
                  @showLog="showLog"
                  @sizeChange="handleSizeChange"
                  @currentChange="handleCurrentChange"
                  @boxManageSelected="selectBox"></box-manage>
      <box-detail v-if="showDetailFlag===true" :boxId="detailId" @goBackBoxManage="goback"></box-detail>
      <box-log v-if="showLogFlag===true" :boxId="detailId" @goBackBoxManage="goback2"></box-log>
    </div>
    <el-dialog title="导入设备" :visible.sync="dialogForm1Visible">
      <div>
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm1Visible = false">取 消</el-button>
        <el-button type="primary" @click="dialogForm1Visible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import BoxManage from './boxManage.vue'
  import BoxDetail from 'components/boxManage/boxDetail.vue'
  import Box from 'common/js/box'
  import BoxLog from 'components/boxManage/boxLog.vue'
  import { boxSearch } from 'api/boxManage'
  export default {
    props: {},
    created() {
      this.searchBox()
    },
    data() {
      return {
        flag: false,
        showDetailFlag: false,
        showLogFlag: false,
        detailId: -1,
        isShowSelect: true,
        boxList: [],
        selectBoxList: [],
        searchBoxInput: '',
        boxTypeSelected: '',
        boxStatusSelected: '',
        dateRangeSelected: ['', ''],
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
        }],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1,
        dialogForm1Visible: false,
        fileList: [],
        uploadUrl: process.env.BASE_API + '/ops/devices'
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
        this.selectBoxList = boxList;
      },
      handleSizeChange(size) {
        this.pageSize = size;
        this.searchBox();
      },
      handleCurrentChange(current) {
        this.currentPage = current;
        this.searchBox();
      },
      searchBox() {
        boxSearch(this.searchBoxInput
          , this.boxTypeSelected
          , this.boxStatusSelected
          , this.dateRangeSelected[0]
          , this.dateRangeSelected[1]
          , this.pageSize, this.currentPage).then(response => {
            this.boxList = [];
            this.totalCount = response.data.result.totalCount;
            response.data.result.content.forEach(item => {
              let tagType = ''
              if (item.boxStatus === 1) {
                item.boxStatus = '在线'
                tagType = 'success'
              } else if (item.boxStatus === 2) {
                item.boxStatus = '离线'
                tagType = 'gray'
              } else if (item.boxStatus === 3) {
                item.boxStatus = '已注销'
                tagType = 'danger'
              }
              const box = new Box(item)
              box.tagType = tagType;
              this.boxList.push(box)
              this.flag = true
            })
          })
      },
      importDevice() {
        console.log(process.env.BASE_API)
        this.dialogForm1Visible = true
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
