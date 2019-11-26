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

/**
 * 获取指定类型的控件集合
 * @param controls 控件综合集
 * @param searchType 需要查找的控件类型
 */
const getTypeControls = (controls,searchType) => {
    return controls.filter(({controlType})=>{
        return controlType===searchType;
    });
}

/***
 * 查找控件基于指定类型的控件集中的控件索引
 * @param controls 所有控件信息
 * @param curControl 当前控件信息
 * @param objName 筛选条件，数据属性 根据该属性从指定类型集合中匹配数据索引
 * @paramc type 控件类型 需要查找数据索引的控件类型
 * @param typeControls 指定类型的控件集合
 * @param sarchIndex 控件基于指定类型的控件集中的控件索引，默认为0
 * @return sarchIndex {Number} 控件基于指定类型的控件集中的控件索引
 */
const getControlIndex = (controls,curControl,objName,type,typeControls,sarchIndex=0)=>{
    let {controlType}=curControl;
    // 获取需要查找日历索引的日历控件控件文字信息
    let tempObjName=curControl[objName];
    //判断是否为第一次执行
    if(typeControls===undefined){
        // 获取所有的日历类型控件
        typeControls = getTypeControls(controls,type);
    }

    //判断递归查找次数是否已满或当前信息不是要查找的类型
    if((controlType!==type)||sarchIndex===typeControls.length){
        sarchIndex=-1;
        return sarchIndex;
    }

    //判断当前控件信息是否要查找的控件信息
    if(typeControls[sarchIndex][objName]===tempObjName){
        return sarchIndex;
    }
    //递归次数累加
    sarchIndex++;
    return getControlIndex(controls,curControl,objName,type,typeControls,sarchIndex);
}

// 车间工作信息组件
const workShopList = () => import("components/workshopList");
// 员工信息组件
const emplyeeInfor = () => import("components/employeeInfor");
// 人员定位警告组件
const employeeWarn = () => import("components/employeeWarn");
export {
    mouseTypies,
    workShopList,
    emplyeeInfor,
    employeeWarn,
    getTypeControls,
    getControlIndex
}