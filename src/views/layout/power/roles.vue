<template>
  <div class="roles-container">
    <el-card class="box-card">
      <!-- roles-测试文本 -->
      <input type="text" v-model="addroleinfo.roleName" placeholder="角色名称">
      <input type="text" v-model="addroleinfo.roleDesc" placeholder="角色描述">
      <el-button type="primary" @click="addrole">添加角色</el-button>
      <el-table :data="rolesList">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column type="expand" label="展开">
          <template #default="{ row }">
            <!-- 展开页面 -->
            <el-row v-for="(item1, in1)  in row.children" :key="item1.id" :gutter="20">
              <div class="rolesitem">
                <!-- 一级权限 -->
                <el-col :span="4">
                  <el-tag closable type="info">{{ item1.authName }}</el-tag>
                </el-col>
                <el-col :span="20">
                  <hr>
                  <!-- 二级权限 -->
                  <el-row v-for="(item2, in2) in item1.children" :key="item2.id" :gutter="20">
                    <el-col :span="5">
                      <el-tag closable type="success" :key="item2.id">{{ item2.authName
                      }}</el-tag>

                    </el-col>
                    <!-- 三级权限 -->
                    <el-col :span="14">
                      <!-- {{ rightId权限id item3.id }}{{ roleId角色id row.id }} -->
                      <el-tag @close="handleClose(item3, row.id, row)" closable v-for="(item3, in3) in item2.children "
                        :key="item3.id" type="warning" plain>{{
                          item3.authName }}</el-tag>
                    </el-col>
                  </el-row>

                </el-col>

              </div>
            </el-row>

            <!-- 展开结束 -->
          </template>
        </el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-button type="primary" @click="edituser_row(row)" icon="el-icon-edit"></el-button>
            <el-button type="danger" @click="deluser_row(row)" icon="el-icon-delete"></el-button>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="right-start">
              <el-button type="success" icon="el-icon-set-up" @click="assignment_roles(row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分配权限对话框 -->
    <el-dialog title="提示" :visible.sync="rightsVisible" width="50%">
      <el-tree ref="rightsTree" node-key="id" :default-checked-keys="defKEY" show-checkbox :data="rolesList_tree"
        :props="defaultProps"></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rightsVisible = false">取 消</el-button>
        <el-button type="primary" @click="seedroles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { deleteTheRoleAPI, addroleAPI, getRolesListAPI, delroleAPI, getRightsListAPI, roleAuthorizationAPI } from "@/api/power.js"
export default {
  components: {},
  name: "roles",
  props: [],
  data() {
    return {
      id: '',
      rightsVisible: false,
      rolesList: [],
      rolesList_tree: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      defKEY: [],
      addroleinfo: {}
    };
  },
  methods: {
    //删除角色
    async deluser_row(row) {
      try {
        await deleteTheRoleAPI(row.id)
        this.getRolesList()
      } catch (error) {
        console.log(error);
      }
    },
    //添加角色
    async addrole() {
      try {
        await addroleAPI(this.addroleinfo)
        this.getRolesList()
      } catch (error) {

      }
    },
    //分配权限
    async seedroles() {
      let slect = [...this.$refs.rightsTree.getCheckedKeys(), ...this.$refs.rightsTree.getHalfCheckedKeys()].join(',')
      try {
        await roleAuthorizationAPI(this.id, slect)
        this.getRolesList()
      } catch (error) {

      }

      this.rightsVisible = false
    },
    // 分配权限前
    assignment_roles(row) {
      this.id = row.id
      this.defKEY = []
      this.find3id(row, this.defKEY)
      this.$nextTick(() => {
        this.$refs.rightsTree.setCheckedKeys(this.defKEY)
      })
      this.rightsVisible = !this.rightsVisible
    },
    //递归找将当前用户的三级权限id
    find3id(item, nodeid) {
      if (!item.children) {
        return nodeid.push(item.id)
      }
      item.children.forEach(element => {
        this.find3id(element, nodeid)
      });
    },
    //删除权限
    async handleClose(rightId, roleId, row) {
      try {
        let { id } = rightId;
        let data = await delroleAPI(roleId, id)
        row.children = data
      } catch (error) {
        console.log(error);
      }
    },
    //获取全部权限
    async getRolesList() {
      try {
        this.rolesList = await getRolesListAPI()
      } catch (error) {

      }
    },
    //获取树形权限列表
    async getRolesList_tree() {
      try {
        this.rolesList_tree = await getRightsListAPI('tree')
      } catch (error) {

      }
    }
  },
  computed: {

  },
  watch: {},
  created() {
    this.getRolesList()
    this.getRolesList_tree()
  },
  mounted() { },
};
</script>
<style lang='less' scpoed>
.el-row {
  margin: 10px 0;
  text-align: center;

  .el-col .el-col-14 {
    display: flex;
    flex-wrap: wrap;
    align-items: start;

    .el-tag {
      margin: 8px 10px;
    }
  }
}
</style>