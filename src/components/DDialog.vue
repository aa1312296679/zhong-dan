<template>
    <div v-show="showState" class="dialog_wrapper">
        <work-wrapper :stylObj="workWrapperStyl">
            <!--头部信息-->
            <work-shop-header :infor="getHeaderInfor(0)" @onClose="closeBtnHandle"></work-shop-header>
            <!--文字信息-->
            <template v-for="(item,index) in dialogContents">
                <div class="workShopName" :key="`workShopName${index}`">
                    <span class="txt_one">{{item.txtLeft}}:</span>
                    <!--文字类型-->
                    <template v-if="item.type==='text'">
                        <span v-for="(item,index) in item.txtChildren" :key="`txt_two${index}`" class="txt_two">{{item}}</span>
                    </template>
                    <!--input类型-->
                    <template v-if="item.type==='input'">
                        <input :style="item.styl" class="worksection_mark_input" :placeholder="item.normalValue" v-model="item.curValue"/>
                    </template>
                </div>
            </template>
            <!--评分--->
            <div class="button_wrapper">
                <div class="buttons">
                    <template v-for="(item,index) in buttons">
                        <b-button :key="`button${index}`" :_btnText="item['text']"  :_btnStyl="item['styl']" :_handleType="item['handleType']" @btnHandle="dialogBtnHandle"></b-button>
                    </template>
                </div>
            </div>
        </work-wrapper>
    </div>
</template>

<script>
    import WorkWrapper from "components/workWrapper";
    import WorkShopHeader from "components/workShopHeader";
    import BButton from "components/BButton"
    import showState from "common/mixins/showState";

    export default {
        name: "employeeWarn",
        mixins:[showState],
       props:{
         _headerInfors:{ //弹窗头部信息
             type:Array,
             default(){
                 return []
             }
         },
         _showState:{ //弹窗显示状态
             type:Boolean,
             default() {
                 return false;
             }
         },
         _dialogContents:{ //弹窗内容
             type:Array,
             default(){
                 return []
             }
         },
          _buttons:{ //按钮信息
              type:Array,
              default(){
                  return []
              }
          }
       },
        data(){
          return {
             // 弹窗按钮信息
             buttons:[],
             // 弹窗内容
              dialogContents:[],
              //弹窗头部信息
              headerInfors:[],
              // 弹窗行内样式
              workWrapperStyl:{width:'101.7%',height:'102%',left:'-3.2px',top:'-3px'}
          }
        },
        created(){
            if(this._showState){
                this.show();
                return false
            }

            //初始化弹窗头部信息
            this.headerInfors=this._headerInfors;
            //初始化弹窗内容信息
            this.dialogContents=this._dialogContents;
            //初始化弹窗按钮信息
            this.buttons=this._buttons;

            this.hide();
        },
        methods:{
            /***
             * 弹窗关闭点击处理
             * @method closeHandle
             * **/
            closeBtnHandle(){
                this.$emit("onDialogClose");
            },
            /**
             * 获取头部组件的头部信息
             * **/
            getHeaderInfor(index){
                return this.headerInfors[index];
            },
            /***
             * 弹窗的button按钮点击处理
             * @method dialogBtnHandle
             * @param btnType 用户点击的按钮类型
             * **/
            dialogBtnHandle(btnType){
                //将按钮信息传给父级进行点击处理
                this.$emit("onDialogBtn",btnType);
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
        padding-left 20%
        margin 14px 0
        .txt_one,.txt_two
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
        overflow hidden
        .buttons
            margin 0 auto
            overflow hidden
            width 210px
            .button
                float left
</style>