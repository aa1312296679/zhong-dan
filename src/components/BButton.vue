<template>
    <div class="button">{{btnText}}</div>
</template>

<script>
    export default {
        name: "burtton",
        props:{
            _btnText:{
                type:String,
                default:""
            }
        },
        data(){
            return {
                btnText:this._btnText,
                btnStyl: {} //行内样式
            }
        }
    }
</script>

<style lang="stylus" scoped>
.button
    width 84px
    height 30px
    line-height 30px
    border-radius: 4px;
    border: none;
    outline: 0;
    background: #00b2ff;
    color: #FFFFFF;
    cursor: pointer;
    text-align center
    margin-left auto
    margin-right auto
    margin-top 30px
</style>