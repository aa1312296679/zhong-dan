<template>
    <div class="searchControl" :style="styl">
        <span class="title_txt">{{controlInfor.txt}}:</span>
       <!--文字输入框-->
       <input v-if="controlInfor.controlType===1" class="input_txt" v-model="curTxtVal"/>
       <!--下拉框-->
       <select v-if="controlInfor.controlType===3" class="input_select" v-model="curSelectVal">
           <option :key="key" v-for="(item,key) in controlInfor.options" :selected="selectedOption(key,activeOptionIndex)" :value="item.val">&nbsp;{{item.txt}}</option>
       </select>
    </div>
</template>

<script>
    export default {
        name: "searchControl",
        props:{
            controlInfor:{ //搜索控件的信息 控件类型1 文字输入框 2 下拉框
                type:Object,
                default:()=>{}
            },
            activeOptionIndex:{ //已被选中的option索引
                type:Number,
                default:0
            },
            txtVal:{ //input输入框的文字信息
                type:String,
                default:""
            },
            styl:{ //行内样式
                type:Object,
                default:()=>{}
            },
            index:{ //控件件索引
                type:Number,
                default:-1
            }
        },
        watch:{
            curTxtVal(val){
                this.curTxtVal=val;
                this.txtHandle(this.curTxtVal);
            },
            curSelectVal(val){
                this.curSelectVal=val;
                //根据select信息找到与select信息匹配的option并获取到该option的索引
                let curValIndex=this.searchIndex(this.controlInfor.options,this.curSelectVal);
                this.optionHandle(this.index,curValIndex);
            }
        },
        data(){
            return{
                curTxtVal:this.txtVal, //当前输入框信息
                curSelectVal:"" //当前select信息
            }
        },
        created() {
            console.log(this.activeOptionIndex);
            if(!this.controlInfor.options){
                return false;
            }
            // select信息初始化
            this.curSelectVal=this.controlInfor.options[this.activeOptionIndex].val;
        },
        methods:{
            /**
             * 文本框信息处理
             */
            txtHandle(val){
                this.$emit("onTxt",val);
            },
            /***
             * 构建初始化时的已选中的option
             * @param index
             * @param activeIndex
             * @returns {string}
             */
            selectedOption(index,activeIndex){
               return (index===activeIndex)?"selected":"";
            },
            /***
             * option点击处理
             * @param componentIndex 当前的组件索引
             * @param optionIndex 被点击的option的option索引
             */
            optionHandle(componentIndex,optionIndex){
                if(componentIndex===-1){
                    this.$emit("onSelect",optionIndex);
                }else {
                    this.$emit("onSelect",{componentIndex,optionIndex});
                }
            },
            /***
             * 查找被选中的option的option索引
             * @param arr
             * @param val
             * @returns {boolean|*}
             */
            searchIndex(arr,val) {
                // 元素总数
                let max = arr.length;
                for(let i=0;i<max;i++){
                    if(arr[i]['val']===val){
                        return i;
                    }
                }
                return  -1;
            }
        }
    }
</script>

<style lang="stylus" scoped>
.searchControl
    font-size 14px
    color #fff
    overflow hidden
    float left
    padding 0 16px
    display flex
    justify-content center
    align-items center
    .title_txt,.input_txt,.input_select
        border 1px solid #67b9ff
        background: none
        color #FFFFFF
        border-radius 4px
    .input_txt,.input_select
        width 96px
        height 30px
        margin-left 9px
    .title_txt
        border 1px dashed red
    .input_txt
        text-indent 6px
    .input_select
        appearance: none
        -moz-appearance: none
        -webkit-appearance: none
        background-color transparent
        background-image: url("/img/select-arrow.png")
        background-position right center
        background-repeat no-repeat
        padding-left 3px
        option
            background #072d54
</style>