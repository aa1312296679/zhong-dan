<template>
    <div class="workshop_inspection">
        <work-wrapper>
            <!--头部信息-->
            <work-shop-header :infor="headerInfor" @onClose="workShopInspectionCloseHandle"></work-shop-header>
            <!--名称-->
            <template v-for="(item,index) in testInfor">
                <WorkshopDetailsContent :key="`worksshopDetails${index}`" :infor="item"></WorkshopDetailsContent>
            </template>
            <!--评分--->
          <b-button :_btnText="button['text']" @btnHandle="btnHandle('score')"></b-button>
        </work-wrapper>
        <!--遮罩-->
        <shade ref="shade" @onShadeClick="shadeClickHandle"></shade>
        <!--弹窗-->
        <d-dialog ref="dialog" @onDialogClose="dialogCloseHandle" @onDialogBtn="btnHandle"></d-dialog>
    </div>
</template>2

<script>
    import WorkWrapper from "components/workWrapper";
    import WorkShopHeader from "components/workShopHeader";
    import WorkshopDetailsContent from "components/WorkshopDetailsContent"
    import BButton from "components/BButton"
    import {dialogHandles} from "js/util.js";
    import shade from "components/shade";
    import DDialog from "components/DDialog"
    export default {
        name: "employeeWarn",
        data(){
          return {
              dialog: {
                 state:false, //弹窗和遮罩的显示状态true显示 false隐藏
                 shadeObj:undefined, //遮罩引用
                 dialogObj:undefined //弹窗引用
              },
              button:{text:"评分"}, //按钮信息
              testInfor:[ //文字信息
                  {txtLeft:"车间名称",txtChildren:["乙车间"]},
                  {txtLeft:"车间名称",txtChildren:["汪驲、李梦凡、周杰、王伟、刘旭张旭升、谢天宝、田曾、李虎、赵山汪驲、汪驲、汪驲、汪驲、汪驲汪驲、汪驲、汪驲"],styl:{padding:"11.6px 0"}},
                  {txtLeft:"人员进出次数",txtChildren:["68次"]},
                  {txtLeft:"评分",txtChildren:["未评分"]}
              ],
              // 头部信息
              headerInfor:{img:"/img/main-outin-detail-icon.png", txt:"车间详情", isClose:true}
          }
        },
        mounted(){
            // 获取弹窗对象
            this.dialog.shadeObj=this.$refs.shade;
            // 获取弹窗对象
            this.dialog.dialogObj=this.$refs.dialog;
        },
        methods:{
            /***
             * 车间详情模块的关闭按钮点击处理中间层
             * @method closeHandle
             * **/
            workShopInspectionCloseHandle(){
                this.btnHandle('workShopInspectionClosed');
            },
            /***
             * 遮罩点击处理中间层
             * @method shadeClickHandnle
             **/
            shadeClickHandle(){
                this.btnHandle("shadeClick");
            },
            /**
             * 弹窗关闭按钮点击处理中间层
             * @method dialogCloseHandle
             **/
            dialogCloseHandle(){
                this.btnHandle('dialogClose');
            },
            /**
             * 弹窗取消按钮和提交按钮点击处理中间层
             * @method dialogBtnHandle
             * @param btnType 弹窗被点击的按钮类型
             * **/
            dialogBtnHandle(btnType){
                if(btnType==='submit'){
                    console.log("弹窗被点击按钮为提交")
                }else if(btnType==='cancel'){
                    this.btnHandle(btnType);
                }
            },
            /**
             * 按钮点击处理
             * @method btnHandle
             * @param btnType 按钮的事件类型
             * **/
            btnHandle(btnType){
                console.log(btnType)
                // 提交按钮点击处理
                if(btnType==="submit"){
                    console.log('提交用户信息');
                // 取消按钮点击处理
                }else if(btnType==="cancel"){
                    this.dialogShadeHandle('dialogHide');
                // 评分按钮点击处理
                }else if(btnType==="score"){
                    //显示弹窗和遮罩
                    this.dialogShadeHandle('dialogShow');
                // 车间详情模块的关闭按钮点击处理
                }else if(btnType==="workShopInspectionClosed"){
                    this.$emit("onClose");
                // 遮罩点击处理
                }else if(btnType==="shadeClick"){
                    this.dialogShadeHandle('dialogHide');
                // 窗口关闭点击处理
                }else if(btnType==="dialogClose"){
                    this.dialogShadeHandle('dialogHide');
                }
            },
            /**
             * 显示弹窗和遮罩或关闭弹窗和遮罩
             * @method dialogShadeHandle
             * @param handleType 事件类型
             * **/
            dialogShadeHandle(handleType){
                dialogHandles[handleType].call(this);
            }
        },
        components: {shade, WorkShopHeader, WorkWrapper, WorkshopDetailsContent, BButton, DDialog}
    }
</script>

<style lang="stylus" scoped>
.workshop_inspection
    width 400px
    height 311px
    float left
    margin-top 50px
    margin-left 30px
    background rgba(12, 32, 53, 0.6)
    border-radius 6px
    transition: ease-in-out 0.3s
    box-shadow: -2px 0px 2px rgba(79, 173, 233, 0.6) inset, 0px -2px 2px rgba(79, 173, 233, 0.6) inset, 2px 0px 2px rgba(79, 173, 233, 0.6) inset, 0px 2px 2px rgba(79, 173, 233, 0.6) inset
    position relative
    z-index 1000
    .workList_content
        width:101.7%
        height:102%
        left:-3.2px
        top:-3px
</style>