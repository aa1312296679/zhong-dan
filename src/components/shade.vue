<template>
    <div v-show="showState" class="worksectionMarkDialog" @click="hide"></div>
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