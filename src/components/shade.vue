<template>
    <div v-show="showState" class="shade" @click="shadeClickHandle"></div>
</template>

<script>
    import showState from "common/mixins/showState";
    export default {
        name: "worksectionMarkDialog",
        mixins:[showState],
        created(){
          if(this._showState){
              this.show();
              return false
          }
          this.hide();
        },
        methods:{
            /**
             * @method 遮罩点击处理
             */
            shadeClickHandle(){
                 this.$emit("onShadeClick")
            }
        }
    }
</script>

<style lang="stylus" scoped>
.shade
    width 100%
    height 100%
    background-color: black;
    position: fixed;
    left: 0;
    top: 0;
    opacity: 0.8;
    z-index: 500;
</style>