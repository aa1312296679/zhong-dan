<template>
    <div class="drop_down_menu">
        <!--列表内容盒子-->
        <div class="drop_down_content">
            <div class="drop_down_item">
                <img class="drop_down_item_logo" src="/img/menu-yanchen-icon.png"/>
                <span class="text">item文字</span>
            </div>
            <div class="drop_down_item">列表项</div>
            <div class="drop_down_item">列表项</div>
            <div class="drop_down_item">列表项</div>
            <div class="drop_down_item">列表项</div>
            <div class="drop_down_item">列表项</div>
            <div class="drop_down_item">列表项</div>
            <div class="drop_down_item">列表项</div>
            <div class="drop_down_item">列表项</div>
        </div>
        <div :class="['drop_down_ico_wrapper',icoActive,'iconfont']" @click="icoHandle"></div>
    </div>
</template>

<script>
    export default {
        name: "dropDownMenu",
        data(){
            return {
                isRotate:false //旋转状态
            }
        },
        computed:{
            icoActive(){
                return this.isRotate?'drop_down_ico_active':''
            }
        },
        methods:{
            icoHandle(){
                this.isRotate=!this.isRotate;
            }
        }
    }
</script>

<style lang="stylus" scoped>
.drop_down_menu
    position fixed
    right: 20px
    top 140px
    .drop_down_content,.drop_down_ico_wrapper
        float left
    .drop_down_ico_wrapper,.drop_down_content .drop_down_item
        background rgba(12, 32, 53, 0.8)
        border-radius 2px
        color #ffff
    .drop_down_ico_wrapper
        margin-top 4.2px
        cursor: pointer
    .drop_down_ico_wrapper,.drop_down_ico_active
        &::before
            content "\e604"
            display block
            width 12px
            height 29.5px
            text-indent: -2px
            font-weight bold
            line-height: 29.5px
            transition transform 0.5s ease
    .drop_down_ico_active
        &::before
            transform:rotate(180deg)
    .drop_down_content
        margin-right 6px
        .drop_down_item
            width 246.45px
            overflow hidden
            padding 3.5px 0
            border-radius 2px
            margin-top 4px
            color #fff
            .drop_down_item_logo,.text
                height 23px
            .drop_down_item_logo
                width 23px
                display block
                float left
                margin-left 20px
                margin-right 14px
            .text
                float left
                display block
</style>