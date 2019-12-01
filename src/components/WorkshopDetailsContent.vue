<template>
    <div class="content" :style="contentStyl" v-if="isInfor">
        <div class="content_left">{{leftText}}</div>
        <div class="content_right">
            <span v-for="(item,index) in rightTexts" :key="`txt${index}`" class="txt">{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WorkshopDetailsContent",
        props:{
          infor:{ //详情信息
            type:Object,
            default:()=>{return {}}
          }
        },
        data(){
            return {
                leftText:"",//左侧文字信息
                rightTexts:[],//右侧文字信息
                contentStyl:{} //详情信息内容盒子的行内样式
            }
        },
        created(){
          //左侧文字信息初始化
          this.leftText=this.infor.txtLeft;
          //右侧文字信息初始化
          this.rightTexts=this.infor.txtChildren;
        },
        computed:{
            isInfor(){ //判断属性是否为空
                return  Object.keys(this.infor).length
            }
        }
    }
</script>

<style lang="stylus" scoped>
.content
    padding 0 20.4px
    border 1px dashed red
    margin 0 auto
    width 98%
    color #fff
    overflow hidden
    .content_left,.content_right
         float left
    .content_left
        text-align right
        width 24.8%
        border 1px solid blue
    .content_right
        max-width 75.2%
        width auto
        border 1px solid orange
        padding-left 20px
        max-height 100px
</style>