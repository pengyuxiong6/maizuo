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
  }
}

const actions = {
  HandleLogin (context, payload) {
    Toast.loading({ duration: 0, message: '加载中' })
    axios.post('http://localhost:9090/login', payload)
      .then(response => {
        
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
