export default {
    props:{
        _showState:{ //显示状态状态
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            showState:false
        }
    },
    methods:{
        show(){
            this.showState=true;
        },
        hide() {
            this.showState=false;
        }
    }
}