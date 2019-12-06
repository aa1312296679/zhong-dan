<template>
    <div class="employeeInfor">
        <work-wrapper :stylObj="workWrapperStyl">
           <work-shop-header :infor="getHeaderInfor(0)" @onClose="closeHandle"></work-shop-header>
            <search-infor :inputInfors="searchControls" @onSubmit="submitHandle">
                <template scope="infors">
                        <searchControl :styl="setLastStyl(infors.item)" :index="infors.index" :controlInfor="infors.item" :activeOptionIndex="activeOptionIndexs[setSelectIndex(infors.item,infors.index,searchControls)]" :txtVal="nameVal" @onTxt="txtHandle" @onSelect="selectHandle"></searchControl>
                </template>
            </search-infor>
            <!--列表信息-->
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
    import zpageNav from "components/zpageNav";
    import List from "components/list";
    export default {
        name: "employeeInfor",
        data(){
            return {
                workWrapperStyl:{width:'101%',height:'101%',left:'-4px',top:'-4px'},
                headerInfors:[{img:"/img/main-outin-list-icon.png", txt:"人员信息管理", isClose:true}],
                // 搜索控件
                searchControls:[
                    {txt:"姓名",controlType:1},
                    {txt:"单位",controlType:3,options:[{txt:"摄像维修1",val:0},{txt:"摄像维修2",val:1}]},
                    {txt:"部门",controlType:3,options:[{txt:"生产部1",val:0},{txt:"生产部2",val:1}]},
                    {txt:"属性",controlType:3,options:[{txt:"外协1",val:0},{txt:"外协2",val:1}]}
                ],
                workTitles:[  // 列表头信息
                    {txt:"序号",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                    {txt:"工牌ID",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                    {txt:"姓名",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                    {txt:"性别",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                    {txt:"年龄",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                    {txt:"单位",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                    {txt:"部门",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                    {txt:"操作",styl:{borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}}
                ],
                workContents:[ // 列表内容信息
                    {index:1,catId:12122,name:"张三",sex:'男',age:25,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                    {index:2,catId:23335,name:"李四",sex:'男',age:27,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                    {index:3,catId:23335,name:"李四",sex:'男',age:27,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                    {index:4,catId:12122,name:"张三",sex:'男',age:25,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                    {index:5,catId:23335,name:"李四",sex:'男',age:27,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                    {index:6,catId:23335,name:"李四",sex:'男',age:27,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                    {index:7,catId:12122,name:"张三",sex:'男',age:25,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                    {index:8,catId:23335,name:"李四",sex:'男',age:27,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                    {index:9,catId:23335,name:"李四",sex:'男',age:27,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                    {index:10,catId:12122,name:"张三",sex:'男',age:25,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                    {index:11,catId:23335,name:"李四",sex:'男',age:27,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                    {index:12,catId:23335,name:"李四",sex:'男',age:27,unit:'中丹化工',department:'生产部',ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"}
                ],
                isState:true, //提交状态 true允许提交 false禁止提交 ajax提交但数据未成功时false，ajax提交并提交成功时true
                activeOptionIndexs:[0,1,0], //所有被选中的option索引 暂时假设所有控件都用第一个Option索引
                nameVal:"",  //用户输入的姓名
                lastSelectStyl:{paddingRight:'9px'}, //最后一项select下拉框的样式兼容处理
                page: 1,  //显示的是哪一页
                pageSize: 12, //每一页显示的数据条数
                total: 108, //记录总数
                maxPage:96, //最大页数
                prev:'<<',
                next:'>>'
            }
        },
        created() {
          console.log(this.listWrapper)
        },
        methods:{
            /***
             * pagehandler方法
             * @returns {IterableIterator<*>}
             */
            pageHandler: function (page) {
                this.page = page;
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
            },
            /***
             * 最后一项select的样式兼容处理
             */
            setLastStyl(item){
               return  (item.txt==='属性')?this.lastSelectStyl:{};
            },
            closeHandle(){
                this.$emit("onClose");
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
            /**
             * 获取指定类型的控件集合
             * @param controls 控件综合集
             * @param searchType 需要查找的控件类型
             */
            getSelectControls(controls,searchType){
               return controls.filter(({controlType})=>{
                    return controlType===searchType;
                });
            }
        },
        components: {List, SearchControl, SearchInfor, WorkShopHeader, WorkWrapper, zpageNav}
    }
</script>

<style lang="stylus" scoped>
.employeeInfor
    width 720px
    height 665px
    float right
    margin-top 50px
    background rgba(12, 32, 53, 0.6)
    border-radius 6px
    transition: ease-in-out 0.3s
    box-shadow: -2px 0px 2px rgba(79, 173, 233, 0.6) inset, 0px -2px 2px rgba(79, 173, 233, 0.6) inset, 2px 0px 2px rgba(79, 173, 233, 0.6) inset, 0px 2px 2px rgba(79, 173, 233, 0.6) inset
    position relative
    margin-right 20px
    .list
        width 691px
        margin-top 6px
</style>