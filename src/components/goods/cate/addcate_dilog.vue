<template>
  <div class="addcate">
    <el-form :model="addcate_Form" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旗下">
        <el-cascader clearable size="medium" v-model="value" :options="options" :props="Props"></el-cascader>
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="addcate_Form.cat_name"></el-input>

      </el-form-item>
    </el-form>
    <el-row type="flex" justify="end">
      <el-button type="primary" @click="addcateList">确 定</el-button>
    </el-row>
  </div>
</template>
<script>
import { getcateListAPI, addcateListAPI } from '@/api/goods/cate.js'
export default {
  components: {},
  name: "addcate",
  props: [],
  data() {
    return {
      addcate_Form: {
        cat_name: '',  //分类名称
        cat_pid: 0,  // | 分类父 ID 不能为空，如果要添加1级分类，则父分类Id应该设置为  `0`    
        cat_level: 0    //cat_level | 分类层级 不能为空，`0`表示一级分类；`1`表示二级分类；`2`表示三级分类 |
      },
      value: [],
      options: [],
      Props: {
        label: 'cat_name',
        value: 'cat_id',
        children: "children",
        checkStrictly: true
      }
    };
  },
  methods: {
    async addcateList() {
      try {
        if (this.value.length > 0) {
          this.addcate_Form.cat_pid = this.value[this.value.length - 1]
          this.addcate_Form.cat_level = this.value.length
        } else {
          this.addcate_Form.cat_pid = 0
          this.addcate_Form.cat_level = 0
        }
        await addcateListAPI(this.addcate_Form)
        this.$emit('showaddcatedilog', false)
      } catch (error) {

      }
    },
    async getcateList() {
      this.options = await getcateListAPI({ type: 2 });
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
.el-cascader {
  width: 100%;
}
</style>