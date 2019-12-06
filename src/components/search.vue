<template>
    <div class="search">
        <input class="search_txt" v-model="searchTxt"/>
        <button class="search_btn">
            <img src="img/search-input-icon.png"/>
        </button>
    </div>
</template>

<script>
    export default {
        name: "search",
        data(){
            return {
                searchTxt:"文字"
            }
        }
    }
</script>

<style scoped lang="stylus">
.search
    height 3.68rem
    width 36.8rem
    position absolute
    top 7.2rem
    background rgba(20, 46, 88, 0.8)
    border-radius .48rem
    .search_txt
        width: 100%
        height: 100%
        border: none
        outline: none
        color: #FFFFFF
        text-indent: .8rem
        border-top-left-radius: .48rem
        border-bottom-left-radius: .48rem
        background-color: rgba(20, 46, 88, 0.8)
        background-repeat: no-repeat
    .search_btn
        width 4.16rem
        height 100%
        position absolute
        top 0
        right 0
        background: -webkit-linear-gradient(left, rgba(0, 145, 255, 1), rgba(0, 178, 255, 1))
        background: -o-linear-gradient(left, rgba(0, 145, 255, 1), rgba(0, 178, 255, 1))
        background: -moz-linear-gradient(left, rgba(0, 145, 255, 1), rgba(0, 178, 255, 1))
        background: linear-gradient(left, rgba(0, 145, 255, 1), rgba(0, 178, 255, 1))
        display flex
        justify-content center
        align-items center
        img
            display block
            width 50%
            height 50%
</style>