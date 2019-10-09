<template>
    <div class="header-wrapper">
      <div class="header-logo"> logo </div>
      <div class="header-right-console">
          <div class="console-img">
            <img src="@/assets/images/login-user.png">
          </div>
          <div class="console-username">小胖纸~</div>
          <div class="console-logout" @click="outloginVisible = true">退出</div>
      </div>
      <!--退出提示-->
      <el-dialog
        width="478px"
        :visible.sync="outloginVisible"
        :show-close="false"
        custom-class="custom-dialog deleteTip">

        <header class="dialog-header" slot="title">
          提示<i class="el-icon-close dialog-header-iconfont" @click="outloginVisible = false"></i>
        </header>
        <div class="dialog-body" style="height: 40px;line-height: 40px;text-align: center;font-size: 16px">
          <p>真的要退出吗?</p>
        </div>
        <footer slot="footer" class="dialog-footer">
          <el-button type="primary" class="dialog-footer-btn" @click="logout" >确 定</el-button>
          <el-button @click="outloginVisible = false" class="dialog-footer-btn" style="margin-left: 36px">取 消</el-button>
        </footer>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Headerbar",
        data(){
          return {
            outloginVisible:false,
          }
        },
        methods:{
          logout(){
            sessionStorage.clear();
            this.$router.push('/loginCloud');
          },

        }
    }
</script>

<style scoped>

</style>
