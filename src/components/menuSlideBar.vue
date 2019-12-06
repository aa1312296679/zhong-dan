<template>
    <div class="menu_slideBar">
     <div class="menu_infor">
         <template v-for="(item,key) in menuSlideOneInfors">
             <div :key="key" :class="setMenuItemState(key,oneMouseIndex,oneActiveIndex)" @mouseenter="menuHandle(key,'mouseOver')" @click="menuHandle(key,'mouseClick')" @mouseleave="mouseleaveHandle">
                 <img class="ico" :src="item.img"/>
                 <span v-show="key===oneMouseIndex" class="title">{{item.txt}}</span>
             </div>
         </template>
         <menuSlideBarInfor :menuItems="menuSlideTwoInfors" :menuItemActive="twoActiveIndex" @menuHanClick="menuTwoHandle"></menuSlideBarInfor>
     </div>
    </div>
</template>

<script>
    import menuSlideBarInfor from "components/menuSlideBarInfor";
    import {mouseTypies} from "js/util";
    export default {
        name: "menuSlideBar",
        props:{
            menuSlideOneInfors: { //slidebar的一级数据信息
                type:Array,
                required: true
            }
        },
        data()  {
            return {
                indexesActive:[-1,-1,-1] //已被点击选中的一级信息索引 已被点击的二级信息索引 已被漂浮的一级信息索引
            }
        },
        created() {
            // 临时测试代码 开发完需删除
            this.setIndex(0,4);
            this.menuTwoHandle(0);
           //重置更新一级数据信息项中项
           // this.initialIndex("one");
           //重置更新二级数据信息选中项
           // this.initialIndex("two");
        },
        methods:{
            /***
             * 动态设置被鼠标漂浮的一级按钮的样式
             * @param index 当前的一级按钮索引
             * @param indexMouse 被漂浮的按钮索引
             * @param indexClickActive 被点击的一级索引
             */
            setMenuItemState(index,indexMouse,indexClickActive){
               return (index===indexMouse)||(index===indexClickActive)?"menu_item_active":"menu_item";
            },
           /**
           * 处理鼠标漂浮和鼠标点击
           * @param index 被漂浮或被点击的元素索引
           */
           menuHandle(index,handleType){
               mouseTypies[handleType].apply(this,[index]);
           },
           /***
           * 鼠标离开处理
           */
           mouseleaveHandle(){
               this.$set(this.indexesActive,2,-1);
           },
           getTwoInfors(infors,index){
               return infors[index].children;
           },
           setIndex(key,value){
               this.$set(this.indexesActive,key,value);
           },
           /**
            * 重置更新索引
            * **/
           initialIndex(initialType){
               //重置一级索引
               if(initialType==="one"){
                   this.setIndex(0,0);
               //重置二级索引
               }else if(initialType==="two"){
                   this.setIndex(1,0);
               }
           },
           /**
            * 更新已被选中的二级信息选中项
            * **/
           menuTwoHandle(index){
             this.setIndex(1,index);
             //传递被点击的一级索引和二级索引
             this.$emit("twoIndexClick",{oneIndex:this.oneActiveIndex,twoIndex:index});
           },
            /***
             * 动态设置已选中的索引或已选中的数据结构
             * @param activeType 处理类型
             * @param index 需要获取的索引
             * @param infors 级联索引数据集或索引对应的数据信息集合
             * @param AttributeName 子信息属性名
             * @return {Number}||{Object}
             * */
            setActive(activeType,index,infors,AttributeName="children"){
                // 返回索引
                if(activeType==="num"){
                   return (infors[index]!==-1)?(infors[index]):(-1);
                // 返回索引对应的数据信息
                }else if(activeType==="obj"){
                    return (index!==-1)?infors[index][AttributeName]:[];
                }
            }
        },
        computed:{
            /**
             * 读取二级信息
             * **/
            menuSlideTwoInfors(){
               return this.setActive("obj",this.oneActiveIndex,this.menuSlideOneInfors);
            },
            oneActiveIndex(){
                return this.setActive("num",0,this.indexesActive);
            },
            twoActiveIndex(){
                return this.setActive("num",1,this.indexesActive);
            },
            oneMouseIndex(){
                return this.setActive("num",2,this.indexesActive);
            }
        },
        components:{
            menuSlideBarInfor
        }
    }
</script>

<style lang="stylus" scoped>
.menu_slideBar
    width 56px
    height 980px
    margin-left 20px
    background url("/img/menu-box-bg.png") no-repeat center center
    padding-top 7.424rem
    float left
.menu_infor
    width 56px
    min-height 339.2px
    display flex
    flex-direction column
    align-items center
    position relative
    .menu_item,.menu_item_active
        width 40px
        height 51.2px
        margin-bottom 6px
        display flex
        justify-content center
        align-items center
        position relative
        cursor: pointer
        &::before
             content:""
             display block
             position absolute
             width 38px
             height 51.2px
             transform skewY(35deg)
             z-index -1
         .title
             position absolute
             left 40px
             padding 3px 3px
             min-width 90px
             display flex
             justify-content center
             align-items center
             margin-top 20px
             color #fff
             z-index 2000
             width auto
             &::before
                z-index 10
                content:""
                display block
                background: #000000
                opacity: .5
                position absolute
                z-index -1
                width 100%
                height 100%
    .menu_item
        &::before
            background: #000000;
            opacity: .5;
    .menu_item_active
        &::before
            background -webkit-linear-gradient(left, rgba(0, 145, 255, 1), rgba(0, 178, 255, 1))
            background -o-linear-gradient(left, rgba(0, 145, 255, 1), rgba(0, 178, 255, 1))
            background -moz-linear-gradient(left, rgba(0, 145, 255, 1), rgba(0, 178, 255, 1))
            background linear-gradient(left, rgba(0, 145, 255, 1), rgba(0, 178, 255, 1))
</style>