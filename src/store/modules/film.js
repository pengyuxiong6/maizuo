import axios from "axios";
import { Toast } from "vant";
const state = {
    bannerList: [],
    filmList: [],
    curFilmType: 0, //当前影片的类型
    filmLoading: false, //影片加载状态
    pageNum: 1, //页码
    total: 1, //总条数
    pageSize: 10 // 每页显示20条
};

const getters = {
    //总页数
    totalPage(state) {
        return Math.ceil(state.total / state.pageSize);
    },
    //是否还有更多数据, 为true 代表没有更多
    isFinished(state, getters) {
        return state.pageNum > getters.totalPage;
    }
};

const mutations = {
    setBannerList(state, payload) {
        state.bannerList = payload.list;
    },
    setFilmList(state,payload) {
        state.filmList = payload.list;
        state.total = payload.total
    },
    setCurFilmType(state, payload) {
        state.curFilmType = payload.filmType;
    },
    setFilmLoading(state,payload) {
        state.filmLoading = payload.loading;
    },
    setPageNum(state,payload) {
        state.pageNum = payload.num;
    }
};

const actions = {
    getBannerList ( { commit } ) {
        axios.get('https://m.maizuo.com/gateway?type=2&cityId=440300&k=4627909',{
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15604803767322919240024"}',
                'X-Host': 'mall.cfg.common-banner' 
            }
        }).then(Response => {
            let res = Response.data;
            if (res.status === 0) {
                //成功
                commit({
                    type: "setBannerList",
                    list: res.data
                }) 
            } else {
                //失败 TODO
                alert(res.msg);
            }
        })
    },
    //获取影片列表数据
    //isChangeFilmType 是否切换影片类型之后的获取数据
    getFilmList ({ commit,state, rootState },isChangeFilmType) {
        //判断isChangeFilmType
        if (isChangeFilmType) {
            //1. 清空filmList 不能直接清空，会有一个bug
            // commit("setFilmList",{list: [],total: 1});
            //2. 将 pageNum 设置为 1
            commit("setPageNum",{num: 1});
        }
        //请求之前， loading
        Toast.loading({
            duration: 0,
            mask: true,
            message: '加载中...'
        });
        axios.get('https://m.maizuo.com/gateway',{
            params: {
                //cityId 不能写死
                // cityId:440300,
                cityId:rootState.city.curCityId,
                pageNum:state.pageNum,
                pageSize:state.pageSize,
                //type = 1 正在热映
                //type = 2 即将上映
                type: state.curFilmType === 0 ? 1 : 2,
                k:2703610
            },
            headers:{
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15604803767322919240024"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(response => {
            Toast.clear();
            let res = response.data;
            if (res.status === 0) {
                commit({
                    type: 'setFilmList',
                    // list: res.data.films,
                    list: isChangeFilmType ? res.data.films : state.filmList.concat(res.data.films),//concat用于连接两个或者多个数组
                    //list: state.filmList.push(res.data.films),x 会变成一个二维数组
                    //list: state.filmList.push(...res.data.films),
                    total: res.data.total
                })
            } else {
                Toast(res.msg);
            }
            //1. 数据加载完成，需要将filmLoading 设置为 false
            commit({ type: "setFilmLoading",loading: false });
            //2. 数据加载完成，需要将页码++
            commit({ type: "setPageNum",num: state.pageNum + 1 })
            //3. 判断是否是最后一页 已经交给上面的isFinised来处理
            //4. 数据追加，而不是赋值
            Toast.clear();
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