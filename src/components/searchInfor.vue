<template>
    <div class="searchInfor">
       <div class="left">
           <template v-for="(item,key) in inputInfors">
               <slot :item="item" :index="key"></slot>
           </template>
       </div>
        <div class="right">
            <button class="btn" @click="submit">
                <img src="/img/list-search-btn.png">
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "searchInfor",
        props:{
            inputInfors:{ //input信息
                type:Array,
                default:()=>[]
            }
        },
        methods:{
            submit(){
                this.$emit("onSubmit");
            }
        }
    }
</script>

<style lang="stylus" scoped>
.searchInfor
      overflow hidden
      width 98.5%
      margin 0 auto
      .left,.right
          float left
          height 30px
          border 1px dashed red
      .right
        .btn
            width 30px
            height 30px
            border 1px solid red
            display flex
            justify-content center
            align-items center
            border-radius 4px
            cursor pointer
            background -webkit-linear-gradient(left, rgba(0, 145, 255, 1), rgba(0, 178, 255, 1));
            background -o-linear-gradient(left, rgba(0, 145, 255, 1), rgba(0, 178, 255, 1));
            background -moz-linear-gradient(left, rgba(0, 145, 255, 1), rgba(0, 178, 255, 1));
            background linear-gradient(left, rgba(0, 145, 255, 1), rgba(0, 178, 255, 1));
</style>