<template>
    <div v-show="showState" class="dialog_wrapper">
        <work-wrapper :stylObj="workWrapperStyl">
            <!--头部信息-->
            <work-shop-header :infor="getHeaderInfor(0)" @onClose="closeHandle"></work-shop-header>
            <!--文字信息-->
            <template v-for="(item,index) in dialogInfors">
                <div class="workShopName" :key="`workShopName${index}`">
                    <span class="txt_one">{{item.txtLeft}}:</span>
                    <!--文字类型-->
                    <template v-if="item.type==='text'">
                        <span v-for="(item,index) in item.txtChildren" :key="`txt_two${index}`" class="txt_two">{{item}}</span>
                    </template>
                    <!--input类型-->
                    <template v-if="item.type==='input'">
                        <input :style="item.styl" class="worksection_mark_input" :placeholder="inputTexts[getInputTextIndex(item.id)].normal" v-model="inputTexts[getInputTextIndex(item.id)].curValue"/>
                    </template>
                </div>
            </template>
            <!--评分--->
            <div class="button_wrapper">
                <div class="buttons">
                    <b-button :_btnText="buttons[0]['text']" @btnHandle="btnHandle('submit')"></b-button>
                    <b-button :_btnText="buttons[1]['text']" :_btnStyl="buttons[1]['styl']" @btnHandle="btnHandle('cancel')"></b-button>
                </div>
            </div>
        </work-wrapper>
    </div>
</template>

<script>
    import WorkWrapper from "components/workWrapper";
    import WorkShopHeader from "components/workShopHeader";
    import BButton from "components/BButton"
    import {getControlIndex} from "js/util.js";
    import showState from "common/mixins/showState";

    export default {
        name: "employeeWarn",
        mixins:[showState],
        data(){
          return {
              buttons:[{text:"确认"},{text:"取消",styl:{float:"right",color:"#00b2ff",border:"1px solid #00b2ff",background:"transparent"}}],
             dialogInfors:[
                  {id:"01",txtLeft:"车间名称",txtChildren:["乙车间"],type:"text"},
                  {id:"02",txtLeft:"评分",type:"input",styl:{width:"144px"}}
              ],
              headerInfors:[{img:"/img/main-outin-detail-icon.png", txt:"在岗情况评分", isClose:true}],
              workWrapperStyl:{width:'101.7%',height:'102%',left:'-3.2px',top:'-3px'},
              inputTexts:[{id:"02",curValue:"",normal:"最高分100"}]
          }
        },
        created(){
            if(this._showState){
                this.show();
                return false
            }
            this.hide();
        },
        methods:{
            closeHandle(){
                this.$emit("dialogClose")
            },
            /**
             * 获取头部组件的头部信息
             * **/
            getHeaderInfor(index){
                return this.headerInfors[index];
            },
            /***
             * 提交处理
             * @method btnHandle
             * @param btnType 按钮类型
             */
            btnHandle(btnType){
                if(btnType==="submit"){
                    if(this.inputTexts[0].curValue!==""){
                        console.log('提交用户信息');
                    }
                    return false
                }
                console.log('取消处理');
            },
            /***
             * 动态构建每个元素的左内边距
             * 第二行-第n行每个元素的行内样式
             */
            setStyl(index){
                // 行内样式
                let styl={};

                // 当前元素为第二行-第n行元素
                if(index>2) {
                    styl['marginTop']='4px';
                }

                //当前元素不是当前行第一个元素
                if(((index+1)%4!==1)||(index%4!==1)){
                    styl['paddingLeft']='4px';
                }
                console.log(styl)
                return  styl;
            },
            /***
             * 处理inputTxt信息
             **/
            txtHandle(txtVal){
                this.nameVal=txtVal;
            },
            /***
             * option点击处理
             * @activeIndex 被点击的select控件索引和select的option索引
             * **/
            selectHandle({componentIndex,optionIndex}){
                //获取触发option切换的select控件信息
                let tempControl=this.searchControls[componentIndex];
                //所有类型的控件信息
                let controls=this.searchControls;
                //数据筛选条件
                let objName="txt";
                //控件类型
                let controlType=3;
                //select控件基于select集的索引
                let activeOtionIndex=getControlIndex(controls,tempControl,objName,controlType);
                this.activeOptionIndexs[activeOtionIndex]=optionIndex;
            },
            /**
             * 处理日历信息
             * @param controls 所有控件信息
             * @param curControl 当前控件信息
             * @param calendarVals 日历信息集合
             * @param objName 数据筛选条件
             * @param objType 查找的数据类型
             * @return 日历控件基于日历类型控件集的日历索引
             * */
            setCalendarControl(controls,curControl,calendarVals,objName,objType){
               let tempIndex=getControlIndex(controls,curControl,objName,objType);
               //控件类型
               let {curControlType} =curControl;
                // 控件类型为日历类型并已找到日历控件对应的日历信息
                if((tempIndex!==-1)){
                   return  calendarVals[tempIndex]
                // 控件类型为日历类型但日历信息未找到
                }else if((tempIndex===-1)&&(curControlType===2)){
                    let temp = {year:'',month:'',day:''};
                    return temp;
                }
                // 控件类型不是日历类型并且控件类型为文本框
               return  this.nameValue;
            },
            /**
             * 弹窗关闭
             * **/
            dialogColose(){
                this.$emit("dialogClose")
            },
            /***
             * 设置inputText的双向绑定值
             * @param id 元素唯一标识
             */
            getInputTextIndex(id){
               let tempInputTexts =this.inputTexts;
               let tempInputTextsSize=this.inputTexts.length;
               let curIndex=-1;
               for (let i=0;i<tempInputTextsSize;i++){
                     if(tempInputTexts[i]['id']===id){
                         curIndex=i;
                     }
                }
               return curIndex;
            }
        },
        components: { WorkShopHeader, WorkWrapper, BButton}
    }
</script>

<style lang="stylus" scoped>
.dialog_wrapper
    width 300px
    height 249.6px
    background rgba(12, 32, 53, 0.6)
    border-radius 6px
    transition: ease-in-out 0.3s
    box-shadow: -2px 0px 2px rgba(79, 173, 233, 0.6) inset, 0px -2px 2px rgba(79, 173, 233, 0.6) inset, 2px 0px 2px rgba(79, 173, 233, 0.6) inset, 0px 2px 2px rgba(79, 173, 233, 0.6) inset
    position fixed
    left: 50%
    top 150.875px
    transform: translateX(-50%) /* 50%为自身尺寸的一半 */
    -webkit-transform: translateX(-50%)
    z-index 1000
    .workShopName
        border 1px dashed red
        padding-left 20%
        margin 14px 0
        .txt_one,.txt_two
            border 1px solid blue
            color #fff
        .txt_two
            margin-left 4px
         .worksection_mark_input
                height: 30px;
                border-radius: 4px;
                outline: 0;
                margin-left: 8px;
                vertical-align: middle;
                text-indent: 6px;
                border: 1px solid #00b2ff;
                background: none;
                color: #FFFFFF;
    .button_wrapper
        width 98%
        margin 0 auto
        border 1px dashed red
        overflow hidden
        .buttons
            margin 0 auto
            overflow hidden
            width 210px
            border 1px solid orange
            .button
                float left
</style>