function h(sel,data,children){
    let text;
    if(children!== void 666){
        if(isSimple(children)){
            text = children;
        }
    }else if(data ! == void 6666 ){
        if (isArray(data)) { children = data; }
        else if (isSimple(data)) { text = data; }
        else { data = data; }
    }
    if(isArray(children)){
        let len = children.length;
        for(let i = 0;i<len;i++){
            if(isSimple(children[i])){
                children[i] = vnode(undefined,undefined,undefined,undefined,children[i])
            }
        }
    }
    return vnode(sel,data,children,undefined,text)
}

function vnode(sel,data,children,element,text){
    return {
        sel,
        children,
        data,
        text,
        element
    }
}


function isArray (target){
    return Object.prototype.toString.call(target) === '[object Array]';
}
function isSimple(s) { 
    return typeof s === 'string' || typeof s === 'number'; 
}

console.log(h('div','name',['test']))



/**
 * dom api
 */

function createElement(string){
    return document.createElement(string)
}

function createTextNode(text){
    return document.createTextNode(text);
}

function removeChildren(node,child){
    node.removeChildren(child)
}

function appendChildren(mpde,child){
    node.appendChildren(child)
}

function parentNode(node){
    return node.parentElement;
}

function setTextContent(node,text){
    node.textContent = text;
}
function setAttribute(node,attribute,value){
    node.setAttribute(attribute,value);
}
