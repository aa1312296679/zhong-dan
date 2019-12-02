<template>
    <div class="workshop_inspection">
        <work-wrapper :stylObj="workWrapperStyl">
            <!--头部信息-->
            <work-shop-header :infor="getHeaderInfor(0)" @onClose="closeHandle"></work-shop-header>
            <!--车间详情内容-->
            <!--名称-->
            <template v-for="(item,index) in testInfor">
                <WorkshopDetailsContent :key="`worksshopDetails${index}`" :infor="item"></WorkshopDetailsContent>
            </template>
            <!--评分--->
          <b-button :_btnText="button['text']" @btnHandle="btnHandle"></b-button>
        </work-wrapper>
        <worksection-mark-dialog ref="dialog"></worksection-mark-dialog>
    </div>
</template>

<script>
    import WorkWrapper from "components/workWrapper";
    import WorkShopHeader from "components/workShopHeader";
    import WorkshopDetailsContent from "components/WorkshopDetailsContent"
    import BButton from "components/BButton"
    import {getControlIndex,getTypeControls} from "js/util.js";
    import WorksectionMarkDialog from "components/worksectionMarkDialog";

    export default {
        name: "employeeWarn",
        data(){
          return {
              dialog: {
                 state:false, //弹窗的显示状态true显示 false隐藏
                 dialogObj:undefined //弹窗
              },
              button:{text:"评分"},
              testInfor:[
                  {txtLeft:"车间名称",txtChildren:["乙车间"]},
                  {txtLeft:"车间名称",txtChildren:["汪驲、李梦凡、周杰、王伟、刘旭张旭升、谢天宝、田曾、李虎、赵山汪驲、汪驲、汪驲、汪驲、汪驲汪驲、汪驲、汪驲"],styl:{padding:"11.6px 0"}},
                  {txtLeft:"人员进出次数",txtChildren:["68次"]},
                  {txtLeft:"评分",txtChildren:["未评分"]}
              ],
              headerInfors:[{img:"/img/main-outin-list-icon.png", txt:"车间详情", isClose:true}],
              workWrapperStyl:{width:'101.7%',height:'102%',left:'-3.2px',top:'-3px'},
              // 搜索控件
              searchControls:[
                  {txt:"施工状态",controlType:3,options:[{txt:"进行中",val:0}]},
                  {txt:"姓名",controlType:1,styl:{width: '160px'}},
                  {txt:"施工单位",controlType:3,options:[{txt:"生产部",val:0}],styl:{width: '160px',backgroundPosition:'141px center'}},
                  {txt:"施工类别",controlType:3,options:[{txt:"场内施工",val:0}]},
                  {txt:"开始时间",controlType:2,ico:"/img/table-calendar-icon.png",options:[{txt:"生产部1",val:0},{txt:"生产部2",val:1}]},
                  {txt:"结束时间",controlType:2,ico:"/img/table-calendar-icon.png",options:[{txt:"外协1",val:0},{txt:"外协2",val:1}]}
              ],
              workTitles:[  // 列表头信息
                  {txt:"序号",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                  {txt:"施工地点",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                  {txt:"项目名称",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                  {txt:"施工单位",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                  {txt:"施工类型",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                  {txt:"施工状态",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                  {txt:"操作",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}}
              ],
              workContents:[ // 列表内容信息
                  {index:1,catId:12122,name:"张三",sex:'男',age:25,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                  {index:2,catId:23335,name:"李四",sex:'男',age:27,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                  {index:3,catId:23335,name:"李四",sex:'男',age:27,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                  {index:4,catId:12122,name:"张三",sex:'男',age:25,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                  {index:5,catId:23335,name:"李四",sex:'男',age:27,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                  {index:6,catId:23335,name:"李四",sex:'男',age:27,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"}
              ],
              isState:true, //提交状态 true允许提交 false禁止提交 ajax提交但数据未成功时false，ajax提交并提交成功时true
              activeOptionIndexs:[0,1], //所有被选中的option索引 暂时假设所有控件都用第一个Option索引
              calendarVals:[{year:2019,month:11,day:26},{year:2019,month:'08',day:'04'}],  //所有日历信息
              nameValue:"", //姓名
              styl:{paddingLeft:'4px'}, //需要修改的css值:margin-top:9px动态构建  公有的样式值padding-left4px
              page: 1,  //显示的是哪一页
              pageSize: 12, //每一页显示的数据条数
              total: 108, //记录总数
              maxPage:96, //最大页数
              prev:'<<',
              next:'>>'
          }
        },
        mounted(){
            // 获取弹窗对象
            this.dialog.dialogObj=this.$refs.dialog;
        },
        methods:{
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
                //遍历所有的option索引值和option的数组下标
                let optionIndexes =this.activeOptionIndexs;
                //获取select控件集
                let tempSelectInfors = getTypeControls(this.searchControls,3);
                //所有需要提交到服务器的option信息
                 let optionVals=[];
                // 遍历所有被选中的option索引
                optionIndexes.forEach((curVal,curIndex)=>{
                    //获取当前option索引集的key找到对应的Option集合
                    let {options} = tempSelectInfors[curIndex];
                    //通过的option索引值找到对应的option的val值
                    let {val} =options[curVal];
                    optionVals.push({val});
                });

                console.log("---需要提交至服务器的option信息---");
                console.log(optionVals);
                console.log("---需要提交到服务器的日历信息--");
                console.log(this.calendarVals);
                console.log("-----需要提交到服务器的姓名---");
                console.log(this.nameVal);
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
             * @method 评价分按钮点击处理
             * **/
            btnHandle(){
                this.dialog.dialogObj.show();
            }
        },
        components: {WorksectionMarkDialog, WorkShopHeader, WorkWrapper, WorkshopDetailsContent, BButton}
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
</style>