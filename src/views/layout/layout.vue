<template>
  <div class="layout-container">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <el-link type="primary">后台管理系统</el-link>
        <el-button type="danger" plain>退出</el-button>
      </el-header>
      <el-container>
        <!-- 菜单  -->
        <el-aside width="auto">
          <el-menu default-active="110" :collapse="isCollapse" background-color="#545c64" text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item @click="isCollapse = !isCollapse">
              <i :class="isCollapse ? 'el-icon-turn-off ' : 'el-icon-open'"></i>
              <span>{{ isCollapse ? '打开' : '折叠' }}</span>
            </el-menu-item>
            <el-submenu :index="item.id + ''" v-for="item in menusList" :key="item.id">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item :index="item2.id + ''" v-for="item2   in  item.children"
                @click="$router.push('/home/' + item2.path)" :key="item2.id">
                <i class="el-icon-location"></i>
                <span>{{ item2.authName }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- home-路由 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>
<script>
import { getMenusAPI } from "@/api/user.js"

export default {
  components: {},
  name: "layout",
  props: [],
  data() {
    return {
      isCollapse: false,
      menusList: [],
      clickactive: undefined,
    };
  },
  methods: {
    async getMenus() {
      try {
        let data = await getMenusAPI()
        this.menusList = data
        this.$notify({
          title: '登录成功',
          message: '欢迎您',
          type: 'success'
        });
      } catch (error) {
        // console.log(error);
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getMenus()
  },
  mounted() { },
};
</script>
<style lang='less' scpoed>
.layout-container {
  height: 100%;

  .el-container {
    height: 100%;

    .el-header {
      background-color: #545c64;
      display: flex;
      justify-content: space-between;
    }


    .el-aside {
      transition: all .4s;
      background-color: #545c64;
    }
  }
}
</style>