<template>
        <div class="zpagenav">
            <ul class="page-ul">
                <li :key="index" v-for="(item,index) in pageList" v-show="item.isShow" :class ="item.class" @click.stop="setPage(item)" v-html="item.html"></li>
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
            curPage: Number,
            total: Number,
            pageSize: Number,
            maxPage:{
                type:Number,
                default:9
            }
        },
        data(){
          return {
              page:this.curPage
          }
        },
        computed: {
            /**
             * 构建所有需要展示分页页码
             * @returns {Array} 所有需要展示的分页页码信息
             */
            pageList: function() {
                let pageList = [];
                let pageCount = Math.ceil(this.total / this.pageSize);
                let page = this.page;
                let prevHtml = this.prevHtml ? this.prevHtml : '&lt;';
                let nextHtml =this.nextHtml ? this.nextHtml : '&gt;';
                let hasPrev = page > 1;
                let hasNext = page < pageCount;
                var p1 = 1 + 2 + this.p0; //首页+省略至少2个页码+中间页面数的一半
                var start, end;

                //上一页
                pageList.push({
                    class: hasPrev ? '' : 'disabled',
                    isShow: hasPrev,
                    page: hasPrev ? page - 1 : page,
                    html: prevHtml
                });

                //首页
                pageList.push({
                    class: page == 1 ? 'active' : '',
                    isShow:page < p1,
                    page: 1,
                    html: 1
                });

                if(page >= p1) {
                    start = page - this.p0;
                    //前置省略号
                    pageList.push({
                        class: 'dot',
                        page: page-this.p0-1,
                        isShow:page >= p1,
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
                        isShow:true,
                        page: i,
                        html: i
                    });
                }

                if(end < pageCount - 1) {
                    //后置省略号
                    pageList.push({
                        class: 'dot',
                        page: end+1,
                        isShow:end < pageCount - 1,
                        html: '...'
                    });
                }

                //尾页
                if(pageCount > 1) {
                    pageList.push({
                        class: page == pageCount ? 'active' : '',
                        isShow:end >= pageCount-1,
                        page: pageCount,
                        html: pageCount
                    });
                }

                //下一页
                pageList.push({
                    class: hasNext ? '' : 'disabled',
                    isShow:hasNext,
                    page: hasNext ? page + 1 : page,
                    html: nextHtml
                });

                return pageList;
            },
           p0(){
               return Math.floor(this.maxPage / (this.maxPage / 2))
           }
        },
        methods: {
            setPage: function(item) {
                console.log(item);
                if(item.page===this.page){
                    return false;
                }
                this.page=item.page;
                this.$emit('pagehandler', item.page);
            }
        }
    }
</script>

<style lang="stylus" scoped>
@import "~common/stylus/zpageNav"
</style>