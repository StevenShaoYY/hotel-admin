<template>
  <div class="hotel_manage">
    <div class="search_wrapper">
      <el-input
        placeholder="搜索旅馆代码、名称、地址、负责人、电话"
        icon="search"
        v-model="input2"
        :on-icon-click="searchData">
      </el-input>
    </div>
    <div class="table_wrapper">
      <el-table
        :data="hotelList"
        border
        style="width: 100%">
        <el-table-column
          prop="hotelCode"
          label="旅馆代码"
          width="200">
        </el-table-column>
        <el-table-column
          prop="hotelName"
          label="旅馆名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="hotelAddress"
          label="旅馆地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="totalRooom"
          label="房间数"
          width="200">
        </el-table-column>
        <el-table-column
          prop="totalBed"
          label="床位数"
          width="200">
        </el-table-column>
        <el-table-column
          prop="hotelManager"
          label="旅馆负责人"
          width="200">
        </el-table-column>
        <el-table-column
          prop="contactNumber"
          label="联系电话"
          width="200">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="168">
          <template scope="scope">
            <el-button @click="watchDetail(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
  import { searchHotel } from 'api/hotelManage'
  import Hotel from 'common/js/hotel'
  export default {
    props: {},
    created() {
      this.getTableData('', this.pageSize, this.currentPage)
    },
    data() {
      return {
        hotelList: [],
        input2: '',
        totalCount: 0,
        pageSize: 15,
        currentPage: 1
      }
    },
    methods: {
      getTableData(searchVal, pageSize, currentPage) {
        searchHotel(searchVal, pageSize, currentPage).then(response => {
          this.hotelList = [];
          this.totalCount = response.data.result.totalCount;
          response.data.result.content.forEach(item => {
            const hotel = new Hotel(item)
            this.hotelList.push(hotel)
          })
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getTableData(this.input2, val, this.currentPage)
      },
      handleCurrentChange(val) {
        this.getTableData(this.input2, this.pageSize, val)
      },
      searchData() {
        this.currentPage = 1;
        this.getTableData(this.input2, this.pageSize, this.currentPage)
      },
      watchDetail(row) {
        this.$router.push({ path: 'hotel_detail', query: { hotelCode: row.hotelCode } })
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .hotel_manage
    .search_wrapper
      width 50%
      height 50px
      margin-left 5%
    .table_wrapper
      width 96%
      margin-left 2%
    .pagenation_wrapper
      margin-top 20px
      margin-left 2%
      margin-bottom 30px
</style>
