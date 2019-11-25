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
            <list :titles="workTitles" :contents="workContents"></list>
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
    export default {
        name: "workshopList",
        data(){
          return {
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
             workWrapperStyl:{width:'415px',height:'101%',left:'-4px',top:'-4px'}
          }
        },
        methods:{
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
            searchControl
        }
    }
</script>

<style lang="stylus" scoped>
.workList
    width 410px
    height 851px
    border 1px dashed orange
    float right
    margin-top 50px
    background rgba(12, 32, 53, 0.6)
    border-radius 6px
    transition: ease-in-out 0.3s
    box-shadow: -2px 0px 2px rgba(79, 173, 233, 0.6) inset, 0px -2px 2px rgba(79, 173, 233, 0.6) inset, 2px 0px 2px rgba(79, 173, 233, 0.6) inset, 0px 2px 2px rgba(79, 173, 233, 0.6) inset
    position relative
    margin-right 20px
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