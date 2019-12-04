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
        <div class="drop_down_ico_wrapper">
        </div>
    </div>
</template>

<script>
    export default {
        name: "dropDownMenu"
    }
</script>

<style lang="stylus" scoped>
.drop_down_menu
    border 1px dashed red
    position fixed
    right: 0;
    top 140px
    .drop_down_content,.drop_down_ico_wrapper
        float left
    .drop_down_ico_wrapper::before,.drop_down_content .drop_down_item
        background rgba(12, 32, 53, 0.8)
        border-radius 2px
    .drop_down_ico_wrapper::before
        content ""
        display block
        width 12px
        height 29.5px
        border 1px solid red
        margin-top 5px
    .drop_down_content
        border 1px dashed blue
        margin-right 6px
        .drop_down_item
            width 246.45px
            overflow hidden
            padding 3.5px 0
            border 1px dashed greenyellow
            border-radius 2px
            margin-top 4px
            color #fff
            .drop_down_item_logo,.text
                height 23px
            .drop_down_item_logo
                width 23px
                border 1px solid red
                display block
                float left
                margin-left 20px
                margin-right 14px
            .text
                float left
                display block
                border 1px solid orange
</style>