<template>
    <div class="page-home">
            <router-view></router-view>
        <Tabbar
            :tabs="[
                { name: '电影', icon: 'icon-dianying', to: '/films' },
                { name: '影院', icon: 'icon-yingyuana', to: '/cinemas' },
                { name: '我的', icon: 'icon-wode', to: '/center' },
            ]"
        />
    </div>
</template>

<script>
import Tabbar from '@/components/tabbar/index.vue';
export default {
    name: "home",
    components: {
        Tabbar
    },
    beforeDestroy() {
        console.log("home destroy");
    }
}
</script>

<style lang="scss">
    .page-home {
        display: flex;
        flex-direction: column;
        height: 100%;
        >div:first-child {
            flex: 1;
            overflow-y: auto;
        }
    }
</style>
