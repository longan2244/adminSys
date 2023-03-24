<template>
  <div class="cate-container">
    <el-card>
      <el-button @click="addcate_Visible = !addcate_Visible">添加分类</el-button>
      <br>
      <br>
      <!-- 表格 -->
      <el-tree :show-checkbox="false" node-key="cat_id" :data="cateList" :props="defProps">
        <span slot-scope="{ node, data }">
          <el-tag :type="data.cat_level == 0 ? 'danger' : data.cat_level == 1 ? 'success' : 'warning'">{{ data.cat_level
            ==
            0
            ? '一级分类'
            : data.cat_level == 1 ? '二级分类' : '三级分类' }}</el-tag>
          <span>{{ node.label }}</span>
          <i :class="data.cat_deleted ? 'el-icon-circle-close' : 'el-icon-circle-check'"></i>
          <el-button @click="delcateList(data)" size="mini">
            删除
          </el-button>
        </span>
      </el-tree>
      <!-- 表格结束 -->
      <br>
      <!-- 分页 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum" :page-sizes="[5, 10, 20]" :page-size="5"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <!-- 分页结束  -->
    </el-card>
    <!-- 添加分类 -->
    <el-dialog title="请选择要在哪个目录添加" :visible.sync="addcate_Visible" width="50%">
      <Addcate v-if="addcate_Visible" @showaddcatedilog="showaddcatedilog"></Addcate>
    </el-dialog>
  </div>
</template>
<script>
import { getcateListAPI, delcateListAPI } from '@/api/goods/cate.js'
import Addcate from '@/components/goods/cate/addcate_dilog.vue'
export default {
  components: {
    Addcate
  },
  name: "goods_cate",
  props: [],
  data() {
    return {
      addcate_Visible: false,
      cateList: [],
      defProps: {
        children: 'children',
        label: 'cat_name'
      },
      queryinfo: {
        type: '',
        pagenum: 1,
        pagesize: 5,
      },
      total: 0
    };
  },
  methods: {
    // 删除分类
    async delcateList(node) {
      try {
        await delcateListAPI(node.cat_id)
        this.getcateList()
      } catch (error) {

      }
    },
    showaddcatedilog(e) {
      this.addcate_Visible = e
      this.getcateList()
    },
    handleSizeChange(pagesize) {
      this.queryinfo.pagesize = pagesize
      this.getcateList()
    },
    handleCurrentChange(pagenum) {
      this.queryinfo.pagenum = pagenum
      this.getcateList()
    },
    async getcateList() {
      let data = await getcateListAPI(this.queryinfo)
      this.cateList = data.result
      this.total = data.total
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getcateList()
  },
  mounted() { },
};
</script>
<style lang='less' scpoed>
.cate-container {}
</style>