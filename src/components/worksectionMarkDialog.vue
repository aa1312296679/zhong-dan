<template>
    <div v-show="dialogState" class="worksectionMarkDialog">
        弹窗
    </div>
</template>

<script>
    export default {
        name: "worksectionMarkDialog",
        props:{
            _dialogState:{ //弹窗状态
                type:Boolean,
                default:true
            }
        },
        data(){
            return {
                dialogState:this._dialogState
            }
        }
    }
</script>

<style lang="stylus" scoped>
.worksectionMarkDialog
    width 100%
    height 100%
    background-color: black;
    position: fixed;
    left: 0;
    top: 0;
    opacity: 0.8;
    z-index: 500;
</style>