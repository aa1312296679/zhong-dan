/***
 * 鼠标类型
 * **/
let mouseTypies = {
    mouseOver(index){
        this.$set(this.indexesActive,2,index);
    },
    mouseClick(index){
        // 重置更新二级索引
        this.initialIndex("two");
        if(this.getTwoInfors(this.menuSlideOneInfors,index).length){
            this.$set(this.indexesActive,0,index);
        }
    }
}

// 车间工作信息组件
const workShopList = () => import("components/workshopList");
// 员工信息组件
const emplyeeInfor = () => import("components/employeeInfor");
export {
    mouseTypies,
    workShopList,
    emplyeeInfor
}