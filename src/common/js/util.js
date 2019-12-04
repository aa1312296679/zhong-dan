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

/**
 * 构建需要提交的弹窗信息
 * @method setDialogObj
 * @param dialogObj 弹窗信息
 * @param objType 需要设置的迭代属性名称
 * @param dialogInfor 迭代信息
 **/
const setDialogObj = (dialogObj,objType,dialogInfor)=>{
    // 获取迭代对象的迭代属性
    let tempObjValue = dialogObj[objType];
    // 判断迭代对象的迭代属性是否存在
    if(!tempObjValue){
        tempObjValue=[]
    }
    tempObjValue.push(dialogInfor);
    //更新设置迭代对象的迭代值
    dialogObj[objType]=tempObjValue;
}

/**
 * 提交信息数据重构处理
 **/
const submitContentHandles = {
    /***
     * @method text
     * @param dialogObj 弹窗信息
     * @param data 当前迭代信息
     * */
    text(dialogObj,data){
        setDialogObj(dialogObj,'texts',{id:data['id'], textValues:data['txtChildren']});
    },
    input(dialogObj,data){
        setDialogObj(dialogObj,'inputs',{id:data['id'], curValue:data['curValue']});
    },
    /***
     * input数据集的非空判断
     * @method someInput
     * @param inputs 所有input信息
     */
    someInput(inputs){
       return  inputs.some((item)=>{
         return item['curValue']===""
        })
    }
}

/***
 * 车间详情业务模块的按钮点击处理
 */
const btnHandles={
    submit(){
        // 获取需要提交的input文本输入框的值和车间名称
        let {inputs,texts}=submitContents(this.dialog.dialogContents);
        //input文本输入框数据集的非空判断
        if(submitContentHandles.someInput(inputs)){
            console.log("有信息未填，不可提交");
            return false
        }
        console.log("----提交信息----");
        console.log(inputs);
        console.log(texts);
    },
    cancel(){
        this.dialogShadeHandle('dialogHide');
    },
    score(){
        this.dialogShadeHandle('dialogShow');
    },
    workShopInspectionClosed(){
        this.$emit("onClose");
    },
    shadeClick(){
        this.dialogShadeHandle('dialogHide');
    },
    dialogClose(){
        this.dialogShadeHandle('dialogHide');
    }
}

/**
 * 动态构建车间详情的弹窗模块的提交信息
 * @method submitContents
 * @param dialogContents 弹窗信息
 */
const submitContents = (dialogContents) => {
    // 存储所有文字信息和所有input信息
    return dialogContents.reduce((dialogObj,curItem)=>{
        // 获取当前数据信息
        let tempCurInfor=curItem;
        // 获取迭代对象
        let tempDialogObj = dialogObj;
        // 获取数据类型
        let tempType = tempCurInfor['type'];
        // 根据不同的数据类型进行相应的数据重构
        submitContentHandles[tempType](tempDialogObj,tempCurInfor);
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
//风控列表
const dropDownMenu = () => import("components/dropDownMenu");

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
    submitContents,
    submitContentHandles,
    btnHandles,
    dropDownMenu
}