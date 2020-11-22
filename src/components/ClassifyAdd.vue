<template>
  <div>
    <!-- 添加分类 -->
    <el-form :model="classifyForm">
      <el-form-item
        label="分类名称"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="classifyForm.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="分类描述"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="classifyForm.descr"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-button
          type="primary"
          @click="classifyAdd"
        ><i class="el-icon-edit"></i> 添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import https from '../http.js' // 注意用自己的 http.js 文件路径

export default {
  name: 'ClassifyAdd',
  data () {
    return {
      code: '',
      msg: '',
      data: '',
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
      classifyForm: {
        id: '',
        name: '',
        descr: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    classifyAdd: function () {
      let params = this.classifyForm
      https.fetchPost('/classify', params).then((res) => {
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
  }
}
</script>
<style lang="less" scoped>
</style>
