import axios from "axios";
import { Toast } from "vant";
const state = {
    cinemas: [],//影院
    cities: window.localStorage.getItem("cities") ?
    JSON.parse(window.localStorage.getItem("cities")) : [],  //城市列表数据
    searchVal: "", //搜索关键字
    curCityId:window.localStorage.getItem("curCityId") ? 
    window.localStorage.getItem("curCityId") -0 : 440300 //当前选择的城市id
};

const getters = {
   cityList(state) {
       let result = [];
       state.cities.forEach(city => {
           let py = city.pinyin.charAt(0).toUpperCase();
           let index = result.findIndex(item => item.py === py)
           if (index > -1) {
               result[index].list.push(city);
           } else {
               let obj = {
                   py,
                   list:[city]
               }
               result.push(obj);
           }
       });
       result = result.sort((a,b) => {
           return a.py.charCodeAt() - b.py.charCodeAt()
       })
       return result;
   },

   hotCity(state) {
       return state.cities.filter(item => item.isHot);
   },
   indexList(state,getters) {
       return getters.cityList.map(item => item.py);
   },

   serchList(state) {
       let tmp = [];
       if (state.searchVal) {
           tmp = state.cities.filter(item =>{
               return item.name.indexOf(state.searchVal) > -1;
           });
       }
       return tmp;
    },

    curCityInfo(state) {
        //[{cityId: xxx},{},{}]
        //{cityId:xxx, name: '深圳}
        return state.cities.find(item => item.cityId === state.curCityId);
    },
};
const mutations = {
    setCities(state, payload) {
        state.cities = payload.list;
    },
    setSearchVal(state,payload) {
        state.searchVal = payload.value;
    },
    setCurCityId(state,payload) {
        state.curCityId = payload.cityId;
    },
    setCinema(state,payload) {
        state.cinemas = payload.list;
    }
};
const actions = {
    //有数据就不发送请求
    getCities({ commit,state }) {
        if (state.cities.length) {
            return;
        }
        Toast.loading({
            duration: 0,
            mask: true,
            message: '加载中...'
        });
       axios.get("https://m.maizuo.com/gateway?k=760359",{
           headers:{
            'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15604803767322919240024"}',
            'X-Host': 'mall.film-ticket.city.list'
           }
       }).then(response => {
           let res = response.data;
           if (res.status === 0) {
               //1. 将城市数据给到 仓库
               commit({ type:"setCities", list:res.data.cities });
               //2. 将城市数据本地储存起来
               window.localStorage.setItem('cities',JSON.stringify(res.data.cities));
            } else {
               Toast(res.msg)
           }
           Toast.clear();
       })
   },
   getCinema({ commit }) {
    let cityIs = window.localStorage.getItem("curCityId") ? window.localStorage.getItem("curCityId") : 440300;
    axios.get(`https://m.maizuo.com/gateway?cityId=${cityIs}`,{
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