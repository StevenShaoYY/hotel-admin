<template>
  <div>
    <div class="search_header">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-select v-model="appTypeSelect" placeholder="按应用类型筛选" @change="changeAppType">
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
          prop="appName"
          label="文件名">
        </el-table-column>
        <el-table-column
          label="应用类型"
          prop="appTypeStr">
        </el-table-column>
        <el-table-column
          prop="versionName"
          label="版本号">
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
    <!--<el-dialog title="上传新应用" :visible.sync="uploadNewVisible" :before-close="clearForm">-->
      <!--<div>-->
        <!--<el-form ref="addAppForm" :rules="rulesAddApp" :model="addAppForm" label-width="80px">-->
          <!--<el-form-item label="应用类型" prop="appType">-->
            <!--<el-radio class="radio" v-model="addAppForm.appType" label="1">登记客户端</el-radio>-->
            <!--<el-radio class="radio" v-model="addAppForm.appType" label="2">MDM客户端</el-radio>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="选择文件" prop="appFile">-->
            <!--<el-upload-->
              <!--ref="upload"-->
              <!--action="www.baidu.com"-->
              <!--:file-list="addAppForm.appFile"-->
              <!--:auto-upload="false"-->
              <!--:multiple="false"-->
              <!--:on-change="handleChange">-->
              <!--<el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
            <!--</el-upload>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="更新说明" prop="updateTips">-->
            <!--<el-input v-model="addAppForm.updateTips"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item>-->
            <!--<el-button type="primary" @click="appAddEnter('addAppForm')">提交</el-button>-->
            <!--<el-button @click="resetForm('addAppForm')">重置</el-button>-->
          <!--</el-form-item>-->
        <!--</el-form>-->
      <!--</div>-->
    <!--</el-dialog>-->

    <el-dialog title="上传新应用" :visible.sync="uploadNewVisible" :before-close="clearForm">
      <div>
        <el-form ref="addAppForm" :rules="rulesAddApp" :model="addAppForm" label-width="80px">
          <el-form-item label="应用类型" prop="appType">
            <el-radio class="radio" v-model="addAppForm.appType" label="1">登记客户端</el-radio>
            <el-radio class="radio" v-model="addAppForm.appType" label="2">MDM客户端</el-radio>
          </el-form-item>
          <el-form-item label="选择文件" prop="appFile">
            <el-upload
              ref="uploadApp"
              :before-upload="beforeUpload"
              :action="uploadUrl"
              :auto-upload="false"
              :multiple="false"
              :on-change="handleChange"
              >
              <!--:file-list="addAppForm.appFile"-->
              <!--:data="formSubmitData"-->
              <!--:on-change="handleChange"-->
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
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
            <el-radio class="radio" disabled v-model="updateForm.appType" label="1" >登记客户端</el-radio>
            <el-radio class="radio" disabled v-model="updateForm.appType" label="2">MDM客户端</el-radio>
          </el-form-item>
          <el-form-item label="选择文件" prop="appFile">
            <el-upload
              ref="uploadUpdate"
              action="www.baidu.com"
              :auto-upload="false"
              :before-upload="beforeUpdate"
              :multiple="false"
              :on-change="handleChangeUpdate">
              <!--:file-list="updateForm.appFile"-->
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
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
  import { appSearch, appUpload, updateApp, deleteApp } from 'api/appManage'
  import App from 'common/js/app'
  export default {
    props: {},
    created() {
      this.getApp()
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
        uploadUrl: 'useless',
        options: [{
          value: 1,
          label: '登记客户端'
        }, {
          value: 2,
          label: 'MDM客户端'
        }],
        addAppForm: {
          appType: '1',
          appFile: [],
          updateTips: ''
        },
        updateForm: {
          appType: '1',
          appFile: [],
          updateTips: ''
        },
        uploadNewVisible: false,
        updateAppVisible: false,
        appList: [],
        appTypeSelect: '',
        rulesAddApp: {
          appFile: [{ validator: validateFile, trigger: 'change' }],
          updateTips: [{ required: true, message: '请输入更新说明', trigger: 'blur' }]
        },
        rulesupdateApp: {
          appFile: [{ validator: validateFile, trigger: 'change' }],
          updateTips: [{ required: true, message: '请输入更新说明', trigger: 'blur' }]
        },
        openId: -1
      }
    },
