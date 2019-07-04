<template>
    <div class="page-film">
        <h1>我是影片详情页面</h1>
    </div>
</template>

<script>
export default {
    name: "film",
    beforeDestroy() {
        console.log("film destroy");
    }
}
</script>