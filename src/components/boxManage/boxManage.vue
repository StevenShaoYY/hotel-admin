<template>
    <div class="box_wrapper">
      <el-table
        :data="boxList"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          v-if="isShowSelect"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="serialNumber"
          label="设备序列号"
          width="150">
          <template scope="scope">
            <el-button
              @click.native.prevent="showDetail(scope)"
              type="text"
              size="small">
              {{scope.row.serialNumber}}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="boxName"
          label="设备类型"
          width="100">
        </el-table-column>
        <el-table-column
          label="设备状态"
          width="100"
          >
          <template scope="scope">
              <el-tag :type="scope.row.tagType">{{ scope.row.boxStatus }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="clientVersion"
          label="客户端版本">
        </el-table-column>
        <el-table-column
          prop="mdmVersion"
          label="MDM版本">
        </el-table-column>
        <el-table-column
          prop="registrationTIme"
          label="注册时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="启动时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="reportTime"
          label="报告时间"
          width="180">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="350">
          <template scope="scope">
            <el-button
              @click.native.prevent="showDetail(scope)"
              type="text"
              size="small">
              应用升级
            </el-button>
            <el-button
              @click.native.prevent="showDetail(scope)"
              type="text"
              size="small">
              固件升级
            </el-button>
            <el-button
              @click.native.prevent="reStart(scope)"
              type="text"
              size="small">
              重启
            </el-button>
            <el-button
              @click.native.prevent="disAttach(scope)"
              type="text"
              size="small">
              解绑
            </el-button>
            <el-button
              @click.native.prevent="dismiss(scope)"
              type="text"
              size="small">
              注销
            </el-button>
            <el-button
              @click.native.prevent="DeteleBox(scope)"
              type="text"
              size="small">
              删除
            </el-button>
            <el-button
              @click.native.prevent="showLog(scope)"
              type="text"
              size="small">
              日志
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagenation_wrapper">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Box from 'common/js/box'
  import { getBoxList, restartBox, disAttachBox, dissmissBox, deleteBox } from 'api/boxManage'
  export default {
    props: {
      hotelCode: {
        type: String,
        default: ''
      },
      isShowSelect: {
        type: Boolean,
        default: false
      }
    },
    created() {
      this.getBoxList(this.pageSize, this.currentPage)
    },
    data() {
      return {
        boxList: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    methods: {
      getBoxList(pageSize, currentPage) {
        getBoxList(this.hotelCode, pageSize, currentPage).then(response => {
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
          })
        })
      },
      handleSelectionChange(val) {
        this.$emit('boxManageSelected', val)
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getBoxList(val, this.currentPage)
      },
      handleCurrentChange(val) {
        this.getBoxList(this.pageSize, val)
      },
      showDetail(index) {
        this.$emit('showDetail', { id: index.row.id, showDetail: true })
      },
      showLog(index) {
        this.$emit('showLog', { id: index.row.id, showLog: true })
      },
      reStart(index) {
        const h = this.$createElement;
        this.$msgbox({
          title: '重启设备',
          message: h('p', null, [
            h('p', null, [
              h('span', null, '设备序列号： '),
              h('span', null, index.row.serialNumber)
            ]),
            h('p', null, [
              h('span', null, '旅馆代码：   '),
              h('span', null, index.row.hotelCode)
            ]),
            h('p', null, [
              h('span', null, '旅馆名称：   '),
              h('span', null, index.row.hotelName)
            ]),
            h('p', null, [
              h('span', null, '确认重启？ ')
            ])
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              restartBox().then(response => {
                if (response.data.code === 1) {
                  done();
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
          this.$message({
            type: 'info',
            message: '重启成功！'
          });
        }).catch(() => {
          console.log('cancle')
        });
      },
      disAttach(index) {
        const h = this.$createElement;
        this.$msgbox({
          title: '解绑设备',
          message: h('p', null, [
            h('p', null, [
              h('span', null, '设备序列号： '),
              h('span', null, index.row.serialNumber)
            ]),
            h('p', null, [
              h('span', null, '旅馆代码：   '),
              h('span', null, index.row.hotelCode)
            ]),
            h('p', null, [
              h('span', null, '旅馆名称：   '),
              h('span', null, index.row.hotelName)
            ]),
            h('p', null, [
              h('span', null, '该设备被解绑后，用户将无法继续登录使用其功能，确认解绑吗？ ')
            ])
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              disAttachBox().then(response => {
                if (response.data.code === 1) {
                  done();
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
          this.$message({
            type: 'info',
            message: '解绑成功！'
          });
        });
      },
      dismiss(index) {
        const h = this.$createElement;
        this.$msgbox({
          title: '注销设备',
          message: h('p', null, [
            h('p', null, [
              h('span', null, '设备序列号： '),
              h('span', null, index.row.serialNumber)
            ]),
            h('p', null, [
              h('span', null, '旅馆代码：   '),
              h('span', null, index.row.hotelCode)
            ]),
            h('p', null, [
              h('span', null, '旅馆名称：   '),
              h('span', null, index.row.hotelName)
            ]),
            h('p', null, [
              h('span', null, '该设备被注销后，用户将无法继续登录使用其功能，确认注销吗？')
            ])
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              dissmissBox().then(response => {
                if (response.data.code === 1) {
                  done();
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
          this.$message({
            type: 'info',
            message: '注销成功！'
          });
        });
      },
      DeteleBox(index) {
        const h = this.$createElement;
        this.$msgbox({
          title: '删除设备',
          message: h('p', null, [
            h('p', null, [
              h('span', null, '设备序列号： '),
              h('span', null, index.row.serialNumber)
            ]),
            h('p', null, [
              h('span', null, '旅馆代码：   '),
              h('span', null, index.row.hotelCode)
            ]),
            h('p', null, [
              h('span', null, '旅馆名称：   '),
              h('span', null, index.row.hotelName)
            ]),
            h('p', null, [
              h('span', null, '确认删除吗？ ')
            ])
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              deleteBox().then(response => {
                if (response.data.code === 1) {
                  done();
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
          this.$message({
            type: 'info',
            message: '删除成功！'
          });
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .box_wrapper
    .pagenation_wrapper
      margin-top 10px
      margin-bottom 20px
</style>
