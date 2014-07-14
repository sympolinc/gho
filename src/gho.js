/* 
 * The MIT License
 *
 * Copyright 2014 sympol foundation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function(context, name, version) {
    function when(match, obj, arg, context) {
        return obj[match] ? typeof obj[match] === 'function' ? obj[match].apply(context, arg) : obj[match] : obj.def && typeof obj.def === 'function' && obj.def.apply(context, arg) || null;
    }
    var initializing = false,
            superPattern =
            /xyz/.test(function() {
                xyz;
            }) ? /\b_super\b/ : /.*/;
    Object.subClass = function(properties) {
        var _super = this.prototype;
        initializing = true,
                proto = new this();
        initializing = false;
        for (var name in properties) {
            proto[name] = typeof properties[name] === "function" &&
                    typeof _super[name] === "function" &&
                    superPattern.test(properties[name]) ?
                    (function(name, fn) {
                        return function() {
                            var tmp = this._super;
                            this._super = _super[name];
                            var ret = fn.apply(this, arguments);
                            this._super = tmp;
                            return ret;
                        };
                    })(name, properties[name]) :
                    properties[name];
        }
        function Class() {
            var self = this;
            self.Extend = function() {
                for (var i = 0; i < arguments.length; i++) {
                    var arg = arguments[i];
                    for (var item in arg) {
                        if (!self[item]) {
                            self[item] = arg[item];
                        }
                    }
                }
                return self;
            };
            self.Implement = function() {
                for (var i = 0; i < arguments.length; i++) {
                    var arg = arguments[i];
                    for (var item in arg) {
                        self[item] = arg[item];
                    }
                }
                return self;
            };
            if (!initializing && this.constructor) {
                this.constructor.apply(this, arguments);
            }
        }
        Class.prototype = proto;
        Class.constructor = Class;
        Class.subClass = arguments.callee;
        return Class;
    };
    function Klass(properties) {
        if (!(this instanceof arguments.callee)) {
            return new Klass(properties);
        }
        if (properties.Extends) {
            for (var item in properties.Extends.prototype) {
                if (!properties[item]) {
                    properties[item] = properties.Extends.prototype[item];
                }
            }
            properties.parent = properties.Extends.prototype.constructor;
            delete properties.Extends;
        }
        if (properties.Implements) {
            for (var item in properties.Implements.prototype) {
                properties[item] = properties.Implements.prototype[item];
            }
            delete properties.Implements;
        }
        if (!properties) {
            properties = {};
        }
        if (properties.constructor) {
            properties.constructor = function() {
            };
        }
        return Object.subClass(properties);
    }
    function Namespace(properties) {
        if (!(this instanceof arguments.callee)) {
            return new Namespace(properties);
        }
        properties = properties || {};
        var obj = {};
        for (var prop in properties) {
            var item = properties[prop];
            obj[prop] = typeof item === 'function' ?
                    (function(func) {
                        return function() {
                            var ret = func.apply(this, arguments);
                            return ret;
                        };
                    })(item) : item;
        }
        return obj;
    }
    var gho = {};
    gho.extend = function(dest, src) {
        if (!src) {
            for (var item in dest) {
                if (!gho[item]) {
                    gho[item] = dest[item];
                }
            }
            return gho;
        } else {
            for (var item in src) {
                dest[item] = src[item];
            }
            return dest;
        }
    };
    gho.implement = function(dest, src) {
        if (!src) {
            for (var item in dest) {
                gho[item] = dest[item];
            }
            return gho;
        } else {
            for (var item in src) {
                dest[item] = src[item];
            }
            return dest;
        }
    };
    _nativeCopies = {
        'array': (function() {
            function F(length) {
                if (arguments.length === 1 && typeof length === "number") {
                    this.length = -1 < length && length === length << 1 >> 1 ? length : this.push(length);
                } else if(arguments.length === 1 && gho.of(arguments[0],Array)){
                    this.push.apply(this,arguments[0]);
                } else if (arguments.length) {
                    this.push.apply(this, arguments);
                }
            }
            function J() {
            }
            ;
            J.prototype = [];
            F.prototype = new J;
            F.prototype.constructor = F;
            return F;
        })(),
        'string': (function() {
            var MyString = function() {
            };
            var fn = function() {
            };
            fn.prototype = String.prototype;
            MyString.prototype = new fn();
            return MyString;
        })(),
        'object': (function() {
            return Object;
        })(),
        'number': (function() {
            function F() {
            }
            function J() {
            }
            J.prototype = Number.prototype;
            F.prototype = new J;
            return F;
        })()
    };
    gho.native = function(item) {
        if (gho.type(item) === 'string') {
            return _nativeCopies[item.toLowerCase()];
        } else {
            return _nativeCopies[gho.type(item)];
        }
    };
    gho.when = when;
    gho.Class = Klass;
    gho.Namespace = Namespace;
    context[name] = gho;
})(this, 'gho', '1.0.0.0');
gho.extend({
    map: function(items, callback) {
        var ret = [], i = 0, l = items.length;
        for (; i < l; i += 1) {
            ret.push(callback.call(items, items[i], i));
        }
        return ret;
    },
    one: function(items, callback) {
        items = gho.map(items, callback);
        return items.length > 1 ? items : items[0];
    },
    each: function(items, callback) {
        return gho.map(items, callback);
    },
    type: function(val) {
        var _types = ['Object', 'Array', 'Error', 'String', 'Date', 'RegExp', 'Boolean', 'Function', 'Number'],
                _classes = (function() {
                    var obj = {};
                    gho.each(_types, function(item) {
                        obj['[object ' + item + ']'] = item.toLowerCase();
                    });
                    return obj;
                })();
        return _classes[Object.prototype.toString.call(val)];
    },
    call: function(obj, method, thisItem) {
        if (arguments.length === 3) {
            return gho.use(obj, method).call(thisItem);
        } else if (argumentslength > 3) {
            return gho.apply.apply(null, arguments);
        }
        throw "";
    },
    apply: function(obj, method, $arg) {
        var args = gho.call(Array, 'slice', arguments);
        var thisItem = args[2];
        args.shift();
        args.shift();
        args.shift();
        return gho.use(obj, method).apply(thisItem, args);
    },
    use: function(obj, method) {
        if (!obj || !method) {
            return;
        }
        return obj.prototype[method];
    },
    fill: function(obj, method, func) {
        if (!obj || !method) {
            return;
        }
        if (gho.type(method) === 'object') {
            for (var item in method) {
                gho.fill(obj, item, method[item]);
            }
            return gho;
        }
        if (!obj.prototype[method]) {
            obj.prototype[method] = func;
        }
        return gho;
    },
    fix: function(obj, method, func) {
        if (!obj || !method) {
            return;
        }
        if (gho.type(method) === 'object') {
            for (var item in method) {
                gho.fix(obj, item, method[item]);
            }
            return gho;
        }
        obj.prototype[method] = func;
        return gho;
    },
    of: function(item, obj) {
        return (item instanceof obj);
    },
    trim:function (str){
        return str.replace(/^\s+|\s+$/g,'');
    }
});
gho.Array = gho.native('array');
gho.fix(gho.Array, {
    map: function(fn) {
        if (gho.type(fn) === 'function') {
            var ret = new gho.Array();
            for (var i = 0; i < this.length; i++) {
                ret.push(fn.call(this, this[i], i));
            }
            return ret;
        }
        return this;
    },
    filter: function(match) {
        return gho.when(gho.type(match),{
            'function':function(fn){
                var ret= new gho.Array();
                this.forEach(function(item, i) {
                    if (fn.call(this, item, i)) {
                        ret.push(item);
                    }
                });
                return ret;
            },
            'regexp':function(rx){
                var ret= new gho.Array();
                this.forEach(function(item) {
                    if (rx.test(item)) {
                        ret.push(item);
                    }
                });
                return ret;
            },
            def:function(match){
                var ret= new gho.Array();
                this.forEach(function(item) {
                    if (item===match) {
                        ret.push(item);
                    }
                });
                return ret;
            }
        },arguments,this);
    },
    forEach: function(fn) {
        return this.map(fn);
    },
    one: function(fn) {
        return this.forEach(fn).shift();
    },
    copy: function() {
        var ret = new gho.Array();
        this.forEach(function(i) {
            ret.push(i);
        });
        return ret;
    },
    merge: function() {
        for(var i=0;i<arguments.length;i++){
            var arg=arguments[i];
            if (gho.type(arg) === 'array') {
                for (var o = 0; o < arg.length; o++) {
                    this.push(arg[o]);
                }
            } else {
                this.push(arg);
            }
        }
        return this;
    },
    contains:function(match){
        return this.filter(match).length>0;
    },
    all:function(match){
        return this.filter(match).length===this.length;
    },
    clean:function(){
        return this.filter(function(i){
            return i!==undefined && i !==null;
        });
    },
    i:function(index){
        return this[index];
    },
    add:function(){
        var self=this;
        for(var i=0;i<arguments.length;i++){
            var arg=arguments[i];
            if(gho.type(arg)==='array'){
                for (var o = 0; o < arg.length; o++) {
                    if(!self.contains(arg[o])){
                        self.push(arg[o]);
                    }
                }
            } else {
                if(!self.contains(arg)){
                    self.push(arg);
                }
            }
        }
        return self;
    },
    singles:function(){
        var ret=new gho.Array();
        this.forEach(function(item){
            if(!ret.contains(item)){
                ret.push(item);
            }
        });
        return ret;
    },
    name:function(arg){
        if(arguments.length){
            if(arguments.length===this.length){
                var obj=new gho.Object(),
                    args=arguments;
                this.forEach(function(item,i){
                    obj[args[i]]=item;
                });
                return obj;
            } else {
                if(gho.type(arg)==='array'&&
                    arg.length===this.length){
                    var obj=new gho.Object();
                    this.forEach(function(item,i){
                        obj[arg[i]]=item;
                    });
                    return obj;
                }
            }
        }
        return this;
    },
    plain:function(){
        var ret=[];
        this.forEach(function(item){
            ret.push(item);
        });
        return ret;
    },
    first:function(){
        return this[0];
    },
    last:function(){
        return this[this.length-1];
    },
    at:function(match){
        return gho.when(gho.type(match),{
            'function':function(fn){
                var fnd=-1;
                this.forEach(function(item,i) {
                    if (fn.call(this,item,i)&&!(fnd>-1)) {
                        fnd=i;
                    }
                });
                return fnd;
            },
            'regexp':function(rx){
                var fnd=-1;
                this.forEach(function(item,i) {
                    if (rx.test(item)&&!(fnd>-1)) {
                        fnd=i;
                    }
                });
                return fnd;
            },
            def:function(match){
                var fnd=-1;
                this.forEach(function(item,i) {
                    if (item===match&&!(fnd>-1)) {
                        fnd=i;
                    }
                });
                return fnd;
            }
        },arguments,this);
    },
    conv:function(obj){
        return gho.when(gho.type(obj),{
            'array':function(arr){
                var ret=new gho.Array();
                for(var i=0;i<arr.length;i++){
                    ret.push(arr[i]);
                }
                return ret;
            },
            'object':function(obj){
                var ret=new gho.Array();
                for(var item in obj){
                    ret.push(obj[item]);
                }
                return ret;
            },
            def:function(item){
                var ret=new gho.Array();
                ret.push(item);
                return ret;
            }
        },arguments,this);
    },
    rand:function(){
        return this[Math.floor(Math.random() * this.length)];
    },
    collapse:function(){
        var f=function(arr){
            var is=gho.of(arr,Array);
            if(is&&arr.length>0){
                var h=arr[0],t=arr.slice(1);
                return f(h).concat(f(t));
            }else{
                return [].concat(arr);
            }
        };
        return new gho.Array(f(this));
    },
    json:function(){
        return gho.JSON.parse(this.literal());
    },
    literal:function(){
        return gho.JSON.stringify(this.plain());
    }
});
gho.JSON={
    stringify:function(obj){
        var t = typeof (obj);
        if (t !== "object" || obj === null) {
            if (t === "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            var n, v, json = [],
                arr = (obj && obj.constructor === Array);
            for (n in obj) {
                v = obj[n];
                t = typeof (v);
                if (t === "string") v = '"' + v + '"';
                else if (t === "object" && v !== null) v = JSON.stringify(v);
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    },
    parse:function(str){
        if (window.JSON && window.JSON.parse) {
            console.log(str)
            return window.JSON.parse(str);
        }
        if (str === null) return str;
        if (gho.type(str, 'string')) {
            str = gho.trim(str);
            if (str) {
                return (new Function("return " + str));
            }
        }
    }
};
gho.Object = gho.native('object');
gho.fix(gho.Object,{
    map:function(fn){
        var ret= new gho.Object();
        for(var i in this){
            if ( this.hasOwnProperty(i) ) {
                ret[i]=fn.call(this,this[i],i);
            }
        }
        return ret;
    },
    forEach:function(fn){
        return this.map(fn);
    },
    filter: function(match) {
        return gho.when(gho.type(match),{
            'function':function(fn){
                var ret= new gho.Object();
                this.forEach(function(item, i) {
                    if (fn.call(this, item, i)) {
                        ret[i]=item;
                    }
                });
                return ret;
            },
            'regexp':function(rx){
                var ret= new gho.Object();
                this.forEach(function(item,i) {
                    if (rx.test(item)) {
                        ret[i]=item;
                    }
                });
                return ret;
            },
            def:function(match){
                var ret= new gho.Object();
                this.forEach(function(item,i) {
                    if (item===match) {
                        ret[i]=item;
                    }
                });
                return ret;
            }
        },arguments,this);
    },
    contains:function(match){
        return this.filter(match).key().length>0;
    },
    clear:function(){
        this.forEach(function(item,key){
            delete this[key];
        });
        return this;
    },array:function(){
        return this.values();
    },
    values:function(){
        var ret=new gho.Array();
        this.forEach(function(item){
           ret.push(item); 
        });
        return ret;
    },
    keys:function(){
        var ret=new gho.Array();
        this.forEach(function(item,key){
           ret.push(key); 
        });
        return ret;
    },
    size:function(){
        var i=0;
        this.forEach(function(){
            i++;
        });
        return i;
    },
    add:function(key,val){
        if(gho.type(key)==='object'){
            this.forEach(function(item,keey){
                this.add(keey,item)
            });
        } else {
            this[key]=val;
        }
        return this;
    },
    rand:function(){
        var index=Math.floor(Math.random() * this.size()),i=0,v;
        this.forEach(function(item){
            i++;
            if(i===index){
                v=item;
            }
        });
        return v;        
    }
    
});