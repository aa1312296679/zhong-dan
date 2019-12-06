<template>
  <div class="header">
     <div class="logo_wrapper">
       <img class="logo" src="/img/logo.png">
     </div>
    <div class="header_basic_info">
      <div class="item-infor item_line"><span class="txt">{{this.nowDate.HH}}:{{this.nowDate.mm}}:{{this.nowDate.ss}}</span></div>
      <div class="item-infor item_line"><span class="txt">{{this.nowDate.yy}}/{{this.nowDate.MM}}/{{this.nowDate.dd}}</span></div>
      <div class="item-infor">
          <div class="weather">
              <img src="/img/weather.png"/>
          </div>
          <span class="txt">{{temperature}}℃</span>
      </div>
      <div class="item-infor last_item">
          <span class="txt">全屏</span>
      </div>
    </div>
     <slot></slot>
  </div>
</template>

<script>
export default {
  name: "hheader",
  props: {
    nowDate: { //当前时间
        type:Object,
        required: true
    },
    temperature: { //气温
       type:Number,
       default:0
    }
  }
};
</script>

<style scoped lang="stylus">
.header
  width 100%
  height 7.2rem
  padding-top .8rem
  background: -webkit-linear-gradient(bottom, rgba(0, 21, 50, 0), rgba(0, 21, 50, 1))
  background: -o-linear-gradient(bottom, rgba(0, 21, 50, 0), rgba(0, 21, 50, 1))
  background: -moz-linear-gradient(bottom, rgba(0, 21, 50, 0), rgba(0, 21, 50, 1))
  background: linear-gradient(bottom, rgba(0, 21, 50, 0), rgba(0, 21, 50, 1))
  padding-left 1.6rem
  padding-right 2.4rem
  position relative
  .logo_wrapper
    width 37.2rem
    height 4rem
    float left
  .header_basic_info
    font-size: 1.28rem
    float right
    min-width 16rem
    display flex
    .item-infor
       height 3.648rem
       line-height 3.648rem
       display flex
       align-items center
       .txt
          color white
       .weather
           width 2.08rem
           height 2.08rem
           margin-right 1.12rem
           img
              display block
              width 100%
              height 100%
    .item_line
        &::after
            width .16rem
            height 1.6rem
            margin 0 .8rem
            content ""
            background #FFFFFF
            display block
    .last_item
        padding-left 1.6rem
        position relative
        &::before
            width 1.6rem
            height 1.6rem
            content ""
            display block
            background url("/img/max-screen.png") center center no-repeat
            position absolute
            left 0
</style>
