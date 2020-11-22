<template>
  <div>
    <!-- 按文章 Id 查询 -->
    <el-dialog
      title="按文章 Id 查询"
      :visible.sync="articleByIdVisible"
    >
      <el-form :model="commentForm">
        <el-form-item
          label="博文 Id"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="commentForm.id"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="articleByIdVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="articleById"
          icon="el-icon-search"
        >查询</el-button>
      </div>
    </el-dialog>
    <!-- 添加文章评论 -->
    <el-dialog
      title="回复评论"
      :visible.sync="commentEditVisible"
    >
      <el-form :model="commentForm">
        <el-form-item
          label="博文 ID"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="commentForm.aid"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="父评论 ID"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="commentForm.fid"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="评论内容"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            v-model="commentForm.content"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="articleByIdVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="commentEdit"
          icon="el-icon-edit"
        >回复</el-button>
      </div>
    </el-dialog>
    <el-row class="select_button">
      <el-button
        type="primary"
        @click="articleByIdVisible = true"
      >按文章 Id 查询</el-button>
    </el-row>
    <el-collapse
      v-loading="loading"
      accordion
      v-for="(item, index) in tableData"
      :key="index"
    >
      <el-collapse-item
        v-if="item.id == undefined ? false: true"
        :title="item.fid === 0 ? '评论(' + item.id + '): ' : '评论(' + item.id + ') 回复 评论(' + item.fid + '): '"
      >
        <div>{{item.content}}</div>
        <div class="action_button">回复时间: {{ dateFormat(item.gmtCreate) }}</div>
        <el-row class="action_button">
        <!--  <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            style="margin-left: 10px"
          ></el-button> -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            circle
            @click="commentEditShow(item.aid, item.fid)"
          ></el-button>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import https from '../http.js' // 注意用自己的 http.js 文件路径

import moment from 'moment' // 日期格式化

export default {
  name: 'CommentTable',
  data () {
    return {
      code: '',
      msg: '',
      tableData: [{}],
      loading: false,
      articleByIdVisible: false,
      commentEditVisible: false,
      commentForm: {
        id: '',
        aid: '',
        fid: '',
        content: ''
      },
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
      formLabelWidth: '120px'
    }
  },
  methods: {
    commentEditShow: function (aid, fid) {
      this.commentForm.aid = aid
      this.commentForm.fid = fid
      this.commentEditVisible = true
    },
    commentEdit: function () {
      let params = this.commentForm
      https.fetchPost('/comment', params).then((res) => {
        console.log(res.data.data)
        if (res.data.data === true) {
          this.$message({
            type: 'success',
            message: '评论成功！'
          })
          this.articleById()
        } else {
          this.$message({
            type: 'info',
            message: '评论失败！'
          })
        }
      })
      this.commentEditVisible = false
    },
    articleById: function () {
      let params = { 'aid': this.commentForm.id }
      https.fetchGet('/comment/{aid}', params).then((res) => {
        this.tableData = res.data.data
        console.log('this.tableData', this.tableData)
        this.articleByIdVisible = false
        this.loading = false
      })
    },
    dateFormat: function (date) {
      if (date === undefined) { return '' }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    }
  }
  // mounted: function () {
  //   let params = { 'aid': 5 }
  //   https.fetchGet('/comment/{aid}', params).then((res) => {
  //     this.tableData = res.data.data
  //     console.log('this.tableData', this.tableData)
  //     this.loading = false
  //   })
  // }
}
</script>
<style lang="less" scoped>
.select_button {
  margin-bottom: 20px;
}
.action_button {
  padding-right: 20px;
  display: flex;
  flex-direction: row-reverse;
}
</style>
