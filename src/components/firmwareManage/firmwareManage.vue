<template>
  <div>
    <div class="search_header">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-select v-model="appTypeSelect" placeholder="按固件类型筛选" @change="changeAppType">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3" :offset="15">
          <el-button @click="addApp" type="primary">上传新版本</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box_manage_main">
      <el-table
        :data="appList"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="文件名">
        </el-table-column>
        <el-table-column
          label="固件类型"
          prop="typeStr">
        </el-table-column>
        <el-table-column
          prop="oldVersion"
          label="旧版本号">
        </el-table-column>
        <el-table-column
          prop="newVersion"
          label="新版本号">
        </el-table-column>
        <el-table-column
          prop="updateTips"
          label="更新说明">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="添加时间">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template scope="scope">
            <el-button
              @click.native.prevent="appUpdate(scope)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteApp(scope)"
              type="text"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--<div class="pagenation_wrapper">-->
      <!--<el-pagination-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="currentPage"-->
      <!--:page-sizes="[10, 15, 30, 50]"-->
      <!--:page-size="pageSize"-->
      <!--layout="total, sizes, prev, pager, next, jumper"-->
      <!--:total="totalCount">-->
      <!--</el-pagination>-->
      <!--</div>-->
    </div>
    <el-dialog title="上传新固件" :visible.sync="uploadNewVisible" :before-close="clearForm">
      <div>
        <el-form ref="addAppForm" :rules="rulesAddApp" :model="addAppForm" label-width="80px">
          <el-form-item label="应用类型" prop="appType">
            <el-radio class="radio" v-model="addAppForm.type" label="1">ROM</el-radio>
            <el-radio class="radio" v-model="addAppForm.type" label="2">MCU</el-radio>
          </el-form-item>
          <el-form-item label="选择文件" prop="file">
            <el-upload
              ref="uploadApp"
              :before-upload="beforeUpload"
              :auto-upload="false"
              :multiple="false"
              action="www.baidu.com"
              :on-change="handleChange">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="旧版本号" prop="oldVersion">
            <el-input v-model="addAppForm.oldVersion"></el-input>
          </el-form-item>
          <el-form-item label="新版本号" prop="newVersion">
            <el-input v-model="addAppForm.newVersion"></el-input>
          </el-form-item>
          <el-form-item label="更新说明" prop="updateTips">
            <el-input v-model="addAppForm.updateTips"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="appAddEnter('addAppForm')">提交</el-button>
            <el-button @click="resetForm('addAppForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog title="编辑应用" :visible.sync="updateAppVisible" :before-close="clearUpdateForm">
      <div>
        <el-form ref="updateForm" :rules="rulesupdateApp" :model="updateForm" label-width="80px">
          <el-form-item label="应用类型" prop="appType">
            <el-radio class="radio" disabled v-model="updateForm.type" label="1" >ROM</el-radio>
            <el-radio class="radio" disabled v-model="updateForm.type" label="2">MCU</el-radio>
          </el-form-item>
          <el-form-item label="选择文件" prop="appFile">
            <el-upload
              ref="uploadUpdate"
              action="www.baidu.com"
              :auto-upload="false"
              :before-upload="beforeUpdate"
              :multiple="false"
              :on-change="handleChangeUpdate">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="旧版本号" prop="oldVersion">
            <el-input v-model="updateForm.oldVersion"></el-input>
          </el-form-item>
          <el-form-item label="新版本号" prop="newVersion">
            <el-input v-model="updateForm.newVersion"></el-input>
          </el-form-item>
          <el-form-item label="更新说明" prop="updateTips">
            <el-input v-model="updateForm.updateTips"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="appUpdateEnter('updateForm')">提交</el-button>
            <el-button @click="resetForm('updateForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import { firmwareSearch, firmwareUpload, updateFirmware, deleteFirmware } from 'api/firmwareManage'
  import Firmware from 'common/js/firmware'
  export default {
    props: {},
    created() {
      this.getFirmware();
    },
    data() {
      const validateFile = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error('请选择文件'));
        } else {
          callback();
        }
      };
      return {
        options: [{
          value: 1,
          label: 'ROM'
        }, {
          value: 2,
          label: 'MCU'
        }],
        addAppForm: {
          type: '1',
          file: [],
          oldVersion: '',
          newVersion: '',
          updateTips: ''
        },
        updateForm: {
          type: '1',
          file: [],
          oldVersion: '',
          newVersion: '',
          updateTips: ''
        },
        uploadNewVisible: false,
        updateAppVisible: false,
        appList: [],
        appTypeSelect: '',
        rulesAddApp: {
          file: [{ validator: validateFile, trigger: 'change' }],
          oldVersion: [{ required: true, message: '请输入旧版本号', trigger: 'blur' }],
          newVersion: [{ required: true, message: '请输入新版本号', trigger: 'blur' }],
          updateTips: [{ required: true, message: '请输入更新说明', trigger: 'blur' }]
        },
        rulesupdateApp: {
          oldVersion: [{ required: true, message: '请输入旧版本号', trigger: 'blur' }],
          newVersion: [{ required: true, message: '请输入新版本号', trigger: 'blur' }],
          updateTips: [{ required: true, message: '请输入更新说明', trigger: 'blur' }]
        },
        openId: -1
      }
    },
    methods: {
      addApp() {
        this.uploadNewVisible = true
      },
      handleChange(file) {
        this.addAppForm.file = [file]
      },
      beforeUpload(file) {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('type', this.addAppForm.type)
        fd.append('updateTips', this.addAppForm.updateTips)
        fd.append('oldVersion', this.addAppForm.oldVersion)
        fd.append('newVersion', this.addAppForm.newVersion)
        firmwareUpload(fd).then(() => {
          this.$message({
            type: 'info',
            message: '上传固件成功！'
          });
          this.uploadNewVisible = false;
          this.getFirmware();
        }).catch(() => {
          this.uploadNewVisible = false;
          this.openId = -1
        })
        return false
      },
      appAddEnter(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
//            firmwareUpload(this.addAppForm.type, this.addAppForm.file[0].raw, this.addAppForm.oldVersion, this.addAppForm.newVersion, this.addAppForm.updateTips).then(() => {
//              this.$message({
//                type: 'info',
//                message: '上传固件成功！'
//              });
//              this.uploadNewVisible = false;
//              this.getFirmware();
//            }).catch(() => {
//              this.uploadNewVisible = false;
//              this.openId = -1
//            })
            this.$refs.uploadApp.submit()
          } else {
//            this.uploadNewVisible = false;
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      clearForm() {
        if (this.$refs.addAppForm)
          this.$refs.addAppForm.resetFields();
        this.uploadNewVisible = false;
      },
      changeAppType(event) {
        this.appTypeSelect = event
        this.getFirmware();
      },
      appUpdate(index) {
        this.openId = index.row.firmwareId
        this.updateForm.type = index.row.type + ''
        this.updateForm.file.push({ name: index.row.name })
        this.updateForm.oldVersion = index.row.oldVersion
        this.updateForm.newVersion = index.row.newVersion
        this.updateForm.updateTips = index.row.updateTips
        this.updateAppVisible = true
      },
      handleChangeUpdate(file) {
        this.updateForm.file = [file]
      },
      beforeUpdate(file) {
        const fd = new FormData()
        fd.append('file', file)
        fd.append('updateTips', this.updateForm.updateTips)
        fd.append('oldVersion', this.updateForm.oldVersion)
        fd.append('newVersion', this.updateForm.newVersion)
        updateFirmware(this.openId, fd).then(() => {
          this.$message({
            type: 'info',
            message: '编辑固件成功！'
          });
          this.updateAppVisible = false;
          this.getFirmware();
        }).catch(() => {
          this.updateAppVisible = false;
        })
        return false
      },
      appUpdateEnter(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
//            let file = ''
//            if (this.updateForm.file[0].raw) {
//              file = this.updateForm.file[0].raw
//            }
//            updateFirmware(this.openId, file, this.addAppForm.oldVersion, this.addAppForm.newVersion, this.updateForm.updateTips).then(() => {
//              this.$message({
//                type: 'info',
//                message: '编辑固件成功！'
//              });
//              this.updateAppVisible = false;
//              this.openId = -1
//              this.getFirmware();
//            }).catch(() => {
//              this.updateAppVisible = false;
//              this.openId = -1
//            })
            this.$refs.uploadUpdate.submit()
          } else {
//            this.updateAppVisible = false;
            this.openId = -1
            console.log('error submit!!');
            return false;
          }
        });
      },
      clearUpdateForm() {
        if (this.$refs.updateForm)
          this.$refs.updateForm.resetFields();
        this.updateAppVisible = false;
      },
      deleteApp(index) {
        this.openId = index.row.firmwareId
        const h = this.$createElement;
        this.$msgbox({
          title: '删除应用',
          message: h('p', null, '删除后该文件后，未升级的设备将无法继续升级，确认删除吗？'),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              deleteFirmware(this.openId).then(response => {
                if (response.data.code === 1) {
                  done();
                  this.$message({
                    type: 'info',
                    message: '删除成功！'
                  });
                  setTimeout(() => {
                    instance.confirmButtonLoading = false;
                  }, 300);
                }
              }).catch(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              })
            } else {
              done();
            }
          }
        }).then(() => {
          this.openId = -1
          this.getFirmware();
        }).catch(() => {
          this.openId = -1
        });
      },
      getFirmware() {
        let type = 0
        if (this.appTypeSelect === '') {
          type = 0
        } else {
          type = this.appTypeSelect
        }
        firmwareSearch(''
          , type).then(response => {
            this.appList = [];
            response.data.result.content.forEach(item => {
              let typeStr = ''
              if (item.type === 1) {
                typeStr = 'ROM'
              } else if (item.type === 2) {
                typeStr = 'MCU'
              }
              const firmware = new Firmware(item)
              firmware.typeStr = typeStr
              this.appList.push(firmware)
            })
          })
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
