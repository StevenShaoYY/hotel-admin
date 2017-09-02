<template>
    <div>
      <el-table
        :data="roomList"
        border
        style="width: 100%">
        <el-table-column
          prop="roomNumber"
          label="房号">
        </el-table-column>
        <el-table-column
          prop="floor"
          label="楼层">
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="电话号码">
        </el-table-column>
        <el-table-column
          prop="bedCount"
          label="床位数">
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
  import { getRoomList } from 'api/hotelManage'
  import Room from 'common/js/room'
  export default {
    props: {
      hotelCode: {
        type: String,
        default: ''
      }
    },
    created() {
      this.getRoomList(this.pageSize, this.currentPage);
    },
    data() {
      return {
        roomList: [],
        totalCount: 0,
        pageSize: 10,
        currentPage: 1
      }
    },
    methods: {
      getRoomList(pageSize, currentPage) {
        getRoomList(this.hotelCode, pageSize, currentPage).then(response => {
          this.roomList = [];
          this.totalCount = response.data.result.totalCount;
          response.data.result.content.forEach(item => {
            item.roomNumber = item.roomNumber + '号'
            item.floor = item.floor + '层'
            const user = new Room(item)
            this.roomList.push(user)
          })
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getRoomList(val, this.currentPage)
      },
      handleCurrentChange(val) {
        this.getRoomList(this.pageSize, val)
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .pagenation_wrapper
    margin-top 10px
    margin-bottom 20px
</style>
