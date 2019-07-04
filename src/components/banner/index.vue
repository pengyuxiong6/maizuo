<template>
    <div ref="banner" class="mz-banner swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in list" :key="item.bannerId">
                <img :src="item.imgUrl" alt="" srcset="">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination" v-if="pagination"></div>
        
        <!-- 如果需要导航按钮 -->
        <template v-if="navigation">
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </template>
        
        <!-- 如果需要滚动条 -->
        <div class="swiper-scrollbar" v-if="scrollbar"></div>
    </div>
</template>

<script>
import Swiper from "swiper";
export default {
    name: 'Banner',

    props: {
        //轮播项目
        list: {
           type: Array,
           default() {
               return [];
           } 
        },
        //是否需要左右箭头
        navigation:{
            type: Boolean,
            default: false
        },
        //是否需要滚动条
        scrollbar:{
            type: Boolean,
            default: false
        },
        //是否需要分页器
        pagination:{
           type: Boolean,
           default: false 
        },
        //是否循环轮播
        loop: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        list(newVal, oldVal){
            if (this.mySwiper) {
                //已经初始化
                this.mySwiper.destroy();
            }
            this.$nextTick(() =>{
                this.initSwiper();
            })
        }
    },
    methods: {
        initSwiper(){
            let container = this.$refs.banner;
           this.mySwiper = new Swiper(container,{
            navigation: this.navigation ?{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                }
                : {},
            scrollbar: this.scrollbar ?{
                el: '.swiper-scrollbar',
                }
                : {},
            pagination: this.pagination ?{
                el: '.swiper-pagination',
                }
                : {},
            loop : this.loop
            });
        }
    },
    // updated(){
    // if (this.mySwiper) {
    //     //已经被初始化
    //     this.mySwiper.destroy();//销毁
    // } 
    // this.initSwiper();
    // //判断是否是 list 有变化，并且还需要判断 swiper 是否已经初始化过
    // if (this.list.length && !this.mySwiper) {
    //         this.initSwiper();
    //     }
    // if (this.list.length) {
    //     this.mySwiper.updateSlides();
    // }
    // },
}
</script>

<style lang="scss">
    @import "~swiper/dist/css/swiper.css";
    @import "~@/assets/styles/common/px2rem.scss";

    .mz-banner {
        height: px2rem(210);
    }
</style>


