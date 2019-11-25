<template>
    <div class="employee_warn">
        <work-wrapper :stylObj="workWrapperStyl">
            <!--头部信息-->
            <work-shop-header :infor="getHeaderInfor(0)" @onClose="closeHandle"></work-shop-header>
            <!--信息搜索-->
            <search-infor :inputInfors="searchControls" @onSubmit="submitHandle">
<!--                <template scope="infors">-->
<!--                   <search-control :styl="setStyl(infors.index)" :index="infors.index" :controlInfor="infors.item" :activeOptionIndex="activeOptionIndexs[setSelectIndex(infors.item,infors.index,searchControls)]" :txtVal="nameVal" @onTxt="txtHandle" @onSelect="selectHandle"></search-control>-->
<!--                </template>-->
            </search-infor>
        </work-wrapper>
    </div>
</template>

<script>
    import WorkWrapper from "components/workWrapper";
    import WorkShopHeader from "components/workShopHeader";
    import SearchInfor from "components/searchInfor";
    // import SearchControl from "components/searchControl";
    export default {
        name: "employeeWarn",
        data(){
          return {
              headerInfors:[{img:"/img/main-outin-list-icon.png", txt:"告警记录列表", isClose:true}],
              workWrapperStyl:{width:'100.9%',height:'101.2%',left:'-3.4px',top:'-3.6px'},
              // 搜索控件
              searchControls:[
                  {txt:"警告类型",controlType:3,options:[{txt:"人员滞留1",val:0},{txt:"人员滞留2",val:1}]},
                  {txt:"开始时间",controlType:2,ico:"/img/table-calendar-icon.png",options:[{txt:"生产部1",val:0},{txt:"生产部2",val:1}]},
                  {txt:"结束时间",controlType:2,ico:"/img/table-calendar-icon.png",options:[{txt:"外协1",val:0},{txt:"外协2",val:1}]},
                  {txt:"状态",controlType:3,options:[{txt:"已处理",val:0},{txt:"未处理",val:1}]}
              ],
              isState:true, //提交状态 true允许提交 false禁止提交 ajax提交但数据未成功时false，ajax提交并提交成功时true
              activeOptionIndexs:[0,1,0], //所有被选中的option索引 暂时假设所有控件都用第一个Option索引
              calendarVals:[{year:2019,month:11,day:26},{year:2019,month:'08',day:'04'}],  //所有日历信息
              styl:{paddingLeft:'4px'} //需要修改的css值:margin-top:9px动态构建  公有的样式值padding-left4px
          }
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
                let tempSelectInfors =this.getSelectControls(this.searchControls,3);
                //所有需要提交到服务器的option信息
                let optionVals=[];
                // 遍历所有的option信息
                optionIndexes.forEach((curVal,curIndex)=>{
                    let {options} = tempSelectInfors[curIndex];
                    let {val} =options[curVal];
                    optionVals.push({val});
                });
                //获取需要提交到服务器的用户文本框信息
                console.log(this.nameVal);
            },
            /**
             * 获取指定类型的控件集合
             * @param controls 控件综合集
             * @param searchType 需要查找的控件类型
             */
            getSelectControls(controls,searchType){
                return controls.filter(({controlType})=>{
                    return controlType===searchType;
                });
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
             * 获取当前select控件基于select控件集中的select控件索引
             * @param control 控件信息
             * @param index 控件索引
             * @param controls 所有控件信息
             */
            setSelectIndex(control,index,controls){
                // 判断当前控件是否为select控件
                if(control.controlType!==3){
                    return -1
                }
                // 将select类型的控件的控件索引转换为基于select类型数据集的select索引
                let tempIndex=index;
                //计算所有不为select控件的控件数量
                let num = controls.reduce((total,curVal)=>{
                    return curVal.controlType!==3?++total:total
                },0);
                //当前索引-控件缩量
                return (tempIndex-num);
            },
            txtHandle(txtVal){
                this.nameVal=txtVal;
            },
            /***
             * option点击处理
             * @activeIndex 被点击的select控件索引和select的option索引
             * **/
            selectHandle({componentIndex,optionIndex}){
                //根据控件索引获取被点击的select控件基于select控件集的索引
                let selectIndex = this.setSelectIndex(this.searchControls[componentIndex],componentIndex,this.searchControls);
                //将已选中的option索引进行更新
                this.activeOptionIndexs[selectIndex]=optionIndex
            }
        },
        components: {SearchInfor, WorkShopHeader, WorkWrapper}
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
    .searchInfor
     >>> .left
          width 685px
          height auto
          background red
         .searchControl
            padding-right 0px
            >>> .title_txt
                    min-width: 61.4px
                    text-align: right
</style>