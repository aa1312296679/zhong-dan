<template>
    <div class="menuSlideBarInfor" v-show="menuItemsMax">
        <template v-for="(item,key) in menuItems">
            <div :key="key" :class="setMenuClass(key,menuItemActive)" @click="menuHandle(key)">{{item.text}}</div>
        </template>
     </div>
</template>

<script>
    export default {
        name: "menuSlideBarInfor",
        props:{
            menuItems: { //menu-items信息
                type:Array,
                required: true
            },
            menuItemActive: { //已选中的列表项
                type:Number,
                default: 0
            }
        },
        mounted() {

        },
        methods:{
            setMenuClass(index,activeIndex){
               return (index===activeIndex)?("menue_item_active"):("menue_item");
            },
            menuHandle(index){
                this.$emit("menuHanClick",index)
            }
        },
        computed:{
            menuItemsMax(){
                return this.menuItems.length
            }
        }
    }
</script>

<style lang="stylus" scoped>
.menuSlideBarInfor
    width 118px
    position absolute
    z-index 1000
    left 76px
    .menue_item,.menue_item_active
        height 32px
        line-height 32px
        border 1px dashed blue
        margin-bottom 6px
        color #ffff
        display flex
        justify-content center
        align-items center
        cursor: pointer
    .menue_item
        background url("/img/menu-secondli-bg.png") no-repeat center center
    .menue_item_active
        background url("/img/menu-secondli-bg-highlight.png") no-repeat center center
</style>