<template>
  <el-table
    :data="tableData"
    border
    style="height: 100%"
  >
    <el-table-column
      fixed
      prop="title"
      label="标题"
      width="160"
    >
    </el-table-column>
    <el-table-column
      prop="content"
      label="内容"
      width="200"
      :show-overflow-tooltip='true'
    >
    </el-table-column>
    <el-table-column
      prop="classify"
      label="博文分类"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="gmtCreate"
      label="创建时间"
      :formatter="dateFormat"
      width="200"
    >
    </el-table-column>
    <el-table-column
      prop="praise"
      label="点赞数"
      width="100"
    >
    </el-table-column>
    <el-table-column
      prop="reply"
      label="回复数"
      width="100"
    >
    </el-table-column>
    <el-table-column
      prop="browse"
      label="浏览量"
      width="100"
    >
    </el-table-column>
    <el-table-column
      prop="gmtUpdate"
      label="修改时间"
      :formatter="dateFormat"
      width="200"
    >
    </el-table-column>
    <el-table-column
      prop="deleted"
      label="状态"
      width="100"
    >
      <template slot-scope="scope">
        <el-tag
          plain
          size="mini"
          :type="scope.row.deleted == false ? 'success' : 'warning'"
        >
          {{scope.row.deleted == false ? '可回收' : '已删除'}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="id"
      label="博文Id"
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
          @click="showContent(scope.row)"
          type="text"
          size="small"
        >查看</el-button>
        <el-button
          type="text"
          size="small"
        >编辑</el-button>
        <el-button
          type="text"
          size="small"
          v-if="!scope.row.deleted"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import https from '../http.js' // 注意用自己的 http.js 文件路径

import moment from 'moment' // 日期格式化

export default {
  name: 'ArticleTable',
  data () {
    return {
      code: '',
      msg: '',
      tableData: [{}]
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
    showContent: function (row) {
      this.$alert(row.content, row.title, {
        confirmButtonText: '确定'
      })
    }
  },
  mounted: function () {
    https.fetchGet('/article', null).then((res) => {
      this.tableData = res.data.data
      console.log('this.tableData', this.tableData)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style scoped>
</style>
