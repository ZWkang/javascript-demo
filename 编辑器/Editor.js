(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return factory(root);
		});
	} else if (typeof exports === 'object') {
		module.exports = factory;
	} else {
		root.kangEditor = factory(root);
	}
})(this, function (root) {
    const doc = document
    const Action = {
        backColor: {//修改文档的背景颜色
            title: "backColor",
            execCommand: str => exec('backColor', false, str)
        },
        bold: {//字体加粗
            title: 'bold',
            execCommand: () => exec('bold', false, null)
        },
        contentReadOnly: {//设置可编辑性
            title: 'contentReadOnly',
            execCommand: (bool) => exec('contentReadOnly', false, !!bool)
        },
        copy: {//拷贝当前选中内容到剪贴板
            title: 'copy',
            execCommand: () => exec('copy', false, null)
        },
        createLink: {//将选中内容创建为一个锚链接
            title: 'createLink',
            execCommand: () => {
                let link = window.prompt('enter a url link')
                return exec('createLink', false, link)
            }
        },
        cut: {// 剪贴当前选中的文字并复制到剪贴板
            title: 'cut',
            execCommand: () => exec('cut', false, null)
        },
        decreaseFontSize: {// 给选中文字加上 <small> 标签
            title: 'decreaseFontSize',
            execCommand: () => exec('decreaseFontSize', false, null)
        },
        delete: {//删除选中部分
            title: 'delete',
            execCommand: () => exec('delete', false, null)
        },
        fontName: {//在插入点或者选中文字部分修改字体名称 需要提供一个字体名称字符串 (例如："Arial")作为参数。
            title: 'fontName',
            execCommand: (fontName) => exec('fontName', false, fontName)
        },
        fontSize: {//在插入点或者选中文字部分修改字体大小.
            title: 'fontSize',
            execCommand: (foreColor) => exec('fontSize', false, foreColor)
        },
        foreColor: {//在插入点或者选中文字部分修改字体颜色.
            title: 'foreColor',
            execCommand: (ColorString) => exec('foreColor', false, ColorString)
        },
        forwardDelete: {//删除光标所在位置的字符。 和按下删除键一样。
            title: 'forwardDelete',
            execCommand: () => exec('forwardDelete', false, null)
        },
        insertHorizontalRule: {//一个分割行  在插入点插入一个水平线
            title: 'insertHorizontalRule',
            execCommand: () => exec('insertHorizontalRule', false, null)
        },
        insertImage: {//插入图片
            title: 'insertHorizontalRule',
            execCommand:()=>{
                let ImageUrl = window.prompt('enter a image link')
                exec('insertHorizontalRule',false,ImageUrl)
            }    
        },
        underline : {//下划线
            title : 'underline',
            state : true,
            execCommand:()=>exec('underline',false,null)
        },
        insertOrderedList : {//在插入点或者选中文字上创建一个有序列表
            title : 'insertOrderedList',
            execCommand:()=>exec('insertOrderedList',false,null)
        },
        insertUnorderedList : {//在插入点或者选中文字上创建一个无序列表。
            title : 'insertUnorderedList',
            execCommand:()=>exec('insertUnorderedList',false,null)
        },
        insertText : {//在光标插入位置插入文本内容或者覆盖所选的文本内容。
            title : 'insertText',
            execCommand:()=>{
                 let value = window.prompt('enter a insertText')
                exec('insertText',false,value);
            }
        },
        insertParagraph:{//在选择或当前行周围插入一个段落
            title : 'insertText',
            execCommand:()=>exec('insertParagraph',false,null)
        },
        italic:{//斜体
            title : 'italic',
            execCommand:()=>exec('italic',false,null)
        },
        justifyCenter:{//居中
            title : 'justifyCenter',
            execCommand:()=>exec('justifyCenter',false,null)
        },
        justifyFull:{//文本对齐
            title : 'justifyFull',
            execCommand:()=>exec('justifyFull',false,null)
        },
        justifyLeft:{//左对齐
            title : 'justifyLeft',
            execCommand:()=>exec('justifyLeft',false,null)
        },
        justifyRight:{//右对齐
            title : 'justifyRight',
            execCommand:()=>exec('justifyRight',false,null)
        },
        undo : {//撤销
            title:'undo',
            execCommand:()=>exec('undo',false,null)
        },
        redo : {//重做被撤销的操作。
            title : 'redo',
            execCommand:()=>exec('redo',false,null)
        },
        removeFormat : {//对所选内容去除所有格式
            title : 'removeFormat',
            execCommand:()=>exec('removeFormat',false,null)
        },
        selectAll : {//选中编辑区里的全部内容。
            title : 'selectAll',
            execCommand:()=>exec('selectAll',false,null)
        },
        unlink : {//去除去除所选的锚链接的<a>标签
            title : 'unlink',
            execCommand:()=>exec('unlink',false,null)
        },
        formatBlock : {//添加一个HTML块式标签在包含当前选择的行, 如果已经存在了，更换包含该行的块元素
            title : 'formatBlock',
            execCommand:(tagName)=>exec('formatBlock',false,tagName)
        }
    }
    function exec(...arg){
        document.execCommand(arg[0],arg[1],arg[2])
    }
    var testDiv = document.createElement("div");
    function getSelectionHTML(){
　　　　　if(window.getSelection){
　　　　　　　selectionObj = window.getSelection();
　　　　　　　selectedText = selectionObj.toString();
　　　　　　　rangeObj = selectionObj.getRangeAt(0);
　　　　　　　var docFragment = rangeObj.cloneContents();
　　　　　　  var tempDiv = document.createElement("div");
　　　　　　　tempDiv.appendChild(docFragment);
　　　　　　　selectedHtml = tempDiv.innerHTML;
　　　　　}else if(document.selection){
　　　　　　　selectionObj = document.selection;
　　　　　　　rangeObj = selectionObj.createRange();
　　　　　　　selectedText = rangeObj.text;
　　　　　　　selectedHtml = rangeObj.htmlText;
　　　　　}
    }
    let Editor = function(){}
    Editor.prototype.init = function(){

    }
    function EditorWrap(){

    }
	var objectToString = Object.prototype.toString;
    var fnToString = Function.prototype.toString;

    //检查类型
    const checkType = (type)=>{
        return (obj) => {
            return objectToString.call(obj) === '[object '+ type +']';
        }
    }
    const ObjectCheckType = checkType('object');
    const ArrayCheckType = checkType('array');
    const testDiv = document.createElement('div');

    //检查css属性是否存在
    const checkCss = (str)=>{
        if(ArrayCheckType(str)){
            return str.some((v)=>{
                return (v in testDiv.style);
            })
        }
        return (str in testDiv.style);
    }
    
    // var cssChange = checkCss('cssChange')
    /**
     * Utils
     */
    const Utils = {
        'cssChange':checkCss('cssChange'),
        'ObjectCheckType' : checkType('Object'),
        'ArrayCheckType' : checkType('Array'),
        'isUndefined': checkType('Undefined')
    }
    // function generatorIs(){}

    /**
     * 隔离化操作
     */

    //定义一些标签模板
    const iframeTemplate = document.createElement('iframe');
    const divTemplate = document.createElement('div');
    const ulTemplate = document.createElement('ul');


    class initActionConfig{
        constructor(ActionList){
            this.ActionList = ActionList;
        }
    }
    class initStyleConfig{
        constructor(){
            this.iframeObject = iframeTemplate.cloneNode();
        }
        initIframeStyle(){

        }
        initContentStyle(){}
        initTitleStyle(){}

    }
    // function generatorIframe(setting){
    class generatorIframe{
        get iframeObject(){

            return iframeTemplate.cloneNode()
        }
        
        constructor(iframeObject){
            //默认style样式
            this.style = {
                iframe:{
                    body:{
                        margin:'0',
                        padding:'0',
                        overflow:'hidden'
                    }
                },
                content:{
                    MaxWidth:'100%',
                    MinWidth:'100%',
                    MaxHeight:'100%',
                    MinHeight:'500px',
                    FontSize:'16px'
                },
                title:{
                    MaxWidth:'100%',
                    MinWidth:'100%',
                    MaxHeight:'20px',
                    MinHeight:'20px',
                    FontSize:'16px'
                },
                titleitem:{
                    MaxWidth:'20px',
                    MinWidth:'20px'
                }
            }
            this.toolbarList = {

            }
            //挂载的回调函数
            this.MountFunction = function(){}
            this.iframeObject = iframeObject
            this.defaultTitleItems = {
                bold,
                insertImage,
                italic,
                justifyCenter,
                htitle:([1,2,3,4,5,6].map((v)=>{
                        let result = {};
                        result['title'] = 'H'+v;
                        result['execCommand'] = ()=>{
                            Action['formatBlock'].execCommand('h'+v);
                        }
                        return result
                    })),
                justify:(['Center','Full','Left','Right'].map((v)=>{
                    return Action['justify'+v];
                })),
                insertImage,
                underline,
                undo
            }
        }
        get settingsKeys(){
            return Object.keys(this.defaultTitleItems);
        }
        
        generatorUlList(nums,event,text){
            if(Utils.ArrayCheckType(nums)){
                console.error(`error nums argument`);
                return false;
            }
            let ulContainer = ulTemplate.cloneNode();
            let liContainer = document.createElement('li');
            for (let i = 0;i < nums;i++){
                liContainer.onclick = event||'';
                liContainer.innerText = text;
                if(Utils.ArrayCheckType(nums[i])){
                    ulContainer.appendChild(generatorUlList(nums[i]))
                }else{
                    ulContainer.appendChild(liContainer.cloneNode())
                }
            }
            return ulContainer;
        }    
        initConfig(setting){
            if(Utils.ObjectCheckType[setting]&&Utils.isUndefined(setting['style'])){
                console.error('setting throw a typeerror');
                return ;
            }
            const style = setting.style;
            styleGiveChange(this.style,style);

        }
        static titleItemFixSetting(defaultsetting,setting){
            if(Utils.isUndefined(setting)){
                console.error('maybe you want default setting')
                return false;
            }
            const keys = Object.keys(setting);
            for(let i in keys){
                if(Utils.ArrayCheckType(i)){
                    if(i in this.settingsKeys){

                    }
                }else{
                    
                }
            }

        }
        static styleGiveChange(style,setting){
            if(!(this instanceof generatorIframe)){
                console.error('plz use new generatorIframe');
                return ;
            }
            const styleKeys = Object.keys(style);
            styleKeys.forEach((v,index)=>{
                this.style[v] = Object.assign(this.style[v],setting[v]);
            })
        }
        
        clearDefault (eleObject){
            eleObject.style.margin='0';
            eleObject.style.padding = '0';
            return eleObject;
        }
        static giveValue(target = {},result){
            for(let i in target){
                if(target.hasOwnProperty(i)){
                    result[i] = target[i];
                }
            }
            return result
        }
        static generatorContent(){
            let divObject = divTemplate.cloneNode();
            divObject.setAttribute('contenteditable','true');
            return this.giveValue(this.style['content'],divObject);
        }
        
        static generatorTitle(){
            let divObject = divTemplate.cloneNode()
            // divObject.appendChild()
        }


        generatorDefaultIframe(){

        }
        // return iframeObject;
    }
    /**
     * 数据绑定接口
     */
    
    function bangInterface(eleObject){
        var saveCache = {}
        return function(context){
            var arg = arguments.slice(1);
            // eleObject.addEventListener(event,callback,false);
            if(!!saveCache[arg[0]]){
                eleObject.removeEventListener.apply(context,arg);
            }
            saveCache[arg[0]] = arg[1];
            eleObject.addEventListener.apply(context,arg);
            return true;
        }
    }
    
    /*
     * 初始化操作
     */
    function init(mountElementObject){
    
    }
})