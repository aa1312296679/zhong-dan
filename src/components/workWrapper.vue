<template>
    <div class="workList_content" :style="stylObj">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "workWrapper",
        props:{
            stylObj: { //style信息
                type:Object,
                default:()=>{
                   return  {}
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
.workList_content
    background: url("/img/righttop-corner.png") top right no-repeat,
            url("/img/lefttop-corner.png") top left no-repeat,
            url("/img/leftbottom-corner.png") bottom left no-repeat,
            url("/img/rightbottom-corner.png") bottom right no-repeat;
    position: absolute;
</style>