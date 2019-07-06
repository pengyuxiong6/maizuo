import axios from 'axios'
import { Toast } from 'vant'
import router from '@/router'
const state = {
  userInfo: window.localStorage.getItem('userInfo')
  ? JSON.parse(window.localStorage.getItem('userInfo')) : null
}
const getters = {

}

const mutations = {
  setUserInfo (state, payload) {
    state.userInfo = payload.info
  },
  serUserAvatar(state, payload) {
    let newUserInfo = state.userInfo = {...state.userInfo, avatar:payload.avatar}
    state.userInfo = newUserInfo;
    window.localStorage.setItem('userInfo', JSON.stringify(newUserInfo))
  }
}

const actions = {
  //登录
  HandleLogin (context, payload) {
    Toast.loading({ duration: 0,mask:true, message: '加载中' })
    axios.post('http://localhost:9090/sign-in', payload)
      .then(response => {
        Toast.clear()
        let res = response.data
          if(res.code === 0) {
            window.localStorage.setItem('userInfo', JSON.stringify(res.data))
            context.commit({ type: 'setUserInfo', info: res.data})
            Toast('登录成功')
            setTimeout(() => {
              //判断登陆页面是否有redirect参数
              let redirect = router.currentRoute.query.redirect || '/center';
              router.replace(redirect)
              
            }, 500)
          } else {
            Toast(res.msg)
          }
      })
  },
  //修改头像
  handleUpdateAvatar({ commit, state }, event){
    Toast.loading({duration: 0, message: '加载中'})
    let formData = new FormData()
    formData.append('userId', state.userInfo.userId)
    formData.append('avatar', event.target.files[0])
    axios.post('http://localhost:9090/user/profile', formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(response => {
      Toast.clear()
      let res = response.data
      if(res.code === 0) {
        Toast('修改成功')
        commit({ type: 'serUserAvatar', avatar: res.data})
      } else {
        Toast(res.msg)
      }
    })
  },
  //退出登录
  handleLogout(context){
    context.commit({type: 'setUserInfo', info: null})
    window.localStorage.removeItem('userInfo')
    window.location.reload();
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
