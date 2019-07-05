<template>

  <div class="web-login">
    <div class="logo">
      <img src="https://assets.maizuo.com/h5/mz-auth/public/app/img/logo.19ca0be.png" />
    </div>
    <div class="login-form">
      <div>
        <form>
          <div class="form-group">
            <input type="text" v-model="username" placeholder="用户名" class="input-control" required/>
          </div>
          <div class="form-group">
            <input placeholder="密码" v-model="password" class="input-control" required type="password"/>
          </div>
          <!---->
          <!---->
          <button class="submit login-btn" @click="HandleLogin({username, password})" :disabled="!username || !password">
            <span>登录</span>
          </button>
        </form>
        <!---->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
   ...mapActions('login',['HandleLogin'])
    }
  }

</script>

<style lang="scss">
div {
    box-sizing: border-box;
}
.web-login {
    font-size: 15px;
    .logo{
          margin: 79px auto 40px;
          text-align: center;
          height: 60px;
          line-height: 60px;
          img {
                height: 60px;
          }
    }
    .login-form {
          width: 100%;
          position: relative;
          .form-group{
            line-height: 55px;
          margin: 0 25px;
          position: relative;
         .input-control {
            height: 15px;
            line-height: 15px;
            padding: 20px 0;
            width: 100%;
            font-size: 15px;
            color: #191a1b;
            border: 0;
            outline-width: 0;
         }
          }
          .login-btn{
            margin-top: 70px;
          }
          .submit {
            width: 325px;
          line-height: 45px;
          font-size: 16px;
          margin: 70px 25px 0;
          border-radius: 3px;
          text-align: center;
          background-color: #ff5f16;
          height: 44px;
          color: #fff;
          border: none;
         }
  }
}

</style>
