<template>
  <div>
    <!-- 修改用户信息 -->
    <el-form :model="userForm">
      <el-form-item
        label="用户名称"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="userForm.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="用户邮箱"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="userForm.email"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="用户头像"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="userForm.avatar"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-button
          type="primary"
          @click="userEdit"
        ><i class="el-icon-edit"></i> 修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import https from '../http.js' // 注意用自己的 http.js 文件路径

export default {
  name: 'UserInformation',
  data () {
    return {
      code: '',
      msg: '',
      data: '',
      userForm: {
        name: '',
        email: '',
        avatar: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    userEdit: function () {
      let params = this.userForm
      https.fetchPut('/user', params).then((res) => {
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
    }
  },
  mounted: function () {
    console.log(1111)
    https.fetchGet('/user', null).then((res) => {
      console.log(res.data.data)
      if (res.data.msg === 'error') {
        this.$message({
          type: 'info',
          message: '您还未登陆！没有权限！'
        })
        this.$router.push({ path: '/' })
      } else {
        this.userForm.name = res.data.data.name
        this.userForm.email = res.data.data.email
        this.userForm.avatar = res.data.data.avatar
      }
    })
  }
}
</script>
<style lang="less" scoped>
</style>
