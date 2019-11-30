<template>
    <div class="content">
        <span class="text_prompt">{{txtOne}}</span>
        <span class="text_content" :style="styl">{{txtTwo}}</span>
        <div class="text_ico_wrapper"><img v-show="isTextIco" class="text_ico" :src="textIco"/></div>
    </div>
</template>

<script>
    export default {
        name: "entryAndExitContent",
        props:{
          contentInfor:{ //行内容
              type:Object,
              required: true
          }
        },
        data(){
            return  {
                txtOne:"",
                txtTwo:"",
                icoActive:"",
                icoImg:"",
                mouseState:false, //鼠标漂浮状态
                styl:{}
            }
        },
        created(){
            console.log(this.contentInfor);
           let {prompt,content,icoActive,ico,styl} =this.contentInfor;
           this['txtOne']=prompt;
           this['txtTwo']=content;
           this['icoActive']=icoActive;
           this['icoImg']=ico;
           if(!styl){
               return false
           }
           this['styl']=styl
        },
        computed:{
            textIco(){ //ico文字图标
                return this.mouseState?this.icoActive:this.icoImg
            },
            isTextIco(){
                return this["icoImg"]!==""&&this["icoActive"]!==""
            }
        }
    }
</script>

<style lang="stylus" scoped>
.content
    overflow hidden
    width 100%
    padding-top 10px
    position relative
    color #fff
    font-family: "Digiface"
    font-weight: bold
    .text_prompt,.text_content,.text_ico_wrapper
        float left
    .text_content
        margin-left 10px
    .text_ico_wrapper
        width 14px
        height 14px
        position: absolute
        right 0
        bottom 0
        .text_ico
            width 100%
            height 100%
            display block
</style>