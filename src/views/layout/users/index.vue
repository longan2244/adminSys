<template>
  <div class="user-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row :gutter="10">
          <el-col :span="10">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="10">
            <el-button @click="search" type="primary">搜索</el-button>
            <el-button @click="dialogadduser = !dialogadduser" type="primary">添加</el-button>
          </el-col>
        </el-row>
      </div>

      <el-table :data="usersList" style="width: 100%" border>
        <el-table-column type="index" width="auto" label="#"></el-table-column>
        <el-table-column prop="id" label="id" width="120"></el-table-column>
        <el-table-column prop="role_name" label="role_name" width="120"></el-table-column>
        <el-table-column prop="username" label="username" width="120"></el-table-column>
        <el-table-column prop="create_time" label="create_time" width="120"></el-table-column>
        <el-table-column prop="mobile" label="mobile" width="120"></el-table-column>
        <el-table-column prop="email" label="email" width="180"></el-table-column>
        <el-table-column label="mg_state" width="120">
          <template slot-scope="{ row }">
            <el-switch v-model="row.mg_state" active-color="#13ce66" @change="change(row, $event)"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="auto">
          <template slot-scope="{row}">
            <el-button type="primary" @click="getuser_row(row)" icon="el-icon-edit"></el-button>
            <el-button type="danger" @click="deluser_row(row)" icon="el-icon-delete"></el-button>

            <el-tooltip class="item" effect="dark" content="分配角色" placement="right-start">
              <el-button type="success" icon="el-icon-set-up"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <br>
      <br>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1, 2, 3, 5]"
        :current-page="Listconfig.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" append-to-body :visible.sync="dialogadduser">
      <el-form :model="adduserform" :rules="adduserrules" ref="adduserfromRef">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="adduserform.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="adduserform.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="adduserform.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="adduserform.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogadduser = false">取 消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加用户对话框结束 -->
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" append-to-body :visible.sync="dialogedituser">
      <el-form :model="selectuserinfo" :rules="adduserrules" ref="edit_row_userfromRef">
        <el-form-item label="用户名">
          <el-input disabled v-model="selectuserinfo.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="selectuserinfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="selectuserinfo.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogedituser = false">取 消</el-button>
        <el-button type="primary" @click="edituser_row">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 对话框结束 -->
  </div>
</template>
<script>
import Zztools from 'zhao-tools'
import { deleteuser_row_API, edituserinfo_row_API, getuserinfo_rowAPI, getusersListAPI, updata_mg_stateAPI, adduserAPI } from '@/api/index.js'

export default {
  components: {},
  name: "user",
  props: [],
  data() {
    const rulesemail = (rules, value, callback) => {
      try {
        if (!value) {
          return callback(new Error('邮箱格式不能为空'));
        }
        let res = Zztools.z_regex.validate({
          'email': value
        }).email
        if (!res) {
          return callback(new Error('邮箱格式不正确'));
        }
        if (res) {
          return callback();
        }
      } catch (error) {
        return callback(new Error(error));
      }

    }
    const rulesmobile = (rules, value, callback) => {
      try {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        }
        let res = Zztools.z_regex.validate({
          'phone': value
        }).phone
        if (!res) {
          return callback(new Error('手机号格式不正确'));
        }
        if (res) {
          return callback();
        }
      } catch (error) {
        return callback(new Error(error));
      }

    }
    return {
      adduserform: {
      },
      adduserrules: {
        username: [{ required: true, message: '用户名称不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '用户密码不能为空', trigger: 'blur' }],
        email: [{ required: true, validator: rulesemail, trigger: 'blur' }],
        mobile: [{ required: true, validator: rulesmobile, trigger: 'blur' }],
      },
      Listconfig: {
        query: '',
        pagenum: 1,
        pagesize: 1,
      },
      total: 0,
      input: '',
      usersList: [],
      dialogadduser: false,
      dialogedituser: false,
      selectuserinfo: {
        email: '',
        mobile: '',
        username: ''
      }

    };
  },
  methods: {
    // 删除单条用户信息
    async deluser_row(row) {
      try {
        await deleteuser_row_API(row.id)
        let data = await getuserinfo_rowAPI(row.id)
        console.log(data);
        this.getusersList()
      } catch (error) {
        console.log(error);
      }
    },
    //修改单条用户信息
    async edituser_row() {
      try {
        await new Promise((resolve, rejects) => {
          this.$refs.edit_row_userfromRef.validate(res => {
            if (res) {
              resolve(res)
            }
            rejects(res)
          })
        })
        let data = await edituserinfo_row_API(this.selectuserinfo)
        this.getusersList()
        this.dialogedituser = !this.dialogedituser
      } catch (error) {
        console.log(error);
      }

      // dialogedituser
    },
    //获取单条用户信息
    async getuser_row(row) {
      this.dialogedituser = !this.dialogedituser
      try {
        let data = await getuserinfo_rowAPI(row.id)
        this.selectuserinfo = data
      } catch (error) {
        console.log(error);
      }
    },
    //添加
    async adduser() {
      try {
        await new Promise((resolve, rejects) => {
          this.$refs.adduserfromRef.validate(res => {
            if (res) {
              resolve(res)
            }
            rejects(res)
          })
        })
        let data = await adduserAPI(this.adduserform)
        this.dialogadduser = !this.dialogadduser
        this.adduserform = {}
        this.getusersList()
      } catch (error) {
        console.log(error);
      }
      // console.log(this.adduserform);
    },
    //搜索
    search() {
      this.Listconfig.query = this.input
      this.getusersList()
    },
    //条数
    handleSizeChange(e) {
      this.Listconfig.pagesize = e
      this.getusersList()
    },
    //页码值
    handleCurrentChange(e) {
      this.Listconfig.pagenum = e
      this.getusersList()
    },
    //状态切换
    async change(item, e) {
      try {
        await updata_mg_stateAPI(item.id, e)
      } catch (error) {
        console.log(error);
      }
    },
    //获取用户
    async getusersList() {
      try {
        let data = await getusersListAPI(this.Listconfig)
        this.total = data.total
        this.usersList = data.users
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getusersList()
  },
  mounted() { },
};
</script>
<style lang='less' scpoed></style>