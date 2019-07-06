<template>
  <div class="page-login">
    <div class="center-view">
       <div class="avatar" v-if="userInfo">
         <div class="avatar-icon">
        <img :src="userInfo.avatar"  alt />
        <input type="file" @change="handleUpdateAvatar">
        </div>
        <div class="nick-name">{{userInfo.nickname}}</div>
      </div>
      <div class="avatar" v-else>
         <div class="avatar-icon">
        <img src="../../assets/images/defava.png" alt />
         </div>
          <router-link tag="div" to="/login" class="nick-name">立即登录</router-link>
      </div>
      <ul class="my-order-tab">
        <li>
          <img src="../../assets/images/left.png" alt="">
          <div class="common-p">电影订单</div>
        </li>
        <li>
          <img src="../../assets/images/right.png" alt="">
          <div class="common-p">商品订单</div>
        </li>
      </ul>
      <router-link tag="div" class="margin-set my-card" to="/card">
        <img src="../../assets/images/icon1.png" alt="" style="width:20px;height:20px">
        <span class="label">卖座券</span>
        <img src="../../assets/images/arrow.png" class="arrow" alt="">
      </router-link>
       <div class="margin-set my-card">
        <img src="../../assets/images/icon1.png" alt="" style="width:20px;height:20px">
        <span class="label">组合红包</span>
        <img src="../../assets/images/arrow.png" class="arrow" alt="">
      </div>
       <div class="margin-set my-card">
        <img src="../../assets/images/icon1.png" alt="" style="width:20px;height:20px">
        <span class="label">余额</span>
        <img src="../../assets/images/arrow.png" class="arrow" alt="">
      </div>
       <div class="margin-set my-card" @click="handleLogout">
        <img src="../../assets/images/icon1.png" alt="" style="width:20px;height:20px">
        <span class="label">退出登录</span>
        <img src="../../assets/images/arrow.png" class="arrow" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'center',
  computed: {
    ...mapState('login',['userInfo'])
  },
  methods: {
    ...mapActions('login', ['handleUpdateAvatar','handleLogout'])
  }
}
</script>
 <style lang="scss">
 @import '../../assets/styles/common/mixins.scss';
.page-login {
  width: 100%;
  background: #f4f4f4;
  .center-view {
    position: relative;
    top: 0;
    right: 0;
    left: 0;
    font-size: 15px;
    background: #f4f4f4;
    margin-bottom: 59px;
    .avatar {
      box-sizing: border-box;
      text-align: center;
      margin-top: -44px;
      height: 200px;
      padding-left: 22px;
      padding-top: 64px;
      background: url(https://assets.maizuo.com/h5/v5/public/app/img/bg.6837f67.png);
      background-size: cover;
      display: flex;
      align-items: center;
      color: #fff;
      .avatar-icon{
            position: relative;
            width: 63px;
            height: 63px;
            border-radius: 35px;
            margin-right: 20px;
            border: 2px solid #fff;
            img {
              display: block;
            border-radius: 50%;
              width: 100%;
              height: 100%;
            }
            input {
              position: absolute;
              top: 0;
              left: 0;
              opacity: 0;
              width: 100%;
              width: 100%;
            }
      }
      .nick-name {
        color: #fff;
        font-size: 16px;
      }
    }
    .my-order-tab {
       width: 100%;
        margin: 0 auto;
        display: flex;
        text-align: center;
        font-size: 13px;
        padding: 0;
        height: 79px;
        background: #fff;
        margin-bottom: 10px;
        align-items: center;
        li {
          position: relative;
          flex: 1;
          img{
            
            width: 26px;
            height: 26px;
          }
          .common-p {
            box-sizing: border-box;
            line-height: 22px;
            color:#797d82;
            }
          }
    }
    .margin-set {
      height: 49px;
      box-sizing: border-box;
      background: #fff;

          padding: 0 15px;

          display: flex;
          align-items: center;
          .label{
            margin-left: 15px;
             color: #191a1b;
              flex: 1;
          }
          .arrow{
            text-align: right;
            width: 6px;
            height: 10px;
          }
    }
    .my-card {
      @include border-bottom;
    }
  }
}
</style>


