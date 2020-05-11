/**
 * 编译器
 */

function LeiCompile(el,lei){
    
    this.$lei = lei;
    let srcNode = document.querySelector(el) || document.getElementsByName('body')[0];
    // 1 取出所有的子节点
    this.getAllNodes(el);
    // 2 编译所有子节点
    this.init();
    // 3 放入页面展示
    srcNode.appendChild(this.$fragment);
}

LeiCompile.prototype={
    getAllNodes(el){
        // 取出所有子节点
        let ele = document.querySelector(el);
        let fragment = document.createDocumentFragment();
        while(child = ele.firstChild){
            fragment.appendChild(child);
        }
        this.$fragment = fragment;
    },
    init(){
        this._compileNodes(this.$fragment);
    },
    _compileNodes(fragment){
        let childNodes = fragment.childNodes
        // 遍历所有子节点
        Array.prototype.slice.call(childNodes).forEach(node => {
            // 判断节点类型
            if(this.isElement(node)){
                // 是标签
            }else if(this.isText(node)){
                // 是文本
                this.compileText(node);
            }
            if(node.childNodes && node.childNodes.length){
                this._compileNodes(node);
            }
        })
    },
    isElement(node){
        return node.nodeType === 1
    },
    isText(node){
        return node.nodeType === 3
    },
    // 双花括号编译
    compileText(node){
        var reg = /{{(.*?)}}/g;
        let textContent = node.textContent.trim();
        let tempStr = textContent;
        while (temp = reg.exec(textContent)) {
            tempStr = tempStr.replace(temp[0],eval(`with(this.$lei){${temp[1]}}`));
        }
        node.textContent = tempStr;
    }
}
