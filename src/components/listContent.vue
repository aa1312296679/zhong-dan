<template>
    <!--列表内容-->
    <div class="list_content">
           <template v-for="(item,key) in infor">
                <div v-if="showElement('item',key)" :key="key" class="list_item" :style="listItemStyl">
                  <span v-if="showElement('ItemSpan',key)">{{item}}</span>
                  <img class="ico" v-if="showElement('img',key)" :src="icoImg"/>
                </div>
           </template>
    </div>
</template>

<script>
    export default {
        name: "listContent",
        props:{
            infor:{ //行信息
                type:Object,
                required:true
            }
        },
        data(){
            return {
               isMouse:false, //鼠标是否已漂浮
               maxWidth:100, //最大宽 单位百分比
               listItemStyl:{} //list_item元素的行内样式
            }
        },
        created() {
                this.listItemStyl['width']=`${this.itemWidth}%`;
        },
        computed:{
            itemWidth(){
               return  (this.maxWidth/this.rowsCount).toFixed(2);
            },
            // ico图标
            icoImg(){
                return (this.isMouse)?this.infor.activeIco:this.infor.ico;
            },
            rowsCount(){
                let count=0;
                for(let key in this.infor){
                    if(key!=="activeIco"){
                        count+=1;
                    }
                }
                return count;
            }
        },
        methods:{
            showElement(type,key){
                // 处理img的显示与隐藏
                if(type==="img"){
                    return (key==="ico");
                // 处理item类名元素的显示与隐藏
                }else if(type==="item"){
                    return  (key!=="activeIco");
                // 处理item类名下的span元素的显示与隐藏
                }else if(type==="ItemSpan"){
                    return (key!=="activeIco")&&(key!=="ico");
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
.list_content
    border 1px dashed red
    clear both
    color #fff
    overflow hidden
    .list_item
        height 36px
        border 1px dashed blue
        text-align center
        float left
        display flex
        justify-content center
        align-items center
        .ico
            width 20px
            height 20px
            border 1px dashed orange
</style>