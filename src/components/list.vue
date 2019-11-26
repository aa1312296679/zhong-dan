<template>
    <div class="list">
     <template v-for="(item,index) in titles">
         <!--列表头-->
         <list-title :key="index" :titleInfor="item" :rowsCount="titles.length"></list-title>
     </template>
        <!--列表内容-->
        <list-content :key="index+item.catId" v-for="(item,index) in contents" :infor="item"></list-content>
    </div>
</template>

<script>
    import listTitle from "components/listTitle";
    import ListContent from "components/listContent";
    export default {
        name: "list",
        props:{
            titles:{ //列表头信息
                type:Array,
                default:()=>[]
            },
            contents:{ //列表内容信息
                type:Array,
                default:()=>[]
            }
        },
        components:{
            ListContent,
            listTitle
        }
    }
</script>

<style lang="stylus" scoped>
.list
    font-size: 12px;
    margin-left auto
    margin-right auto
    text-align: center;
    border: 1px solid #0f8bff;
    border-radius: 4px;
    display table
    overflow hidden
    .list_content
        &:nth-child(odd)
            background rgba(7, 45, 84, 0);
        &:nth-child(even)
            background rgba(7, 45, 84, 0.5);
</style>