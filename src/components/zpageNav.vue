<template>
        <div class="zpagenav">
            <ul class="page-ul">
                <li v-bind:key="index" v-for="(item,index) in pageList" v-bind:class ="item.class" @click.stop="setPage(item)" v-html="item.html"></li>
               </ul>
            <div class="page_total">
                <span class="total">共 <span class="number_highlight">{{total}}</span> 条</span>
                <span class="total">每页 <span class="number_highlight">{{pageSize}}</span> 条</span>
            </div>
         </div>
</template>

<script>
    export default {
        name: "zpageNav",
        props: {
            prevHtml: String,
            nextHtml: String,
            page: Number,
            total: Number,
            pageSize: Number,
            maxPage:{
                type:Number,
                default:9
            }
        },
        computed: {
            pageList: function() {
                let pageList = [];
                let pageCount = Math.ceil(this.total / this.pageSize);
                let page = this.page;
                let prevHtml = this.prevHtml ? this.prevHtml : '&lt;';
                let nextHtml =this.nextHtml ? this.nextHtml : '&gt;';


                let hasPrev = page > 1;
                let hasNext = page < pageCount;

                //上一页
                pageList.push({
                    class: hasPrev ? '' : 'disabled',
                    page: hasPrev ? page - 1 : page,
                    html: prevHtml
                });

                console.log(page);

                //首页
                pageList.push({
                    class: page == 1 ? 'active' : '',
                    page: 1,
                    html: 1
                });


                var p1 = 1 + 2 + this.p0; //首页+省略至少2个页码+中间页面数的一半

                var start, end;
                // console.log(page-p0-1);
                if(page >= p1) {
                    start = page - this.p0;
                    // console.log(start-1);
                    //前置省略号
                    pageList.push({
                        class: 'dot',
                        page: page,
                        html: '...'
                    });
                } else {
                    start = 2;
                }

                var p2 = page + this.p0;
                if(p2 < pageCount) {
                    end = p2;
                } else {
                    end = pageCount - 1;
                }

                //页码列表
                for(let i = start; i <= end; i++) {
                    pageList.push({
                        class: page == i ? 'active' : '',
                        page: i,
                        html: i
                    });
                }

                if(end < pageCount - 1) {
                    //后置省略号
                    pageList.push({
                        class: 'dot',
                        page: page,
                        html: '...'
                    });
                }

                //尾页
                if(pageCount > 1) {
                    pageList.push({
                        class: page == pageCount ? 'active' : '',
                        page: pageCount,
                        html: pageCount
                    });
                }

                //下一页
                pageList.push({
                    class: hasNext ? '' : 'disabled',
                    page: hasNext ? page + 1 : page,
                    html: nextHtml
                });

                return pageList;
            },
           p0(){
             return Math.floor(this.maxPage / 2)
           }
        },
        methods: {
            setPage: function(item) {
                if(item.class == '') {
                    this.$emit('pagehandler', item.page);
                }
            },
            /**
             * 是否显示当前页页码
             * @param curPage 当前页码
             * @param activePage 已倍选中的页码
             *
             */
            isShowCurPage(){

            }
        }
    }
</script>

<style lang="stylus" scoped>
@import "~common/stylus/zpageNav"
</style>