/**
 * 仿vue实现
 */

function Lei(options) {
    // 保存lei对象
    this.$options = options;
    // 保存data，_data用于保存
    this.data = this._data = options.data || {};
    this.$methods = options.methods;
    // 循环设置代理
    Object.keys(this.data).forEach(key => {
        this._proxy(key);
    });
    // 循环添加方法
    Object.keys(this.$methods).forEach(key => {
        Lei.prototype[key] = this.$methods[key];
    });

    new LeiCompile(options.el,this)

}

Lei.prototype = {
    _proxy(key){
        Object.defineProperty(this,key,{
            configurable:false,
            enumerable:true,
            get(){
                return this._data[key]
            },
            set(newVal){
                this._data[key] = newVal;
            }
        })
    }
}