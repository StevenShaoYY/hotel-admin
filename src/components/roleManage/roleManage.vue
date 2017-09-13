<template>
  <div>
    <div class="search_header">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-input
            placeholder="搜索角色名、备注"
            icon="search"
            v-model="searchBoxInput"
            :on-icon-click="searchMessage">
          </el-input>
        </el-col>
        <el-col :span="3" :offset="15">
          <el-button @click="addRole" type="primary">添加角色</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="box_manage_main">
      <el-table
        :data="roleList"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="角色名">
        </el-table-column>
        <el-table-column
          label="角色权限"
          prop="moduleNameStr">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="100">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="修改日期">
        </el-table-column>
        <el-table-column
          prop="modifyPerson"
          label="修改人"
          width="195">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="350">
          <template scope="scope">
            <el-button
              @click.native.prevent="updateRole(scope)"
              type="text"
              size="small">
              编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteRole(scope)"
              type="text"
              size="small">
              删除
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
    </div>
</template>

<script type="text/ecmascript-6">
  import Role from 'common/js/role'
  import { searchRoleList } from 'api/roleManage'
  export default {
    props: {},
    created() {
      this.getRole(this.pageSize, this.currentPage);
    },
    data() {
      return {
        searchBoxInput: '',
        roleList: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1,
        openId: -1
      }
    },
    methods: {
      addRole() {
        console.log(111)
      },
      updateRole(index) {
        console.log(index);
      },
      deleteRole(index) {
        console.log(index);
      },
      searchMessage() {
        this.currentPage = 1
        this.getRole(this.pageSize, 1)
      },
      getRole(pageSize, currentPage) {
        searchRoleList(this.searchBoxInput
          , pageSize
          , currentPage).then(response => {
            this.roleList = [];
            this.totalCount = response.data.result.totalCount;
            response.data.result.content.forEach(item => {
              const moduleNameList = []
              item.module = JSON.parse(item.module);
              item.module.forEach(item => {
                moduleNameList.push(item.name)
              })
              const role = new Role(item)
              role.moduleNameStr = moduleNameList.join(',')
              this.roleList.push(role)
            })
          })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getRole(val, this.currentPage)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getRole(this.pageSize, val)
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
