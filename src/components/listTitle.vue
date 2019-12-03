<template>
    <div class="listTitle" :style="listItemStyl">
        <span>{{titleInfor.txt}}</span>
    </div>
</template>
<script>
    export default {
        name: "listTitle",
        props:{
            titleInfor:{ //title信息
                type:Object,
                default:()=>{
                    return {txt:"测试文字",styl:{width:"132px",borderTopRightRadius:"6px"}}
                }
            },
            rowsCount:{ //title总列数
                type: Number,
                default:0
            }
        },
        data(){
            return {
                maxWidth:100, //最大宽 单位百分比
                listItemStyl:{} //list_item元素的行内样式
            }
         },
        created() {
            // 获取外部的行内样式
            this.listItemStyl=this.titleInfor.styl;
            // 如果外部没有设title行内样式则动态计算
            if(!this.listItemStyl['width']){
                this.listItemStyl['width']=`${this.itemWidth}%`;
            }
        },
        computed: {
            itemWidth(){
                let curWidth = this.maxWidth/this.rowsCount;
                curWidth = (Math.floor(curWidth*100)/100);
                return  curWidth;
            }
        }

    }
</script>

<style lang="stylus" scoped>
.listTitle
    cursor pointer
    text-align center
    color #83e0ff;
    background rgba(7, 45, 84, 0.8);
    float left
    height 36px
    line-height 36px
    font-weight bold
</style>