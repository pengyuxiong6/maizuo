import axios from 'axios'
import { Toast } from 'vant'
import router from '@/router'
const state = {
  userInfo: null
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
            context.commit({ type: 'setUserInfo', info: res.data})
            router.push('/center')
          } else {
            Toast(res.msg)
          }
        Toast.clear()
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
