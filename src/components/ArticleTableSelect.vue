<template>
  <div>
    <!-- 按文章标题查询 -->
    <el-dialog
      title="按文章标题查询"
      :visible.sync="articleByTitleVisible"
    >
      <el-form :model="articleForm">
        <el-form-item
          label="博文标题"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="articleForm.title"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="articleByTitleVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="getArticleByTitle"
          icon="el-icon-search"
        >查询</el-button>
      </div>
    </el-dialog>
    <!-- 按文章分类查询 -->
    <el-dialog
      title="按文章分类查询"
      :visible.sync="articleByClassifyVisible"
    >
      <el-form :model="articleForm">
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
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="articleByClassifyVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="getArticleByClassify"
          icon="el-icon-search"
        >查询</el-button>
      </div>
    </el-dialog>
    <!-- 按状态查询 -->
    <el-dialog
      title="按文章状态查询"
      :visible.sync="articleByDeletedVisible"
    >
      <el-form :model="articleForm">
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
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="articleByDeletedVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="getArticleByDeleted"
          icon="el-icon-search"
        >查询</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="按文章状态及分类查询"
      :visible.sync="articleByDeletedAndClassifyVisible"
    >
      <el-form :model="articleForm">
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
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="articleByDeletedAndClassifyVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="getArticleByDeletedAndClassify"
          icon="el-icon-search"
        >查询</el-button>
      </div>
    </el-dialog>
    <!-- 查询按钮 -->
    <el-row class="select_button">
      <el-button
        type="primary"
        @click="articleByTitleVisible = true"
      >按标题查询</el-button>
      <el-button
        type="primary"
        @click="articleByClassifyVisible = true"
      >按分类查询</el-button>
      <el-button
        type="primary"
        @click="articleByDeletedVisible = true"
      >按状态查询</el-button>
      <el-button
        type="primary"
        @click="articleByDeletedAndClassifyVisible = true"
      >按状态及分类查询</el-button>
    </el-row>
    <el-table
      :data="tableData"
      border
      v-loading="loading"
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
  name: 'ArticleTableSelect',
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
      loading: false,
      articleByTitleVisible: false,
      articleByClassifyVisible: false,
      articleByDeletedVisible: false,
      articleByDeletedAndClassifyVisible: false,
      articleForm: {
        title: '',
        classify: '',
        deleted: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    getArticleByTitle: function () {
      this.loading = true
      console.log(this.articleForm.title)
      let params = { 'title': this.articleForm.title }
      https.fetchGet('/article/{title}', params).then((res) => {
        this.tableData = res.data.data
        console.log('this.tableData', this.tableData)
        this.articleByTitleVisible = false
      })
      this.loading = false
    },
    getArticleByClassify: function () {
      this.loading = true
      console.log(this.articleForm.id)
      let params = { 'classify': this.articleForm.classify }
      https.fetchGet('/article/{classify}', params).then((res) => {
        this.tableData = res.data.data
        console.log('this.tableData', this.tableData)
        this.articleByClassifyVisible = false
      })
      this.loading = false
    },
    getArticleByDeleted: function () {
      this.loading = true
      console.log(this.articleForm.deleted)
      let params = { 'deleted': this.articleForm.deleted }
      https.fetchGet('/article/{deleted}', params).then((res) => {
        this.tableData = res.data.data
        console.log('this.tableData', this.tableData)
        this.articleByDeletedVisible = false
      })
      this.loading = false
    },
    getArticleByDeletedAndClassify: function () {
      this.loading = true
      console.log(this.articleForm.deleted)
      let params = { 'deleted': this.articleForm.deleted, 'classify': this.articleForm.classify }
      https.fetchGet('/article/{deleted}/{classify}', params).then((res) => {
        this.tableData = res.data.data
        console.log('this.tableData', this.tableData)
        this.articleByDeletedAndClassifyVisible = false
      })
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
    https.fetchGet('/classify', null).then((res) => {
      this.classify = res.data.data
      console.log('this.classify', this.classify)
    })
  }
}
</script>
<style lang="less" scoped>
.select_button {
  margin-bottom: 20px;
}
</style>
