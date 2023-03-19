<template>
  <div class="login-container">
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-card class="box-card">
          <div class="avatar">
            <el-image style="width: 120px; height: 120px; border-radius: 50%;" lazy></el-image>
          </div>
          <el-form ref="loginfromRef" :model="logininfo" :rules="rules">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="logininfo.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-m
              odel="logininfo.password"></el-input>
            </el-form-item>
            <el-from-item>
              <el-button type="primary" @click="uigomain">登录</el-button>
              <el-button type="info" @click="reset">重置</el-button>
            </el-from-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { login } from '@/api/index.js'
export default {
  components: {},
  name: "login",
  props: [],
  data() {
    return {
      logininfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    //重置
    reset() {
      this.$refs.loginfromRef.resetFields()
    },
    //登录
    async uigomain() {
      try {
        await new Promise((resolve, reject) => {
          this.$refs.loginfromRef.validate((e) => {
            if (!e) reject('用户名输入不合法')
            this.$storage.remove('token')
            resolve(e)
          })
        })
        let data = await login(this.logininfo)
        this.$storage.set('token', data.token)
        this.$router.push('/home')
      } catch (error) {
        this.$storage.remove('token')
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.$storage.clear()
  },
  mounted() {

  },
};
</script>
<style lang='less' scpoed>
.login-container {
  padding-top: 12%;

  .box-card {
    padding: 30px;
    border-radius: 16px;

    .avatar {
      text-align: center;
    }
  }
}
</style>