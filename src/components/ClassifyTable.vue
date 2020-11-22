<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="height: 100%"
      v-loading="loading"
    >
      <el-table-column
        fixed
        prop="name"
        label="分类标题"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="descr"
        label="描述"
        width="400"
        :show-overflow-tooltip='true'
      >
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="创建时间"
        :formatter="dateFormat"
        width="200"
        v-if="false"
      >
      </el-table-column>
      <el-table-column
        prop="gmtUpdate"
        label="修改时间"
        :formatter="dateFormat"
        width="260"
      >
      </el-table-column>
      <el-table-column
        prop="deleted"
        label="状态"
        width="200"
      >
        <template slot-scope="scope">
          <el-tag
            plain
            size="mini"
            :type="scope.row.deleted == false ? 'success' : 'warning'"
          >
            {{scope.row.deleted == false ? '可回收' : '已回收'}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="分类Id"
        width="100"
        v-if="false"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="delClassify(scope.$index)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import https from '../http.js' // 注意用自己的 http.js 文件路径

import moment from 'moment' // 日期格式化

export default {
  name: 'ClassifyTable',
  data () {
    return {
      code: '',
      msg: '',
      tableData: [{}],
      loading: true
    }
  },
  methods: {
    handleClick: function (row) {
      console.log(row)
    },
    dateFormat: function (row, column) {
      var date = row[column.property]
      if (date === undefined) { return '' }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    delClassify: function (index) {
      var id = this.tableData[index].id
      console.log(id)
      this.$confirm('此操作将永久删除该记录且不可逆，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = { 'id': id }
        https.fetchDelete('/classify/{id}', params).then((res) => {
          console.log(res.data.data)
          if (res.data.data === true) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.tableData.splice(index, 1)
          } else {
            this.$message({
              type: 'info',
              message: '删除失败！'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除！'
        })
      })
    }
  },
  mounted: function () {
    https.fetchGet('/classify', null).then((res) => {
      this.tableData = res.data.data
      console.log('this.tableData', this.tableData)
      this.loading = false
    })
  }
}
</script>
<style lang="less" scoped>
</style>
