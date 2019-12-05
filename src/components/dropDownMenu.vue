<template>
    <div class="drop_down_menu">
        <!--列表内容盒子-->
        <transition>
            <div class="drop_down_content" v-show="!showState">
                <div class="drop_down_item" v-for="(item,index) in listItems" :key="index">
                    <img class="drop_down_item_logo" :src="item.img"/>
                    <span class="text">{{item.text}}</span>
                </div>
            </div>
        </transition>
        <div :class="['drop_down_ico_wrapper',icoActive,'iconfont']" @click="icoHandle"></div>
    </div>
</template>

<script>
    export default {
        name: "dropDownMenu",
        data(){
            return {
                showState:false, //旋转状态和显示状态
                listItems:[ //所有列表项目信息
                    {pid:'dropDown_0',img:'/img/menu-yanchen-icon.png',text:"固液焚烧炉烟尘"},
                    {pid:'dropDown_1',img:'/img/menu-yanchencanshu-icon.png',text:"盐碳化炉烟尘七参数监测"},
                    {pid:'dropDown_2',img:'/img/menu-paikou-icon.png',text:"东清下水排口COD"},
                    {pid:'dropDown_3',img:'/img/menu-paikou-icon.png',text:"西清下水排口COD"},
                    {pid:'dropDown_4',img:'/img/menu-yanchen-icon.png',text:"西清下水排口COD数据上传"},
                    {pid:'dropDown_5',img:'/img/menu-yanchen-icon.png',text:"RTO"},
                    {pid:'dropDown_6',img:'/img/menu-yanchen-icon.png',text:"固液焚烧炉"},
                    {pid:'dropDown_7',img:'/img/menu-yanchen-icon.png',text:"盐碳化炉"},
                    {pid:'dropDown_8',img:'/img/menu-yanchen-icon.png',text:"污水排口COD"},
                    {pid:'dropDown_9',img:'/img/menu-yanchen-icon.png',text:"催化氧化四套VOCCOD"}
                ]
            }
        },
        computed:{
            icoActive(){
                return this.showState?'drop_down_ico_active':''
            }
        },
        methods:{
            /***
             * 图标点击处理
             */
            icoHandle(){
                this.showState=!this.showState;
            }
        }
    }
</script>

<style lang="stylus" scoped>
.drop_down_menu
    position fixed
    right: 20px
    top 140px
    .v-enter,.v-leave-to
        opacity 0
    .v-enter-active,.v-leave-active
        transition: all 1s ease;
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
                line-height 23px
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