<template>
    <div class="content_wrapper">
        <div class="content">
            <template v-if="infors.length">
                <template v-for="(item,key) in infors">
                    <div :key="key" :class="['content_item',setRight(key,4),setContentMargin(key,4,infors.length)]">
                        <div :class="['progress_wrapper',item.classColor]">
                             <span class="progress">
                                <span :class="['cur_progress']" :style="setCurProgressStyl(item)">{{item.curProgress}}/{{item.maxProgress}}</span>
                             </span>
                        </div>
                        <span class="txt">{{item.txt}}</span>
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "workShopListContent",
        props:{
            infors: { //车间列表信息
                type:Array,
                default:()=>[]
            }
        },
        methods:{
            /**
             * 设置右边距
             * **/
            setRight(index,inforNumber){
               return ((index+1)%inforNumber!==0)?"content_item_right":"";
            },
            /**
             * 处理x和y轴的样式兼容
             * @param index 当前元素的元素索引
             * @param inforNumber 每行显示的元素个数
             * @param maxNum 元素总个数
             * @returns {string}
             */
            setContentMargin(index,inforNumber,maxNum){
                let calssName="";
                // 处理x偏移的css兼容
                // 最后一行元素尚未达到指定个数
                if(maxNum%inforNumber!==0){
                    //最后一行元素未达到指定个数
                    //最后一行元素的元素个数
                    let lastNum=maxNum%inforNumber;
                    // 最后一行元素第一个元素的元素下标
                    let firstIndex =(maxNum-lastNum);
                    // 最后一行元素只有一个元素时为最后一行元素的尾部元素设置尾部样式
                    if((index===firstIndex)&&(lastNum===1)){
                        calssName+="last_margin_right last_margin_left";
                        // 最后一行元素未达到指定个数，但尾行元素>1个元素
                    }else if(lastNum>1&&index===(maxNum-1)){
                        calssName+="last_margin_right";
                    }else if(lastNum>1&&index===firstIndex){
                        calssName+="last_margin_left";
                    }
                }

                //处理y偏移的css兼容
                //第一行元素的最后一个元素的元素索引
               let firstRowLastindex=inforNumber-1;
               if(index>firstRowLastindex){
                   calssName+=" content_top";
               }

                return calssName;
            },
            setCurProgressStyl(item){
                let stylObj = {};
                // stylObj['border']=`1px solid ${item.borderColor}`;
                stylObj['width']=(item.curProgress<item.maxProgress)?`${((item.curProgress/item.maxProgress)*100)}%`:"100%";
                return stylObj;
            }
        }
    }
</script>

<style lang="stylus" scoped>
.content_wrapper,.content
    width 390px
.content_wrapper
    border 1px dashed red
    margin 0 auto
    .content
        display flex
        justify-content center
        flex-flow wrap
        align-content: flex-start
        margin 10px 0
        .content_item_right
            margin-right 16px
        .last_margin_right
            margin-right auto
        .last_margin_left
            margin-left 11px
        .content_top
            margin-top 18px
        .content_item
            width 80px
            font-size 12px
            color #fff
            .progress_wrapper
                width 100%
                border-radius 4px
                overflow hidden
                .cur_progress
                    height 28px
                    display flex
                    justify-content center
                    align-items center
             .txt
                 width 100%
                 margin-top 6px
                 display: block
                 text-align center
         .content_item_top
            margin-top 18px
</style>