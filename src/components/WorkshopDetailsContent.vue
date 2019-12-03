<template>
    <div class="content" :style="styles[0]" v-if="isInfor">
        <div class="content_left" :style="styles[1]">{{leftText}}</div>
        <div ref="contentRight"  class="content_right">
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
                styles:[{},{}] //详情信息内容盒子的行内样式,左盒子行内样式
            }
        },
        created(){
          //左侧文字信息初始化
          this.leftText=this.infor.txtLeft;
          //右侧文字信息初始化
          this.rightTexts=this.infor.txtChildren;
          // console.log(this.contentLeftHeight);
            this.$set(this.styles,0,this.infor.styl);
        },
        mounted() {
            console.log(this.leftText);
            this.contentLeftHeight=this.getDomHeight(this.$refs.contentRight);
            console.log(this.$refs.contentRight.clientHeight);
            this.styles[1]['height']=`${this.contentLeftHeight}px`;
            this.styles[1]['lineHeight']=`${this.contentLeftHeight}px`;
            console.log(this.contentLeftHeight);
            console.log(this.styles[1]);
            this.$set(this.styles,1,this.styles[1]);
        },
        computed:{
            isInfor(){ //判断属性是否为空
                return  Object.keys(this.infor).length
            },
            getDomHeight(){
                return (dom) => dom.offsetHeight
            }
        }
    }
</script>

<style lang="stylus" scoped>
.content
    padding 0 20.4px
    margin 0 auto
    width 98%
    color #fff
    overflow hidden
    .content_left,.content_right
         float left
    .content_left
        text-align right
        width 24.8%
    .content_right
        max-width 75.2%
        width auto
        padding-left 20px
        max-height 100px
</style>