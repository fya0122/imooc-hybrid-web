<template>
  <div class="register-page">
    <navigation-bar :pageName="'注册'" @onLeftClick="onLeftClick"></navigation-bar>
    <!-- 内容区 -->
    <div class="register-page-content">
      <!-- 用户名 -->
      <div class="input-container">
        <input type="text" placeholder="用户名" v-model="username">
      </div>
      <!-- 密码 -->
      <div class="input-container">
        <input type="password" placeholder="密码" v-model="password">
      </div>
      <!-- 确认密码 -->
      <div class="input-container">
        <input type="password" placeholder="确认密码" v-model="confirmPassword">
      </div>
      <!-- 确认框 -->
      <div @click="onRegisterClick" class="register-page-content-register page-commit">
        注册
      </div>
    </div>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  name: 'register',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    onLeftClick () {
      this.$router.go(-1)
    },
    onRegisterClick () {
      if (this.username.length === 0) {
        alert('请完善用户名')
        return false
      }
      if (this.password.length === 0 || this.password !== this.confirmPassword) {
        alert('请完善密码')
        return false
      }
      /**
       * 与原生进行交互，这里应该是保存用户输入的用户名和密码
       * */
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@css/style.scss";
.register-page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  &-content {
    width: 100%;
    height: 100%;
    &-register {
      margin-top: 40%;
    }
  }
}
</style>
