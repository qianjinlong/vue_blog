<template>
  <div>
    <!-- 编辑文章 -->
    <el-dialog
      title="编辑文章"
      :visible.sync="articleEditVisible"
    >
      <el-form :model="articleForm">
        <el-form-item
          label="博文 ID"
          :label-width="formLabelWidth"
        >
          <el-input
            :disabled="true"
            v-model="articleForm.id"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="博文标题"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="articleForm.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="博文分类"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="articleForm.classify"
            placeholder="请选择分类"
          >
            <span
              v-for="(item, index) in classify"
              :key="index"
            >
              <el-option
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </span>
          </el-select>
        </el-form-item>
        <el-form-item
          label="博文内容"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="articleForm.content"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="博文状态"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="articleForm.deleted"
            placeholder="请选择状态"
          >
            <span
              v-for="(item, index) in deleted"
              :key="index"
            >
              <el-option
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </span>
          </el-select>
        </el-form-item>
      </el-form>
      <el-dialog
        width="30%"
        title="警告"
        :visible.sync="makeSureVisible"
        append-to-body
        center
      >
        <span>该记录将被永久修改且不可逆，是否继续?</span>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="makeSureVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="articleEdit"
          ><i class="el-icon-edit"></i> 确认修改</el-button>
        </div>
      </el-dialog>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="articleEditVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="makeSureVisible = true"
        ><i class="el-icon-edit"></i> 修改</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="tableData"
      border
      style="height: 100%"
      v-loading="loading"
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
        <template slot-scope="scope">
          <span
            v-for="(item, index) in classify"
            :key="index"
          >
            {{scope.row.classify == item.id ? item.name : ''}}
          </span>
        </template>
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
            {{scope.row.deleted == false ? '可回收' : '已回收'}}
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
            @click="showArticle(scope.row)"
            type="text"
            size="small"
          >查看</el-button>
          <el-button
            type="text"
            size="small"
            @click="articleEditShow(scope.$index)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="delArticle(scope.$index)"
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
  name: 'ArticleTable',
  data () {
    return {
      code: '',
      msg: '',
      tableData: [{}],
      classify: [{}],
      deleted: [
        {
          id: 0,
          name: '可回收'
        },
        {
          id: 1,
          name: '已回收'
        }
      ],
      loading: true,
      articleEditVisible: false,
      makeSureVisible: false,
      articleForm: {
        id: '',
        title: '',
        classify: '',
        content: '',
        deleted: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    articleEditShow: function (index) {
      this.articleForm = this.tableData[index]
      this.articleForm.deleted = this.tableData[index].deleted === true ? 1 : 0
      console.log(index)
      this.articleEditVisible = true
    },
    articleEdit: function () {
      let params = this.articleForm
      https.fetchPut('/article', params).then((res) => {
        console.log(res.data.data)
        if (res.data.data === true) {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
        } else {
          this.$message({
            type: 'info',
            message: '修改失败！'
          })
        }
      })
      this.makeSureVisible = false
      this.articleEditVisible = false
      this.loading = false
    },
    handleClick: function (row) {
      console.log(row)
    },
    dateFormat: function (row, column) {
      var date = row[column.property]
      if (date === undefined) { return '' }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    showArticle: function (row) {
      this.$alert(row.content, row.title, {
        confirmButtonText: '确定'
      })
    },
    delArticle: function (index) {
      var id = this.tableData[index].id
      console.log(id)
      this.$confirm('此操作将永久删除该记录且不可逆，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = { 'id': id }
        https.fetchDelete('/article/{id}', params).then((res) => {
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
    https.fetchGet('/article', null).then((res) => {
      this.tableData = res.data.data
      console.log('this.tableData', this.tableData)
      https.fetchGet('/classify', null).then((res) => {
        this.classify = res.data.data
        console.log('this.classify', this.classify)
      })
      this.loading = false
    })
  }
}
</script>
<style lang="less" scoped>
</style>
