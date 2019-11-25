<template>
    <div class="menu_tab">
        <template v-for="(item,key) in menuTabs">
            <div :key="key" :class="['menu_tab_item',setItemLine(key),setItemPaddingLeft(key)]">
                <div class="ico"><img :src="setImgSrc(key,activeMenuIndex,item)"/></div>
                <span class="txt">{{item.imgTxt}}</span>
            </div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "menuTab",
        props:{
            menuTabs: { //menu-tab信息
                type:Array,
                required: true
            },
            activeMenuIndex:{
                type:Number,
                default:0
            }
        },
        methods:{
            setItemLine(index){
                return (index!==this.menuTabs.length-1)?'menu_tab_item_line':'';
            },
            setItemPaddingLeft(index){
                return (index)?'menu_tab_padding_left':'';
            },
            setImgSrc(index,activeIndex,item){
                return (index===activeIndex)?(item.activeImgSrc):(item.imgSrc);
            }
        }
    }
</script>

<style lang="stylus" scoped>
.menu_tab
    height 3.2rem
    display flex
    justify-content center
    align-items center
    position absolute
    right 1.6rem
    padding-left 1.12rem
    top 7.2rem
    background rgba(20, 46, 88, 0.8)
    border-radius .48rem
    .menu_tab_item
        min-width 5.68rem
        display flex
        justify-content center
        color #ffff
        position relative
        padding-left 1rem
        align-items: center
        .ico
            width 1.44rem
            height 1.44rem
            position absolute
            left 0
    .menu_tab_item_line
        border-right 1px solid #ffff
    .menu_tab_padding_left
        padding-left 3.2rem
        padding-right 1.6rem
        .ico
            left 1.2rem
</style>