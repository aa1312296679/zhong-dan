<template>
    <div class="searchControl" :style="styl">
       <span class="title_txt">{{controlInfor.txt}}:</span>
       <!--文本输入框或日历选项输入框-->
       <input v-if="(controlInfor.controlType===1)||(controlInfor.controlType===2)" :disabled="isDisabled" :style="setStyl" :class="inputClass" v-model="curTxtVal"/>
       <!--下拉框-->
       <select v-if="controlInfor.controlType===3" class="input_select" :style="setStyl" v-model="curSelectVal">
           <option :key="key" v-for="(item,key) in controlInfor.options" :selected="selectedOption(key,activeOptionIndex)" :value="item.val">&nbsp;{{item.txt}}</option>
       </select>
       <img v-if="controlInfor.controlType===2" class="ico" :src="curIco">
    </div>
</template>

<script>
    export default {
        name: "searchControl",
        props:{
            controlInfor:{ //搜索控件的信息 控件类型1文字输入框 2日历 3下拉框
                type:Object,
                default:()=>{}
            },
            activeOptionIndex:{ //已被选中的option索引
                type:Number,
                default:0
            },
            txtVal:{ //input输入框的文字信息
                type:[String,Object],
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
                curTxtVal:this.setInputVal(this.controlInfor), //当前输入框信息
                curSelectVal:"", //当前select信息
                curIco:"" //日历图标
            }
        },
        created() {
            //curIco 日历的图标信息初始化
            let {ico}=this.controlInfor;
            this.curIco=ico;
            if(!this.controlInfor.options){
                return false;
            }
            // select信息初始化
            this.curSelectVal=this.controlInfor.options[this.activeOptionIndex].val;
        },
        computed:{
          inputClass(){
              let {controlType}=this.controlInfor;
              return (controlType===2)&&"input_calendar"||(controlType===1)&&"input_txt";
          },
          isDisabled(){
              let {controlType}=this.controlInfor;
              return controlType===2;
          },
          setStyl(){
              let {styl} = this.controlInfor;
              if(!styl){
                  return {};
              }
              return styl;
          }
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
            },
            /**
             * 构建input的value值
             * @param controType 控件类型
             */
            setInputVal({controlType}){
                if(controlType!==2){
                    return this.txtVal;
                }

                return `${this.txtVal['year']}-${this.txtVal['month']}-${this.txtVal['day']}`;
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
    position relative
    .ico
        border 1px dashed blue
        display block
        position absolute
        left 81px
        width 18px
        height 18px
    .title_txt,.input_txt,.input_select,.input_calendar
        border 1px solid #67b9ff
        background: none
        color #FFFFFF
        border-radius 4px
    .input_txt,.input_select,.input_calendar
        width 96px
        height 30px
        margin-left 9px
    .title_txt
        border 1px dashed red
    .input_txt,.input_calendar
        text-indent 6px
    .input_calendar
        width 160px
        padding-left: 22px
        line-height: 33px
    .input_select
        appearance: none
        -moz-appearance: none
        -webkit-appearance: none
        background-color transparent
        background-image: url("/img/select-arrow.png")
        background-position 80px center
        background-repeat no-repeat
        padding-left 3px
        option
            background #072d54
</style>