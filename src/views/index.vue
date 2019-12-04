<template>
  <div class="home">
     <h-header :nowDate="header['date']" :temperature="header['temperature']">
         <!--搜索-->
         <search></search>
         <!--tab选项卡-->
         <menuTab :menuTabs="menutab['infors']" :activeMenuIndex="menutab['activeIndex']"></menuTab>
     </h-header>
     <menuSlideBar :menuSlideOneInfors="menuSlideBar['menuSlideOneInfors']" @twoIndexClick="twoIndexHandle"></menuSlideBar>
     <component v-if="showComponent" :is="showComponent" @onClose="closeHandle"></component>
  </div>
</template>

<script>
import HHeader from "components/header";
import search from "components/search";
import menuTab from "components/menuTab";
import menuSlideBar from "components/menuSlideBar";
import { workShopList, emplyeeInfor, employeeWarn, constructionWarn, Inspection, entryAndExits, riskManagement, workshopInspection, dropDownMenu} from "js/util.js";

export default {
  name: "index",
  data(){
    return {
        showComponent:undefined, //动态显示的组件
        header:{ //头部组件的组件信息
            date:{
                yy:"2019",
                MM:"11",
                dd:"19",
                HH:"19",
                mm:"54",
                ss:"14"
            },
            temperature:36
        },
        menutab:{ //menutab组件信息
            infors:[{ //选项卡信息
                imgSrc:"",
                imgTxt:"图层",
                activeImgSrc:"/img/layer-icon.png"
            },
            {
                imgSrc:"/img/tool-icon.png",
                imgTxt:"工具",
                activeImgSrc:""
            },
            {
                imgSrc:"/img/keshihua-icon.png",
                imgTxt:"可视化",
                activeImgSrc:""
            }],
            activeIndex:0//已选中的tab选项卡
        },
        menuSlideBar:{
            menuSlideOneInfors: [
            {
              img:"/img/quanjingzhongdan-icon.png",
              txt:"全景中丹",
              children:[{text:"全景中丹"}]
            },
            {
                img:"/img/security-icon.png",
                txt:"安全监管",
                children:[{text:"环境监测"},{text:"消防监测"},{text:"生产监测"},{text:"视频监控"},{text:"报警处理"}]
            },
            {
                img:"/img/renyuanguanli-icon.png",
                txt:"人员管理",
                children:[
                    {
                        text:"人员信息管理",
                        component:emplyeeInfor
                    },
                    {text:"人员进出管理",component:entryAndExits},
                    {
                        text:"人员定位管理",
                        component:workShopList
                    },
                    {text:"人员定位警告",component:employeeWarn},
                    {text:"施工管理",component:constructionWarn},
                    {text:"巡查管理",component:Inspection}
                ]
            },
            {
                img:"/img/5s-fuzhujianguan-icon.png",
                txt:"5S辅助监管",
                children:[{text:"5S车间在岗管理",component:workshopInspection},{text:"5S辅助检查"},{text:"5S车间换班检查"},{text:"5S辅助考核"}]
            },
            {
                img:"/img/fengxian-icon.png",
                txt:"风险监管",
                children:[{text:"风险管控",component: dropDownMenu},{text:"重大危险源管控",component:riskManagement},{text:"安全风险分区"}]
            },
            {
                img:"/img/houtaiguanli-icon.png",
                txt:"后台管理",
                children:[]
            }
            ]
        }
    }
  },
  methods:{
      /***
       * 二级信息点击切换处理 显示与二级信息对应的详情信息
       * @method twoIndexHandle
       * @param infor
       */
      twoIndexHandle(infor){
          this.showComponent=this.inforData[infor['oneIndex']].children[infor['twoIndex']].component;
      },
      closeHandle() {
          this.showComponent=null;
      }
  },
  computed:{
      inforData(){
        return this.menuSlideBar.menuSlideOneInfors;
      }
  },
  components:{
    HHeader,
    search,
    menuTab,
    menuSlideBar
  }
};
</script>
