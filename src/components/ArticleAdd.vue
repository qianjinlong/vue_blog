<template>
  <div>
    <!-- 添加文章 -->
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
      <el-form-item
        label="博文分类"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="articleForm.classify"
          placeholder="请选择分类"
          size="100%"
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
      <el-form-item :label-width="formLabelWidth">
        <el-button
          type="primary"
          @click="articleAdd"
        ><i class="el-icon-edit"></i> 添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import https from '../http.js' // 注意用自己的 http.js 文件路径

export default {
  name: 'ArticleEdit',
  data () {
    return {
      code: '',
      msg: '',
      data: '',
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
    articleAdd: function () {
      let params = this.articleForm
      https.fetchPost('/article', params).then((res) => {
        console.log(res.data.data)
        if (res.data.data === true) {
          this.$message({
            type: 'success',
            message: '添加成功！'
          })
        } else {
          this.$message({
            type: 'info',
            message: '添加失败！'
          })
        }
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
</style>
