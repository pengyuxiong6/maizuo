<template>
    <van-list v-model="filmLoading" 
    @load="getFilmList" 
    :immediate-check= "true"
    finished-text="没有更多了" 
    :finished="isFinished"
    ref="myBox">
        <div class="page-home-films">
            <Banner pagination loop :list="bannerList"/>
            <div class="city-fixed" @click="handleGoCity">
                 <!--
                    curCityInfo可能在初次渲染的时候， ajax 请求还没完成，导致得到
                    undefined。再导致 name 报错
                -->
                <span>{{ curCityInfo &&curCityInfo.name }}</span>
                <i class="iconfont icon-35_xiangxiajiantou"></i>
            </div>
            <van-tabs v-model="curFilmType" sticky>
                <van-tab title="正在热映">
                    <Filmlist filmType="nowPlaying" :list="filmList"/>
                </van-tab>
                <van-tab title="即将上映">
                    <Filmlist filmType="comingSoon" :list="filmList" />
                </van-tab>
            </van-tabs>
        </div>
    </van-list>
</template>

<script>
import Banner from "@/components/banner";
import Filmlist from "@/components/filmList";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    name: "films",
    components: {
        Banner,
        Filmlist
    },
    computed: {
        ...mapState("film",["bannerList","filmList"]),
        ...mapGetters("film",["isFinished"]),
        ...mapGetters('city',['curCityInfo']),
        curFilmType: {
            get() {
                return this.$store.state.film.curFilmType;
            },
            set(value) {
                this.$store.commit({
                   type: "film/setCurFilmType",
                   filmType: value 
                })
            }
        },
        filmLoading: {
           get() {
               return this.$store.state.film.filmLoading;
           },
           set(value) {
               this.$store.commit({
                  type: "film/setFilmLoading",
                  loading: value 
                });
           } 
        }
    },
    watch: {
        curFilmType(oldVal,newVal) {
            //当curFilmType发生变化，这时重新发送请求
            //0. 将滚动条滚动到顶部
            //1. 先将所有filmList 数据清空， 然后将 pageNum 设置为 1
             this.getFilmList(true);
             this.$refs.myBox.$el.scrollTop = 0;
        }
    },
    methods: {
        ...mapActions("film",["getBannerList","getFilmList"]),
        //点击跳转到城市选择页 编程式导航
        handleGoCity() {
            this.$router.push("/city");
        }
    },
    created(){
        this.getBannerList();
        //由于使用了 van-list 默认它的 @load 事件会触发一次
        // this.getFilmList();
    }
}
</script>
<style lang="scss">
    .page-home-films {
        .mz-banner {
            img {
                width: 100%;
            }    
        }
        .city-fixed {
            position: absolute;
            top: 18px;
            left: 7px;
            color: #fff;
            z-index: 10;
            font-size: 13px;
            background: rgba(0, 0, 0, 0.2);
            height: 30px;
            line-height: 30px;
            border-radius: 15px;
            text-align: center;
            padding: 0 5px;
            i {
            font-size: 10px;
            }
        }
    }
</style>
