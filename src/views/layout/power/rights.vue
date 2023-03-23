<template>
  <div class="rights-container">
    <el-card class="box-card">
      <!-- {
      "id": 102,
      "authName": "订单管理",
      "level": "0",
      "pid": 0,
      "path": "orders"
  } -->
      <el-table :data="RightsList" border>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="{row}">
            <el-tag :type="row.level == 0 ? 'info' : row.level == 1 ? 'success' : 'danger'">
              {{ row.level == 0 ? '等级1' : row.level == 1 ? '等级2' : '等级3' }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column label="权限名称" prop="authName"></el-table-column> -->
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { getRightsListAPI } from "@/api/power.js"
export default {
  components: {},
  name: "rights",
  props: [],
  data() {
    return {
      RightsList: []
    };
  },
  methods: {
    async getRightsList() {
      try {
        this.RightsList = await getRightsListAPI()
        console.log(this.RightsList);
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    //获取权限列表数据
    this.getRightsList()
  },
  mounted() { },
};
</script>
<style lang='less' scpoed></style>