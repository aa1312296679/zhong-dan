/***
 * 一级列表漂浮鼠标漂浮处理
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

/***
 * dialog显示与隐藏
 **/
let dialogHandles = {
    dialogShow(){ //显示弹窗和弹窗的遮罩
        this.dialog.shadeObj.show();
        this.dialog.dialogObj.show();
    },
    dialogHide(){ //隐藏弹窗和弹窗的遮罩
        this.dialog.shadeObj.hide();
        this.dialog.dialogObj.hide();
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

/**
 * listContent组件鼠标漂浮处理
 */
const lisrContentMouse = {
    over(){
      this.isMouse=true;
    },
    out(){
        this.isMouse=false;
    }
}

// /**
//  * setDialogObj 构建需要提交的弹窗信息
//  * @param objType 需要设置的迭代属性名称
//  **/
// const setDialogObj=(objType)=>{
//
// }


/**
 * 动态构建车间详情的弹窗模块的提交信息
 * @method submitContents
 * @param dialogContents 弹窗信息
 */
const submitContents = (dialogContents) => {
    // 存储所有文字信息和所有input信息
    return dialogContents.reduce((dialogObj,curItem)=>{
        // 获取当期数据信息
        let tempCurInfor=curItem;
        // 获取迭代对象
        let tempDialogObj = dialogObj;
        // 判断当前数据信息是否为text类型
        if(tempCurInfor['type']==="text"){
               // 获取迭代对象的texts属性
               let {texts} = tempDialogObj;
               // 判断当前的迭代对象是否存在存储文字信息的属性
               if(!texts){
                   texts=[]
               }
               // 迭代存储文字信息
               texts.push({id:tempCurInfor['id'], textValues:tempCurInfor['txtChildren']});
               tempDialogObj['texts']=texts;
        // 判断当前数据信息是否为input类型
        }else if(tempCurInfor['type']==='input'){
            // 获取迭代对象的inputs属性
            let {inputs} = tempDialogObj;
            // 判断当前的迭代对象是否存在存储input信息的属性
            if(!inputs){
                inputs=[]
            }
            // 迭代存储input信息
            inputs.push({id:tempCurInfor['id'], curValue:tempCurInfor['curValue']});
            tempDialogObj['inputs']=inputs;
        }
        return tempDialogObj
    },{})
}

// 车间工作信息
const workShopList = () => import("components/workshopList");
// 员工信息
const emplyeeInfor = () => import("components/employeeInfor");
// 人员定位警告
const employeeWarn = () => import("components/employeeWarn");
// 施工警告管理
const constructionWarn = () => import("components/constructionWarn");
// 巡检管理
const Inspection = () => import("components/Inspection");
//人员进出管理
const entryAndExits = () => import("components/entryAndExit");
//风险管控
const riskManagement = () => import("components/riskManagement");
//车间检查
const workshopInspection = () => import("components/workshopInspection");

export {
    mouseTypies,
    workShopList,
    emplyeeInfor,
    employeeWarn,
    getTypeControls,
    getControlIndex,
    constructionWarn,
    Inspection,
    lisrContentMouse,
    entryAndExits,
    riskManagement,
    workshopInspection,
    dialogHandles,
    submitContents
}