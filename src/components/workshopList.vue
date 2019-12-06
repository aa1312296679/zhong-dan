<template>
    <div class="workList">
       <work-wrapper :stylObj="workWrapperStyl">
            <!--车间列表头部-->
            <workShopHeader :infor="getHeaderInfor(0)" @onClose="closeHandle"></workShopHeader>
            <!--车间信息-->
            <workShopListContent :infors="workListContents"></workShopListContent>
            <!--车间人员信息头部-->
            <workShopHeader :infor="getHeaderInfor(1)"></workShopHeader>
            <!--车间搜索-->
            <searchInfor :inputInfors="searchControls" @onSubmit="submitHandle">
                <template scope="infors">
                    <searchControl :controlInfor="infors.item" :activeOptionIndex="activeOptionIndex" :txtVal="nameVal" @onTxt="txtHandle" @onSelect="selectHandle"></searchControl>
                </template>
            </searchInfor>
            <!--车间列表信息-->
            <list :titles="workTitles" :contents="workContents"  :_listWrapper="listWrapper"></list>
           <!--底部分页页码-->
           <div class="zpageNav_wrapper">
               <zpage-nav :curPage="page" :page-size="pageSize" :total="total" :max-page="maxPage"  :prevHtml="prev" :nextHtml="next" :pagehandler="pageHandler"></zpage-nav>
           </div>
       </work-wrapper>
    </div>
</template>

<script>
    import workShopHeader from "components/workShopHeader";
    import workShopListContent from "components/workShopListContent";
    import searchInfor from "components/searchInfor";
    import searchControl from "components/searchControl";
    import List from "components/list";
    import WorkWrapper from "components/workWrapper";
    import zpageNav from "components/zpageNav";
    export default {
        name: "workshopList",
        data(){
          return {
            listWrapper:"employeeInfor_list_wrapper",
            // 头部信息
            headerInfors:[{img:"/img/main-workshop-list-icon.png", txt:"车间列表", isClose:true},{img:"/img/main-workshop-peopel-icon.png", txt:"闲置车间人员定位列表", isClose:false}],
            // 搜索控件
            searchControls:[{txt:"区域",controlType:3,options:[{txt:"全厂",val:0},{txt:"全厂2",val:1}]},{txt:"姓名",controlType:1}],
            // 车间列表内容
            workListContents:[
                {curProgress:8,maxProgress:10,txt:"闲置",classColor:"bg_blue",borderColor:"#00b2ff"},
                {curProgress:12,maxProgress:10,txt:"动力",classColor:"bg_blue",borderColor:"#00b2ff"},
                {curProgress:8,maxProgress:10,txt:"多功能",classColor:"bg_orange",borderColor:"#bf8b0e"},
                {curProgress:8,maxProgress:10,txt:"PEN包装",classColor:"bg_red",borderColor:"#cf4910"},
                {curProgress:8,maxProgress:10,txt:"PEN包装",classColor:"bg_red",borderColor:"#cf4910"},
                {curProgress:8,maxProgress:10,txt:"PEN包装",classColor:"bg_red",borderColor:"#cf4910"}
            ],
            workTitles:[  // 列表头信息
                  {txt:"工牌id",styl:{width:"132px",borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                  {txt:"姓名",styl:{width:"132px",borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}},
                  {txt:"查看轨迹",styl:{width:"132px",borderTopRightRadius:"6px",borderTopLeftRadius:"6px"}}
             ],
             workContents:[ // 列表内容信息
                  {catId:12122,name:"张三",ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"},
                  {catId:12122,name:"王五",ico:"/img/look-trail-btn.png",activeIco:"/img/look-trail-btn-highlight.png"}
             ],
             isState:true, //提交状态 true允许提交 false禁止提交 ajax提交但数据未成功时false，ajax提交并提交成功时true
             activeOptionIndex:0, //被选中的option
             nameVal:"",  //用户输入的姓名
             workWrapperStyl:{width:'416px',height:'100.5%',left:'-3.2px',top:'-2px'},
             page: 1,  //显示的是哪一页
             pageSize: 12, //每一页显示的数据条数
             total: 108, //记录总数
             maxPage:96, //最大页数
             prev:'<<',
             next:'>>'
          }
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
              //获取被选中的option信息
              let activeOptionVal =this.searchControls[0].options[this.activeOptionIndex].val;
              let nameVal =this.nameVal;
              console.log(activeOptionVal);
              console.log(nameVal);
          },
          txtHandle(txtVal){
              this.nameVal=txtVal;
          },
         selectHandle(activeIndex){
             this.activeOptionIndex=activeIndex;
         },
        closeHandle(){
            this.$emit("onClose");
        }
        },
        components:{
            WorkWrapper,
            List,
            workShopHeader,
            workShopListContent,
            searchInfor,
            searchControl,
            zpageNav
        }
    }
</script>

<style lang="stylus" scoped>
.workList
    width 410px
    height 851px
    float right
    margin-top 50px
    background rgba(12, 32, 53, 0.6)
    border-radius 6px
    transition: ease-in-out 0.3s
    box-shadow: -2px 0px 2px rgba(79, 173, 233, 0.6) inset, 0px -2px 2px rgba(79, 173, 233, 0.6) inset, 2px 0px 2px rgba(79, 173, 233, 0.6) inset, 0px 2px 2px rgba(79, 173, 233, 0.6) inset
    position relative
    margin-right 20px
    .zpageNav_wrapper
          width 100%
          >>> .zpagenav ul
                    float: right
                    max-width: 220px
                    margin-right: 10px
                    margin-left: 0
    .employeeInfor_list_wrapper
        font-size: 12px;
        text-align: center;
        border: 1px solid #0f8bff;
        border-radius: 4px;
        display table
        overflow hidden
        margin 0 auto
        margin-top 6px
        >>> .list_content
                &:nth-child(odd)
                    background rgba(7, 45, 84, 0);
                &:nth-child(even)
                    background rgba(7, 45, 84, 0.5);
    >>> .bg_blue
            border 1px solid #00b2ff
            .cur_progress
              background -webkit-linear-gradient(left, rgba(0, 145, 255, 1), rgba(1, 221, 235, 1));
              background -o-linear-gradient(left, rgba(0, 145, 255, 1), rgba(1, 221, 235, 1));
              background -moz-linear-gradient(left, rgba(0, 145, 255, 1), rgba(1, 221, 235, 1));
              background linear-gradient(left, rgba(0, 145, 255, 1), rgba(1, 221, 235, 1));
    >>> .bg_orange
            border 1px solid #bf8b0e
            .cur_progress
                background -webkit-linear-gradient(left, rgba(240, 237, 0, 1), rgba(255, 114, 0, 1));
                background -o-linear-gradient(left, rgba(240, 237, 0, 1), rgba(255, 114, 0, 1));
                background -moz-linear-gradient(left, rgba(240, 237, 0, 1), rgba(255, 114, 0, 1));
                background linear-gradient(left, rgba(240, 237, 0, 1), rgba(255, 114, 0, 1));
    >>> .bg_red
            border 1px solid #cf4910
            .cur_progress
                background -webkit-linear-gradient(left, rgba(255, 116, 0, 1), rgba(255, 54, 0, 1));
                background -o-linear-gradient(left, rgba(255, 116, 0, 1), rgba(255, 54, 0, 1));
                background -moz-linear-gradient(left, rgba(255, 116, 0, 1), rgba(255, 54, 0, 1));
                background linear-gradient(left, rgba(255, 116, 0, 1), rgba(255, 54, 0, 1));
</style>