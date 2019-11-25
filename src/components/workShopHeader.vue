<template>
    <div class="content_header">
        <div class="ico_left">
            <img class="ico_img" :src="this.infor.img"/>
            <span class="ico_txt">{{this.infor.txt}}</span>
        </div>
        <div v-if="isClose" class="ico_right" @click="close">
            <img class="close" src="/img/close-btn.png">
        </div>
    </div>
</template>

<script>
    export default {
        name: "workShopHeader",
        props:{
            infor:{ //头部信息
             type:Object,
             required: true
            }
        },
        data(){
            return {
                isClose:false //关闭按钮显示开关
            }
        },
        created() {
            this.isClose=this.infor.isClose;
        },
        methods:{
            close(){ //关闭当前模块
                this.$emit("onClose");
            }
        }
    }
</script>

<style lang="stylus" scoped>
.content_header
    width 98%
    height 56px
    border 1px dashed blue
    margin-top 6px
    margin-left auto
    margin-right auto
    padding 0 16px
    .ico_left,.ico_right
        border 1px dashed blue
        height 44px
    .ico_left
        float left
        display flex
        align-items flex-end
        color #fff
        .ico_img
          display block
          width 17px
          height 17px
          margin-bottom 13.5px
        .ico_txt
            padding: 0 10px 0 10px
            height 39px
            line-height 26px
            border-bottom: 3px solid
            border-image: linear-gradient(to right, rgba(255, 255, 255, 0), #0a8de7, rgba(255, 255, 255, 0)) 1 1
            display flex
            align-items flex-end
            margin-bottom 6px
            font-size 16px
    .ico_right
          float right
          display flex
          align-items center
          .close
             border 1px dashed red
             width 17px
             height 17px
</style>