//    computed: {
//      formSubmitData() {
//        return { appType: this.addAppForm.appType, updateTips: this.addAppForm.updateTips }
//      }
//    },
    methods: {
      addApp() {
        this.uploadNewVisible = true
      },
      handleChange(file) {
        this.addAppForm.appFile = [file]
      },
      beforeUpload(file) {
        const fd = new FormData()
        fd.append('appFile', file)
        fd.append('appType', this.addAppForm.appType)
        fd.append('updateTips', this.addAppForm.updateTips)
        appUpload(fd).then(() => {
          this.$message({
            type: 'info',
            message: '上传应用成功！'
          });
          this.uploadNewVisible = false;
          this.getApp();
        }).catch(() => {
          this.uploadNewVisible = false;
          this.openId = -1
        })
        return false
      },
      appAddEnter(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
//            appUpload(this.addAppForm.appType, this.addAppForm.appFile[0].raw, this.addAppForm.updateTips).then(() => {
//              this.$message({
//                type: 'info',
//                message: '上传应用成功！'
//              });
//              this.uploadNewVisible = false;
//              this.getApp();
//            }).catch(() => {
//              this.uploadNewVisible = false;
//            })
//            this.formSubmitData = { appType: this.addAppForm.appType, updateTips: this.addAppForm.updateTips }

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
        this.getApp();
      },
      appUpdate(index) {
        this.openId = index.row.applicationId
        this.updateForm.appType = index.row.appType + ''
        this.updateForm.appFile.push({ name: index.row.appName })
        this.updateForm.updateTips = index.row.updateTips
        this.updateAppVisible = true
      },
      handleChangeUpdate(file) {
        this.updateForm.appFile = [file]
      },
      beforeUpdate(file) {
        const fd = new FormData()
        fd.append('appFile', file)
        fd.append('updateTips', this.updateForm.updateTips)
        updateApp(this.openId, fd).then(() => {
          this.$message({
            type: 'info',
            message: '编辑应用成功！'
          });
          this.updateAppVisible = false;
          this.getApp();
        }).catch(() => {
          this.updateAppVisible = false;
        })
        return false
      },
      appUpdateEnter(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
//            let file = ''
//            if (this.updateForm.appFile[0].raw) {
//              file = this.updateForm.appFile[0].raw
//            }
//            updateApp(this.openId, file, this.updateForm.updateTips).then(() => {
//              this.$message({
//                type: 'info',
//                message: '编辑应用成功！'
//              });
//              this.updateAppVisible = false;
//              this.openId = -1
//              this.getApp();
//            }).catch(() => {
//              this.updateAppVisible = false;
//              this.openId = -1
//            })
            this.$refs.uploadUpdate.submit()
          } else {
//            this.updateAppVisible = false;
//            this.openId = -1
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
        this.openId = index.row.applicationId
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
              deleteApp(this.openId).then(response => {
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
          this.getApp();
        }).catch(() => {
          this.openId = -1
        });
      },
      getApp() {
        let appType = 0
        if (this.appTypeSelect === '') {
          appType = 0
        } else {
          appType = this.appTypeSelect
        }
        appSearch(''
          , appType).then(response => {
            this.appList = [];
            response.data.result.content.forEach(item => {
              let appTypeStr = ''
              if (item.appType === 1) {
                appTypeStr = '登记客户端'
              } else if (item.appType === 2) {
                appTypeStr = 'MDM客户端'
              }
              const app = new App(item)
              app.appTypeStr = appTypeStr
              this.appList.push(app)
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
