import axios from "axios";
import { Toast } from "vant";
const state = {
    cinemas: []//影院
};

const getters = {
    
};
const mutations = {
    setCinema(state,payload) {
        state.cinemas = payload.list;
    }
};
const actions = {
    getCinema({ commit }) {
        axios.get('https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=3076884',{
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15604803767322919240024"}',
                'X-Host': 'mall.film-ticket.cinema.list'
            }
        }).then( response =>{
            let res = response.data;
            if (res.status == 0) {
                commit({
                    type:'setCinema',
                    list: res.data.cinemas
                })
            }
        })
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}