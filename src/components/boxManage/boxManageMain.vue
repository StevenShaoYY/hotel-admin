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
          <el-button @click="appUpdate">应用升级</el-button>
          <el-button @click="firmwareUpdate">固件升级</el-button>
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
    <el-dialog title="应用升级" :visible.sync="dialogForm2Visible">
      <div>
        <div class="dialog_radio_wrapper2">
          <span>升级选项：</span>
          <el-radio class="radio" v-model="updateType1" label="1">仅选择设备</el-radio>
          <el-radio class="radio" v-model="updateType1" label="2">筛选出的所有设备</el-radio>
        </div>
        <div class="dialog_radio_wrapper">
          <span>应用类型：</span>
          <el-radio class="radio" v-model="appType" label="1">登记客户端</el-radio>
          <el-radio class="radio" v-model="appType" label="2">MDM应用</el-radio>
        </div>
        <div class="dialog_select_wrapper">
          <el-select v-model="appUpdateSelect" placeholder="请选择升级应用">
            <el-option
              v-for="item in appList"
              :key="item.applicationId"
              :label="item.appName"
              :value="item.applicationId">
              <span style="float: left">文件名：{{ item.appName }}，</span>
              <span style="float: right;font-size: 13px">版本：{{ item.versionName }}</span>
            </el-option>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm2Visible = false">取 消</el-button>
        <el-button type="primary" @click="appUpdateEnter">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="固件升级" :visible.sync="dialogForm3Visible">
      <div>
        <div class="dialog_radio_wrapper2">
          <span>升级选项：</span>
          <el-radio class="radio" v-model="updateType2" label="1">仅选择设备</el-radio>
          <el-radio class="radio" v-model="updateType2" label="2">筛选出的所有设备</el-radio>
        </div>
        <div class="dialog_radio_wrapper">
          <span>固件类型：</span>
          <el-radio class="radio" v-model="firmwareType" label="1">ROM</el-radio>
          <el-radio class="radio" v-model="firmwareType" label="2">MCU</el-radio>
        </div>
        <div class="dialog_select_wrapper">
          <el-select v-model="firmwareUpdateSelect" placeholder="请选择升级固件">
            <el-option
              v-for="item in firmwareList"
              :key="item.firmwareId"
              :label="item.name"
              :value="item.firmwareId">
              <span style="float: left">文件名：{{ item.name }}，</span>
              <span style="float: right;font-size: 13px">旧版本：{{ item.oldVersion }}</span>
              <span style="float: right;font-size: 13px">新版本：{{ item.newVersion }},</span>
            </el-option>
          </el-select>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm3Visible = false">取 消</el-button>
        <el-button type="primary" @click="firmwareUpdateEnter">确 定</el-button>
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
  import App from 'common/js/app'
  import Firmware from 'common/js/firmware'
  import { appSearch, appUpdate } from 'api/appManage'
  import { firmwareSearch, firmwareUpdate } from 'api/firmwareManage'
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
        dialogForm2Visible: false,
        dialogForm3Visible: false,
        appType: '1',
        firmwareType: '1',
        appUpdateSelect: '',
        firmwareUpdateSelect: '',
        appList: [],
        firmwareList: [],
        fileList: [],
        uploadUrl: process.env.BASE_API + '/ops/devices',
        updateType1: '1',
        updateType2: '1'
      }
    },
    watch: {
      appType(newVal, old) {
        if (newVal !== old) {
          appSearch('', newVal, 99999, 1).then(response => {
            response.data.result.content.forEach(item => {
              const app = new App(item);
              this.appList.push(app)
            })
          })
        }
      },
      firmwareType(newVal, old) {
        if (newVal !== old) {
          firmwareSearch('', this.firmwareType, 99999, 1).then(response => {
            response.data.result.content.forEach(item => {
              const firmware = new Firmware(item);
              this.firmwareList.push(firmware)
            })
          })
        }
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
      },
      appUpdate(index) {
        appSearch('', this.appType, 99999, 1).then(response => {
          response.data.result.content.forEach(item => {
            const app = new App(item);
            this.appList.push(app)
          })
          this.openDialog = index.row;
          this.dialogForm2Visible = true;
        })
      },
      firmwareUpdate(index) {
        firmwareSearch('', this.firmwareType, 99999, 1).then(response => {
          response.data.result.content.forEach(item => {
            const firmware = new Firmware(item);
            this.firmwareList.push(firmware)
          })
          this.openDialog = index.row;
          this.dialogForm3Visible = true;
        })
      },
      appUpdateEnter() {
        const selectObjList = []
        let queryParams = {}
        if (this.updateType1 === '1') {
          this.selectBoxList.forEach(item => {
            const obj = {
              id: item.id
            }
            selectObjList.push(obj)
          })
        } else {
          queryParams = {
            queryKey: this.searchBoxInput,
            deviceType: this.boxTypeSelected,
            deviceStatus: this.boxStatusSelected,
            earliestTime: this.dateRangeSelected[0],
            latestTime: this.dateRangeSelected[1]
          }
        }
        appUpdate(selectObjList, queryParams, this.appType, this.appUpdateSelect).then(() => {
          this.dialogForm2Visible = false;
          this.$message({
            type: 'info',
            message: '应用升级成功！'
          });
        })
      },
      firmwareUpdateEnter() {
        const selectObjList = []
        let queryParams = {}
        if (this.updateType2 === '1') {
          this.selectBoxList.forEach(item => {
            const obj = {
              id: item.id
            }
            selectObjList.push(obj)
          })
        } else {
          queryParams = {
            queryKey: this.searchBoxInput,
            deviceType: this.boxTypeSelected,
            deviceStatus: this.boxStatusSelected,
            earliestTime: this.dateRangeSelected[0],
            latestTime: this.dateRangeSelected[1]
          }
        }
        firmwareUpdate(selectObjList, queryParams, this.firmwareType, this.firmwareUpdateSelect).then(() => {
          this.dialogForm3Visible = false;
          this.$message({
            type: 'info',
            message: '固件升级成功！'
          });
        })
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
  .dialog_radio_wrapper2
    text-align left
    margin-left 30%
  .dialog_radio_wrapper
    margin-top:30px
    text-align left
    margin-left 30%
  .dialog_select_wrapper
    margin-top:30px
    text-align center
</style>
