<template>
    <div class="page-city">
        <van-search v-model="searchVal"  placeholder="请输入搜索关键词" />

        <!-- 拼音检索 -->
    <div class="lv-indexlist" v-show="!searchVal">
        <ul class="lv-indexlist__content" ref="lv-indexlist__content">
            <div class="recommend-city">
            <div class="gprs-city">
                <div class="city-index-title">GPS定位你所在城市</div>
                <ul class="city-index-detail">
                <li class="city-item-detail city-item-detail-gprs">
                    <div class="city-item-text">定位失败</div>
                </li>
                </ul>
            </div>
            <div class="hot-city">
                <div class="city-index-title">热门城市</div>
                <ul class="city-index-detail">
                <li class="city-item-detail"
                 v-for="item in hotCity"
                  :key="item.cityId"
                  @click="handleChaCity(item)"
                  >
                    <div class="city-item-text">{{ item.name }}</div>
                </li>
                </ul>
            </div>
            </div>
            <li :ref="'box_' + item.py"
             class="lv-indexsection"
              v-for="item in cityList"
               :key="item.py">
            <p class="lv-indexsection__index">{{ item.py }}</p>
            <ul>
                <li v-for="city in item.list"
                 :key="city.cityId"
                 @click="handleChaCity(city)"
                 >
                 {{ city.name }}
                 </li>
            </ul>
            </li>
        </ul>
        <div class="lv-indexlist__nav">
            <ul>
            <li v-for="item in indexList" 
            :key="item" 
            @click="goTop(item)">
            {{ item }}
            </li>
            </ul>
        </div>
    </div>
        <!--搜索结果-->
    <div class="lv-indexlist" v-show="searchVal">
        <ul class="search_box" v-if="serchList.length > 0">
            <li v-for="city in serchList" 
            :key="city.cityId"
            @click="handleChaCity(city)"
            >
                {{ city.name }}
            </li>
        </ul>
        <div class="empty-result" v-if="!serchList.length">
            <img src="../../assets/images/empty.png" alt="">
            <p>没有找到匹配的城市</p>
        </div>
    </div>
    </div>
    
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "city",

  methods: {
    ...mapActions('city',['getCinema']),
    //将请求城市列表的代码移动到万年老二App.vue里面去做
    //why：因为这个数据在很多地方都需要使用到
    // ...mapActions("city", ["getCities"]),
    //点击右侧拼音首字母，让左侧对应的的元素滚动到最顶部
    goTop(py) {
      //1.找到左侧对应的dom元素
      let el = this.$refs["box_" + py][0];
      //2.得到当前el距离顶部的距离
      let offsetTop = el.offsetTop;
      let box = this.$refs["lv-indexlist__content"];
      //3.操作左侧滚动条的 scrollTop 属性
      box.scrollTop = offsetTop;
    },
    //修改当前选择的城市
    handleChaCity(city) {
        //1.获取当前点击的城市的城市Id
        let cityId = city.cityId;
        //2.将仓库中的相关数据给修改
        this.$store.commit({
            type: 'city/setCurCityId',
            cityId
        });
        //3.编程式导航 回到上一页
     this.$router.back();
    // this.$router.go(-1);
    //4.将城市id给本地储存起来
    window.localStorage.setItem("curCityId",cityId);
    //5.重新获取影片影院的数据
    this.getCinema();
    }
  },
  computed: {
    ...mapGetters("city", ["cityList", "hotCity", "indexList", "serchList"]),
    //搜索关键字
    searchVal: {
      get() {
        return this.$store.state.city.searchVal;
      },
      set(value) {
        this.$store.commit({
          type: "city/setSearchVal",
          value
        });
      }
    }
  },
  created() {
    // this.getCities();
  }
};
</script>

<style lang="sass">
    @import "./index.scss"
</style>

