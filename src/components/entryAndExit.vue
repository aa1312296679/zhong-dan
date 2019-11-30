<template>
    <div class="entry_exit">
        <div class="entry_exit_content">
            <div class="title">{{title}}</div>
            <template v-for="(item,index) in contentInfors">
                <entry-and-exit-content :contentInfor="item" :key="`$entryAndExit${index}`"></entry-and-exit-content>
            </template>
        </div>
    </div>
</template>

<script>
    import entryAndExitContent from "components/entryAndExitContent";
    export default {
        name: "entryAndExit",
        data(){
            return {
                title:"二车间二道门",
                contentInfors:[
                    {prompt:'运行状态',content:"正常",icoActive:"",ico:""},
                    {prompt:'安检异常',content:"31",icoActive:"/img/msg-look-secure-btn-highlight.png",ico:"/img/msg-look-secure-btn.png",styl:{color:"#ff2525"}},
                    {prompt:'进出记录',content:"128",icoActive:"/img/msg-look-secure-btn-highlight.png",ico:"/img/msg-look-secure-btn.png",styl: {color:"#00f9fc"}}
                    ]
            }
        },
        components:{
            entryAndExitContent
        }
    }
</script>

<style lang="stylus" scoped>
.entry_exit
    position relative
    left 480px
    top 280px
    max-width 185px
    padding 14px 14px 20px 20px;
    background #0d2944
    opacity 0.7
    border-radius 10px
    min-height 146.8px
    .entry_exit_content
        top 0
        left 0
        position absolute
        width: 100%
        height 100%
        background: url('/img/msgbox-righttop-corner.png') top right no-repeat,
        url('/img/msgbox-lefttop-corner.png') top left no-repeat,
        url('/img/msgbox-leftbottom-corner.png') bottom left no-repeat,
        url('/img/msgbox-rightbottom-corner.png') bottom right no-repeat;
        padding: 14px 20px 20px 14px;
        .title
            font-size: 14px;
            font-weight: bold;
            color: #00f9fc;
            padding-bottom 6px
</style>