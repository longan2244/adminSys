<template>
  <div class="goods_params-container">
    <el-card>
      <el-alert title="注意：只能选中三级目录修改" show-icon type="warning">
      </el-alert>
      <br>
      <!-- {{ cateList }} -->
      <el-cascader v-model="value" :options="cateList" :props="Props" @change="handleChange"></el-cascader>
      <el-tabs v-model="activeName" @tab-click="tabonClick">
        <el-button @click="addattributedilog">{{ isattribute }}</el-button>
        <el-tab-pane :disabled="value.length >= 3 ? false : true" label="动态参数many" name="many">
          <el-table :data="manydata" width="100%">
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template #default="{ row }">
                <div>

                  <el-tag :key="index" v-for="(item, index) in row.attr_vals.split(' ')" closable
                    :disable-transitions="false" @close="handleClose(item)">
                    {{ item }}
                  </el-tag>




                  <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                    @keyup.enter.native="handleInputConfirm(row)" @blur="handleInputConfirm(row)">
                  </el-input>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
















                </div>
              </template>
            </el-table-column>
            <el-table-column type="index" width="auto"></el-table-column>
            <el-table-column prop="attr_name" label="参数名称" width="auto">
            </el-table-column>
            <el-table-column label="操作" width="auto">
              <template #default="{ row }">
                <div>
                  <el-button type="primary" size="mini">编辑</el-button>
                  <el-button type="success" size="mini">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :disabled="value.length >= 3 ? false : true" label="静态参数only" name="only">
          <span>only</span>
          <el-table :data="onlydata" width="100%">
            <!-- 展开行 -->
            <el-table-column type="expand">
              <template #default="{ row }">
                <div>
                  {{ row }}
                </div>
              </template>
            </el-table-column>
            <el-table-column type="index" width="auto"></el-table-column>
            <el-table-column prop="attr_name" label="属性名称" width="auto">
            </el-table-column>
            <el-table-column label="操作" width="auto">
              <template #default="{ row }">
                <div>
                  <el-button type="primary" size="mini">编辑</el-button>
                  <el-button type="success" size="mini">删除</el-button>
                </div>
              </template>
            </el-table-column> 
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog :title="isattribute" :visible.sync="attribute_Visible" width="50%">
      <el-form ref="attributeform" :model="addattributeinfo" label-width="80px">
        <el-form-item label="添加">
          <el-input v-model="addattributeinfo.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addattribute">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getcateListAPI } from '@/api/goods/cate.js'
import { getattributesAPI, addattributeAPI } from '@/api/goods/params.js'
export default {
  components: {},
  name: "only",
  props: [],
  data() {
    return {
      attribute_Visible: false,
      activeName: 'many',
      inputVisible: false,
      inputValue: '',
      //商品分类列表
      cateList: [],
      value: [],
      Props: {
        label: 'cat_name',
        value: 'cat_id',
        children: "children",
      },
      manydata: [],
      onlydata: [],
      addattributeinfo: {
        id: '',
        attr_name: '',
        attr_sel: ''
      }
    };
  },
  methods: {
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    //添加标签
    handleInputConfirm(row) {
      console.log(row, this.inputValue);
    },
    //打开添加属性对话框
    addattributedilog() {
      this.attribute_Visible = !this.attribute_Visible
    },
    //添加属性
    async addattribute() {
      try {
        let data = await addattributeAPI(this.addattributeinfo.id, this.addattributeinfo)
        this.handleChange()
        this.attribute_Visible = false
      } catch (error) {
        console.log(error);
      }
    },
    //tab切换
    tabonClick() {
      this.handleChange()
    },
    //级联选择变化会执行这个方法
    async handleChange() {
      if (this.value.length != 3) {
        return this.$message.error('只能选中三级目录')
      }
      let attributesdata = await getattributesAPI(this.value[this.value.length - 1], { sel: this.activeName })
      if (this.activeName == 'many') {
        this.manydata = attributesdata
      } else {
        this.onlydata = attributesdata
      }
    },
    async getcateList() {
      try {
        this.cateList = await getcateListAPI()
      } catch (error) {

      }
    }
  },
  computed: {
    isattribute() {
      this.addattributeinfo.id = this.value[this.value.length - 1]
      this.addattributeinfo.attr_sel = this.activeName
      return this.activeName == "many" ? '添加动态属性' : '添加静态参数'
    }
  },
  watch: {},
  created() {
    this.getcateList()
  },
  mounted() { },
};
</script>
<style lang='less' scpoed></style>