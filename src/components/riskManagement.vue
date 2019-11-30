<template>
    <div class="employee_warn">
        <work-wrapper :stylObj="workWrapperStyl">
            <!--头部信息-->
            <work-shop-header :infor="getHeaderInfor(0)" @onClose="closeHandle"></work-shop-header>
            <!--信息搜索-->
            <search-infor :inputInfors="searchControls" @onSubmit="submitHandle">
                <template scope="infors">
                   <search-control :styl="setStyl(infors.index)" :index="infors.index" :controlInfor="infors.item" :activeOptionIndex="0" :txtVal="setCalendarControl(searchControls,searchControls[infors.index],inputTextVales,'txt',infors['item']['controlType'])" @onTxt="txtHandle" @onSelect="selectHandle"></search-control>
                </template>
            </search-infor>
            <list :titles="workTitles" :contents="workContents"></list>
            <!--底部分页页码-->
            <div class="zpageNav_wrapper">
                <zpage-nav :curPage="page" :page-size="pageSize" :total="total" :max-page="maxPage"  :prevHtml="prev" :nextHtml="next" :pagehandler="pageHandler"></zpage-nav>
            </div>
        </work-wrapper>
    </div>
</template>

<script>
    import WorkWrapper from "components/workWrapper";
    import WorkShopHeader from "components/workShopHeader";
    import SearchInfor from "components/searchInfor";
    import SearchControl from "components/searchControl";
    import List from "components/list";
    import ZpageNav from "components/zpageNav";
    import {getControlIndex} from "js/util.js";

    export default {
        name: "employeeWarn",
        data(){
          return {
              headerInfors:[{img:"/img/main-outin-list-icon.png", txt:"重大危险源电子围栏列表", isClose:true}],
              workWrapperStyl:{width:'100.9%',height:'101.2%',left:'-3.4px',top:'-3.6px'},
              // 搜索控件
              searchControls:[
                  {txt:"名称",controlType:1}
              ],
              workTitles:[  // 列表头信息
                  {txt:"序号",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                  {txt:"名称",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                  {txt:"操作",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}}
              ],
              workContents:[ // 列表内容信息
                  {index:1,typeName:"电子围栏名称",ico:"/img/look-outinrecord-btn.png",activeIco:"/img/look-outinrecord-btn-highlight.png"},
                  {index:2,typeName:"电子围栏名称",ico:"/img/look-outinrecord-btn.png",activeIco:"/img/look-outinrecord-btn-highlight.png"},
                  {index:3,typeName:"电子围栏名称",ico:"/img/look-outinrecord-btn.png",activeIco:"/img/look-outinrecord-btn-highlight.png"},
                  {index:4,typeName:"电子围栏名称",ico:"/img/look-outinrecord-btn.png",activeIco:"/img/look-outinrecord-btn-highlight.png"},
                  {index:5,typeName:"电子围栏名称",ico:"/img/look-outinrecord-btn.png",activeIco:"/img/look-outinrecord-btn-highlight.png"},
                  {index:6,typeName:"电子围栏名称",ico:"/img/look-outinrecord-btn.png",activeIco:"/img/look-outinrecord-btn-highlight.png"}
              ],
              isState:true, //提交状态 true允许提交 false禁止提交 ajax提交但数据未成功时false，ajax提交并提交成功时true
              activeOptionIndexs:[0,1], //所有被选中的option索引 暂时假设所有控件都用第一个Option索引
              inputTextVales:["wwww"],  //所有日历信息
              styl:{paddingLeft:'4px'}, //需要修改的css值:margin-top:9px动态构建  公有的样式值padding-left4px
              page: 1,  //显示的是哪一页
              pageSize: 12, //每一页显示的数据条数
              total: 108, //记录总数
              maxPage:96, //最大页数
              prev:'<<',
              next:'>>'
          }
        },
        created(){
            //created  表示页面加载完毕，立即执行
            this.pageHandler(1);
        },
        methods:{
            //pagehandler方法 跳转到page页
            pageHandler: function (page) {
                //here you can do custom state update
                this.page = page;
            },
            closeHandle(){
                this.$emit("onClose");
            },
            /**
             * 获取头部组件的头部信息
             * **/
            getHeaderInfor(index){
                return this.headerInfors[index];
            },
            /***
             * 提交处理
             */
            submitHandle(){
                // 禁用提交状态
                this.isState=false;
                console.log("---需要提交到服务器的input文字信息--")
                console.log(this.inputTextVales);
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
             * 处理select信息
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
             * 处理inputTxt文字信息
             * @param controls 所有控件信息
             * @param curControl 当前控件信息
             * @param calendarVals 日历信息集合
             * @param objName 数据筛选条件
             * @param objType 查找的数据类型
             * @return 日历控件基于日历类型控件集的日历索引
             * */
            setCalendarControl(controls,curControl,calendarVals,objName,objType){
               let tempIndex=getControlIndex(controls,curControl,objName,objType);
               console.log(tempIndex);
               // 获取日历信息
               return  (tempIndex!==-1)?calendarVals[tempIndex]:{};
            }
        },
        components: {ZpageNav, List, SearchControl ,SearchInfor, WorkShopHeader, WorkWrapper}
    }
</script>

<style lang="stylus" scoped>
.employee_warn
    width 740px
    height 590px
    float right
    margin-top 50px
    margin-right 20px
    background rgba(12, 32, 53, 0.6)
    border-radius 6px
    transition: ease-in-out 0.3s
    box-shadow: -2px 0px 2px rgba(79, 173, 233, 0.6) inset, 0px -2px 2px rgba(79, 173, 233, 0.6) inset, 2px 0px 2px rgba(79, 173, 233, 0.6) inset, 0px 2px 2px rgba(79, 173, 233, 0.6) inset
    position relative
    .list
        width 691px
        margin-top 6px
        max-height 80%
    .zpageNav_wrapper
         border 1px dashed red
         width 100%
    .searchInfor
     >>> .left
          padding-left 10px
          padding-right 30px
          height auto
         .searchControl
            padding-right 0px
            >>> .title_txt
                    min-width: 0.4px
                    text-align: left
                    border none
            >>> .input_txt
                     border 1px dashed #67b9ff
                     width 151px
</style>