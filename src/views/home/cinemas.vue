<template>
  <div class="page-home-cinemas">
    <div class="cinema-list">
      <div class="header">
        <div class="left">
          <span class="map" @click="goCity">{{ curCityInfo.name }}</span>
          <img src="../../assets/images/xia.png" alt />
        </div>
        <div class="title">
          <span>影院</span>
        </div>
        <div class="right">
          <img src="../../assets/images/jing.png" alt />
        </div>
      </div>
      <van-dropdown-menu active-color="#ff5f16">
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item v-model="value3" :options="option3" />
      </van-dropdown-menu>
      <div class="cinema-list-wrap" v-for="item in cinemas" :key="item.cinemaId">
        <ul class="cinema-list">
          <li class="cinema-list-item">
            <div class="cinema-list-item-le">
              <span class="cinema-name">{{ item.name }}</span>
              <span class="cinema-address">{{ item.address }}</span>
            </div>
            <div class="cinema-list-item-ri">
              <div class="price">
                <span class="price-le">
                  <i style="font-size: 11px; font-style: normal; color:#ff5f16">￥</i>
                  <span
                    class="interge"
                    style="font-size: 15px;color:#ff5f16"
                  >{{ item.lowPrice/100 }}</span>
                </span>
                <span class="upon" style="color: #ff5f16;font-size: 10px;">起</span>
              </div>
              <span class="cinema-gpsAddress">距离未知</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  name: "cinemas",
  data() {
    return {
      value1: 0,
      value2: "a",
      value3: "a",
      option1: [
        { text: "全城", value: 0 },
        { text: "福田区", value: 1 },
        { text: "南山区", value: 2 },
        { text: "龙岗区", value: 3 },
        { text: "坪山区", value: 4 },
        { text: "盐田区", value: 5 },
        { text: "罗湖区", value: 6 },
        { text: "宝安区", value: 7 },
        { text: "龙华区", value: 8 }
      ],
      option2: [
        { text: "APP购票", value: "a" },
        { text: "前台兑换", value: "c" }
      ],
      option3: [
        { text: "最近去过", value: "a" },
        { text: "离我最近", value: "c" }
      ]
    };
  },
  methods: {
    goCity() {
      this.$router.push("/city");
    },
    ...mapActions("city", ["getCinema"])
  },
  computed: {
    ...mapState("city", ["cinemas"]),
    ...mapGetters("city", ["curCityInfo"])
  },
  created() {
    this.getCinema();
  }
};
</script>

<style lang="scss">
@import "../../assets/styles/common/mixins.scss";
@import "../../assets/styles/common/px2rem.scss";
.cinema-list {
  .header {
    @include border-bottom;
    width: 100%;
    height: px2rem(44);
    background: #fff;
    display: flex;
    justify-content: space-around;
    .left {
      width: px2rem(44);
      height: px2rem(44);
      span {
        font-size: 14px;
        line-height: px2rem(44);
        padding-right: 5px;
      }
      img {
        width: 6px;
        height: 3px;
        padding-bottom: 2px;
      }
    }
    .title {
      width: px2rem(232);
      height: px2rem(44);
      span {
        font-size: 17px;
        color: #191a1b;
        display: block;
        text-align: center;
        line-height: px2rem(44);
      }
    }
    .right {
      width: px2rem(44);
      height: px2rem(44);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      img {
        width: 18px;
        height: 18px;
        padding-right: 7px;
      }
    }
  }
  .cinema-list-wrap {
    .cinema-list {
      width: 100%;
      .cinema-list-item {
        height: px2rem(75);
        background: #fff;
        @include border-bottom;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        align-content: center;
        .cinema-list-item-le {
          width: px2rem(280);
          height: px2rem(45);
          display: flex;
          flex-wrap: wrap;
          align-content: center;
          padding-left: 15px;
          box-sizing: border-box;
          .cinema-name {
            color: #191a1b;
            font-size: 15px;
            padding-bottom: 10px;
            display:block;
            width:px2rem(212);
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          }
          .cinema-address {
            color: #797d82;
            font-size: 12px;
            display:block;
            width:px2rem(212);
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
          }
        }
        .cinema-list-item-ri {
          width: px2rem(70);
          height: px2rem(45);
          display: flex;
          flex-wrap: wrap;
          align-content: space-between;
          .price {
            width: px2rem(70);
            height: px2rem(22);
            .price-le {
              .interge {
                padding-right: 3px;
              }
            }
          }
          .cinema-gpsAddress {
            width: px2rem(70);
            height: px2rem(18);
            font-size: 11px;
            color: #797d82;
          }
        }
      }
    }
  }
}
</style>
