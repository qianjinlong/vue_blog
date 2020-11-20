<template>
  <div style="max-height: 100%;">
    <div class="login">
      <div class="title">
          <span>管理员登陆</span>
      </div>
      <div>
        <el-input
          placeholder="请输入账号"
          v-model="loginForm.account"
          clearable
          class="input_style"
        ></el-input>
      </div>
      <div>
        <el-input
          placeholder="请输入密码"
          v-model="loginForm.password"
          show-password
          class="input_style"
        ></el-input>
      </div>
      <div>
        <el-button
          type="primary"
          @click="login"
          class="login_style"
        >登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import https from '../http.js' // 注意用自己的 http.js 文件路径

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        account: '',
        password: ''
      },
      code: '',
      msg: '',
      data: ''
    }
  },
  methods: {
    login: function () {
      let params = { 'account': this.loginForm.account, 'password': this.loginForm.password }
      https.fetchPost('/login', params).then((data) => {
        this.data = data.data
        console.log('this.data', this.data.data)
        if (this.data.data === true) {
          this.success()
          this.$router.push({ path: '/main' })
        } else {
          this.failed()
        }
      }).catch(err => {
        console.log(err)
      })
    },
    success: function () {
      this.$message({
        message: '登陆成功',
        type: 'success'
      })
    },
    failed: function () {
      this.$message({
        message: '用户名或密码错误！',
        type: 'error'
      })
    }
  }
}
</script>
<style scoped>
.login {
  margin: 0 auto;
  margin-top: 200px;
  width: 220px;
}
.title {
  font-size: 14px;
  border-radius: 5px 5px 0 0;
  height: 30px;
  background-color: #409EFF;
  margin-bottom: 10px;
  color: #FFF;
  text-align: center;
  line-height: 30px;
}
.input_style {
  width: 220px;
  margin-bottom: 10px;
}
.login_style {
  width: 220px;
}
</style>
