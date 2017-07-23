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
    let doc = document
    const Action = {
        backColor :{//修改文档的背景颜色
            title : "backColor",
            execCommand : str=>exec('backColor',false,str)
        },
        bold: {//字体加粗
            title : 'bold',
            execCommand : ()=>exec('bold',false,null)
        },
        contentReadOnly : {//设置可编辑性
            title : 'contentReadOnly',
            execCommand : (bool) => exec('contentReadOnly',false,!!bool)
        },
        copy : {//拷贝当前选中内容到剪贴板
            title : 'copy',
            execCommand : ()=>exec('copy',false,null)
        },
        createLink : {//将选中内容创建为一个锚链接
            title : 'createLink',
            execCommand : ()=>{
                let link = window.prompt('enter a url link')
                return exec('createLink',false,link)
            }
        },
        cut : {// 剪贴当前选中的文字并复制到剪贴板
            title : 'cut',
            execCommand:()=>exec('cut',false,null)
        },
        decreaseFontSize : {// 给选中文字加上 <small> 标签
            title : 'decreaseFontSize',
            execCommand:()=>exec('decreaseFontSize',false,null)
        },
        delete : {//删除选中部分
            title : 'delete',
            execCommand:()=>exec('delete',false,null)
        },
        fontName : {//在插入点或者选中文字部分修改字体名称 需要提供一个字体名称字符串 (例如："Arial")作为参数。
            title : 'fontName',
            execCommand:(fontName)=>exec('fontName',false,fontName)
        },
        fontSize : {//在插入点或者选中文字部分修改字体大小.
            title : 'fontSize',
            execCommand:(foreColor)=>exec('fontSize',false,foreColor)
        },
        foreColor : {//在插入点或者选中文字部分修改字体颜色.
            title : 'foreColor',
            execCommand:(ColorString)=>exec('foreColor',false,ColorString)
        },
        forwardDelete : {//删除光标所在位置的字符。 和按下删除键一样。
            title : 'forwardDelete',
            execCommand:()=>exec('forwardDelete',false,null)        
        },
        insertHorizontalRule : {//一个分割行  在插入点插入一个水平线
            title : 'insertHorizontalRule',
            execCommand:()=>exec('insertHorizontalRule',false,null)        
        },
        insertImage : {//插入图片
            title : 'insertHorizontalRule',
            execCommand:()=>{
                let ImageUrl = window.prompt('enter a image link')
                exec('insertHorizontalRule',false,ImageUrl)
            }    
        },
        underline : {
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
        italic:{
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
})