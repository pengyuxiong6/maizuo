import axios from 'axios'
import { Toast } from 'vant'
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
        console.log(res)
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
