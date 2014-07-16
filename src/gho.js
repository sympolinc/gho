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
/**
 * 
 * @package gho
 * @version 1.0.0.0 
 */
(function(context, name, version) {
    var window = context,
            document = window.document,
            docPosition = function() {
                if ( document.compareDocumentPosition ) {
                    return function(src, compare) {
                        return src.compareDocumentPosition(compare);
                    };
                }
                return function(src, compare) {
                    var elem = src.documentOwner.getElementsByTagName("*"),
                            i = elem.length;
                    while ( i-- ) {
                        if ( elem[i] === src ) {
                            return 2;
                        }
                        if ( elem[i] === compare ) {
                            return 4;
                        }
                    }
                    return 1;
                };
            }(),
            sort = function() {
                return docPosition.apply(null, arguments);
            }, traverse = {
        lat: function(elem, dir) {
            while ( elem[dir] && elem.nodeType !== 1 ) {
            }
            return elem;
        },
        kid: function(elem, dir) {
            var opts = {
                0: {
                    kid: "firstChild",
                    sib: "lastSibling"
                },
                1: {
                    kid: "lastChild",
                    sib: "previousSibling"
                }
            }, go = opts[dir || 0];
            if ( elem = elem[go.kids] ) {
                while ( elem && elem[go.sib] && elem.nodeType !== 1 ) {
                    return elem;
                }
            }
        }
    }, fixQuote = function(str) {
        if ( !str ) {
            return str;
        }
        var chr = str[0];
        return chr === '"' || chr === "'" ? str.slice(1, -1) : str;
    }, indexOf = function() {
        if ( Array.prototype.indexOf ) {
            return Array.prototype.indexOf;
        }
        return function(obj, item) {
            var i = this.length;
            while ( i-- ) {
                if ( this[i] === item ) {
                    return i;
                }
            }
            return -1;
        };
    }(),
            inside = function(stt, end) {
                var rx = regex.inside.source.replace(/</g, stt).replace(/>/g, end);
                return new RegExp(rx);
            }, replace = function(rx, name, val) {
        rx = rx.source;
        rx = rx.replace(name, val.source || val);
        return new RegExp(rx);
    }, cleanURL = function(url) {
        return url.replace(/^(?:\w+:\/\/|\/+)/, "").replace(/(?:\/+|\/*#.*?)$/, "").split("/", num).join("/");
    }, parseN = function(parm, test) {
        parm = parm.replace(/\s+/g, "");
        var cap;
        if ( parm === "even" ) {
            parm = "2n+0";
        }
        else {
            if ( parm === "odd" ) {
                parm = "2n+1";
            }
            else {
                if ( !~parm.indexOf("n") ) {
                    parm = "0n" + parm;
                }
            }
        }
        cap = /^([+-])?(\d+)?n([+-])?(\d+)?$/.exec(parm);
        return {
            group: cap[1] === "-" ? -(cap[2] || 1) : +(cap[2] || 1),
            offset: cap[4] ? cap[3] === "-" ? -cap[4] : +cap[4] : 0
        };
    }, N = function(parm, test, last) {
        parm = parseN(parm);
        var group = parm.group,
                offset = parm.offset,
                find = !last ? 0 : 1,
                adv = !last ? "nextSibling" : "prevSibling";
        return function(el) {
            if ( el.parentNode.nodeType !== 1 ) {
                return;
            }
            var rel = traverse.kid(el, find),
                    pos = 0;
            while ( rel ) {
                if ( test(rel, el) ) {
                    pos++;
                }
                if ( rel === el ) {
                    pos -= offset;
                    return group && pos ? !(pos % group) && pos < 0 === group < 0 : !pos;
                }
                rel = traverse.lat(rel, adv);
            }
        };
    };
    var s2d = {};
    s2d.xpr = {
        "*": function() {
            if ( function() {
                var el = document.createElement("div");
                el.appendChild(document.createComment(""));
                return !!el.getElementsByTagName("*")[0];
            }() ) {
                return function(el) {
                    if ( el.nodeType === 1 ) {
                        return true;
                    }
                };
            }
            return function() {
                return true;
            };
        }(),
        "type": function(type) {
            type = type.toLowerCase();
            return function(el) {
                return el.nodeName.toLowerCase() === type;
            };
        },
        "attr": function(key, op, val, i) {
            op = s2d.ops[op];
            return function(el) {
                var mappings = {
                    "for": function(el) {
                        return el.htmlFor;
                    },
                    "class": function(el) {
                        var ret = el.className;
                        if ( ret === "" && el.getAttribute("class") === null ) {
                            return null;
                        }
                        return ret;
                    },
                    "href": function(el) {
                        return el.getAttribute("href", 2);
                    },
                    "title": function(el) {
                        return el.getAttribute("title") || null;
                    },
                    "id": function(el) {
                        return el.getAttribute ? el.getAttribute("id") : null;
                    },
                    "default": function(el) {
                        return el[key] !== null ? el[key] : el.getAttribute && el.getAttribute(key);
                    }
                };
                var attr = (mappings[key] || mappings["default"])(el);
                if ( attr === null ) {
                    return;
                }
                attr = attr + "";
                if ( i ) {
                    attr = attr.toLowerCase();
                    val = val.toLowerCase();
                }
                return op(attr, val);
            };
        },
        ":first-child": function(el) {
            return !traverse.lat(el, "previousSibling") && el.parentNode.nodeType === 1;
        },
        ":last-child": function(el) {
            return !traverse.lat(el, "nextSibling") && el.parentNode.nodeType === 1;
        },
        ":only-child": function(el) {
            return !traverse.lat(el, "nextSibling") && !traverse.lat(el, "previousSibling") && el.parentNode.nodeType === 1;
        },
        ":nth-child": function(parm, last) {
            return N(parm, function() {
                return true;
            }, last);
        },
        ":nth-last-child": function(parm) {
            return s2d.xpr[":nth-child"](parm, true);
        },
        ":root": function(el) {
            return el.ownerDocument.documentElement === el;
        },
        ":empty": function(el) {
            return !el.firstChild;
        },
        ":not": function(sel) {
            var test = compileSel(sel);
            return function(el) {
                return !test(el);
            };
        },
        ":first-of-type": function(el) {
            if ( el.parentNode.nodeType !== 1 ) {
                return;
            }
            var type = el.nodeName;
            while ( el = traverse.lat(el, "previousSibling") ) {
                if ( el.nodeName === type ) {
                    return;
                }
            }
            return true;
        },
        ":last-of-type": function(el) {
            if ( el.parentNode.nodeType !== 1 ) {
                return;
            }
            var type = el.nodeName;
            while ( el = traverse.lat(el, "nextSibling") ) {
                if ( el.nodeName === type ) {
                    return;
                }
            }
            return true;
        },
        ":only-of-type": function(el) {
            return s2d.xpr[":first-of-type"](el) && s2d.xpr[":last-of-type"](el);
        },
        ":nth-of-type": function(parm, last) {
            return N(par, function(rel, el) {
                return rel.nodeName === el.nodeName;
            }, last);
        },
        ":nth-last-of-type": function(parm) {
            return s2d.xpr[":nth-of-type"](parm, true);
        },
        ":checked": function(el) {
            return !!(el.checked || el.selected);
        },
        ":indeterminate": function(el) {
            return !s2d.xpr[":checked"](el);
        },
        ":enabled": function(el) {
            return !el.disabled && el.type !== "hidden";
        },
        ":disabled": function(el) {
            return !!el.disabled;
        },
        ":target": function(el) {
            return el.id === window.location.hash.substring(1);
        },
        ":focus": function(el) {
            return el === el.ownerDocument.activeElement;
        },
        ":matches": function(sel) {
            return compileSel(sel);
        },
        ":nth-match": function(parm, last) {
            var args = parm.split(/\s*,\s*/),
                    arg = args.shift(),
                    test = compileSel(args.join(","));
            return n(arg, test, last);
        },
        ":nth-last-match": function(parm) {
            return s2d.xpr[":nth-match"](parm, true);
        },
        ":links-here": function(el) {
            return el + "" === window.location + "";
        },
        ":lang": function(parm) {
            return function(el) {
                while ( el ) {
                    if ( el.lang ) {
                        return el.lang.indexOf(parm) === 0;
                    }
                    el = el.parentNode;
                }
            };
        },
        ":dir": function(parm) {
            return function(el) {
                while ( el ) {
                    if ( el.dir ) {
                        return el.dir === parm;
                    }
                    el = el.parentNode;
                }
            };
        },
        ":scope": function(el, con) {
            var context = con || el.ownerDocument;
            if ( context.nodeType === 9 ) {
                return el === context.documentElement;
            }
            return el === context;
        },
        ":any-link": function(el) {
            return typeof el.href === "string";
        },
        ":local-link": function(el) {
            if ( el.nodeName ) {
                return el.href && el.host === window.location.host;
            }
            var parm = +el + 1;
            return function(el) {
                if ( !el.href ) {
                    return;
                }
                var url = window.location + "",
                        href = el + "";
                return cleanURL(url, parm) === cleanURL(href, parm);
            };
        },
        ":default": function(el) {
            return !!el.defaultSelected;
        },
        ":valid": function(el) {
            return el.willValidate || el.validity && el.validity.valid;
        },
        ":invalid": function(el) {
            return !s2d.xpr[":valid"](el);
        },
        ":in-range": function(el) {
            return el.value > el.min && el.value <= el.max;
        },
        ":out-of-range": function(el) {
            return !s2d.xpr[":in-range"](el);
        },
        ":required": function(el) {
            return !!el.required;
        },
        ":optional": function(el) {
            return !el.required;
        },
        ":read-only": function(el) {
            if ( el.readOnly ) {
                return true;
            }
            var attr = el.getAttribute("contenteditable"),
                    prop = el.contentEditable,
                    name = el.nodeName.toLowerCase();
            name = name !== "input" && name !== "textarea";
            return (name || el.disabled) && attr === null && prop !== "true";
        },
        ":read-write": function(el) {
            return !s2d.xpr[":read-only"](el);
        },
        ":contains": function(parm) {
            return function(el) {
                var text = el.innerText || el.textContent || el.value || "";
                return !!~text.indexOf(parm);
            };
        },
        ":has": function(parm) {
            return function(el) {
                return s2d.find(parm, el).length > 0;
            };
        },
        ":name": function(parm) {
            return function(el) {
                return el.name===parm;
            };
        },
        ":input": function(el) {
            if ( el.tagName && (el.tagName.toLowerCase() === "input" || el.tagName.toLowerCase() === "select" || el.tagName.toLowerCase() === "textarea" || el.tagName.toLowerCase() === "button") ) {
                return true;
            }
        },
        ":button": function(el) {
            if ( el.tagName && (el.tagName.toLowerCase() === "button" || el.type === "button" || el.type === "submit" || el.type === "reset" || el.type === "image") ) {

            }
        }
    };
    s2d.ops = {
        "-": function() {
            return true;
        },
        "=": function(attr, val) {
            return attr === val;
        },
        "*=": function(attr, val) {
            return attr.indexOf(val) !== -1;
        },
        "~=": function(attr, val) {
            var i = attr.indexOf(val),
                    f, l;
            if ( i === -1 ) {
                return;
            }
            f = attr[i - 1];
            l = attr[i + attr.length];
            return (!f || f === " ") && (!l || l === " ");
        },
        "|=": function(attr, val) {
            var i = attr.indexOf(val),
                    l;
            if ( i === 0 ) {
                return;
            }
            l = attr[i + attr.length];
            return l === "-" || !l;
        },
        "^=": function(attr, val) {
            return attr.indexOf(val) === 0;
        },
        "$=": function(attr, val) {
            return attr.indexOf(val) + val.length === attr.length;
        },
        "!=": function(attr, val) {
            return attr !== val;
        }
    };
    s2d.cmb = {
        " ": function(test) {
            return function(el) {
                while ( el = el.parentNode ) {
                    if ( test(el) ) {
                        return el;
                    }
                }
            };
        },
        ">": function(test) {
            return function(el) {
                return test(el === el.parentNode) && el;
            };
        },
        "+": function(test) {
            return function(el) {
                return test(el = traverse.lat(el, "previousSibling")) && el;
            };
        },
        "~": function(test) {
            return function(el) {
                while ( el = traverse.lat(el, "previousSibling") ) {
                    if ( test(el) ) {
                        return el;
                    }
                }
            };
        },
        "<": function(test) {
            return function(el) {
                el = el.firstChild;
                while ( el = el.nextSibling ) {
                    if ( el.nodeType === 1 && test(el) ) {
                        return el;
                    }
                }
            };
        },
        "noop": function(test) {
            return function(el) {
                return test(el) && el;
            };
        },
        "ref": function(test, name) {
            var node;
            function ref(el) {
                var doc = el.ownerDocument,
                        nodes = doc.getElementsByTagName("*"),
                        i = node.length;
                while ( i-- ) {
                    node = nodes[i];
                    if ( ref.test(el) ) {
                        node = null;
                        return true;
                    }
                }
                node = null;
            }
            ref.cmb = function(el) {
                if ( !node || !node.getAttribute ) {
                    return;
                }
                var attr = node.getAttribute(name) || "";
                if ( attr[0] === "#" ) {
                    attr = attr.substring(1);
                }
                if ( attr === el.id && test(node) ) {
                    return node;
                }
            };
            return ref;
        }
    };
    var regex = {
        qname: /^ *([\w\-]+|\*)/,
        simple: /^(?:([.#][\w\-]+)|pseudo|attr)/,
        ref: /^ *\/([\w\-]+)\/ */,
        combinator: /^(?: +([^ \w*]) +|( )+|([^ \w*]))(?! *$)/,
        attr: /^\[([\w\-]+)(?:([^\w]?=)(inside))?\]/,
        pseudo: /^(:[\w\-]+)(?:\((inside)\))?/,
        inside: /(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|<[^"'>]*>|\\["'>]|[^"'>])*/
    };
    regex.inside = replace(regex.inside, "[^\"'>]*", regex.inside);
    regex.attr = replace(regex.attr, "inside", inside("\\[", "\\]"));
    regex.pseudo = replace(regex.pseudo, "inside", inside("\\(", "\\)"));
    regex.simple = replace(regex.simple, "pseudo", regex.pseudo);
    regex.simple = replace(regex.simple, "attr", regex.attr);
    var compile = function(sel) {
        var sel = sel.replace(/^\s+|\s+$/g, ""),
                test, filter = [],
                buff = [],
                subject, qname, cap, op, ref;
        while ( sel ) {
            if ( cap = regex.qname.exec(sel) ) {
                sel = sel.substring(cap[0].length);
                qname = cap[1];
                buff.push(tok(qname, true));
            }
            else {
                if ( cap = regex.simple.exec(sel) ) {
                    sel = sel.substring(cap[0].length);
                    qname = "*";
                    buff.push(tok(qname, true));
                    buff.push(tok(cap));
                }
                else {
                    throw new Error("Invalid selector.");
                }
            }
            while ( cap = regex.simple.exec(sel) ) {
                sel = sel.substring(cap[0].length);
                buff.push(tok(cap));
            }
            if ( sel[0] === "!" ) {
                sel = sel.substring(1);
                subject = makeSubject();
                subject.qname = qname;
                buff.push(subject.simple);
            }
            if ( cap = regex.ref.exec(sel) ) {
                sel = sel.substring(cap[0].length);
                ref = s2d.cmb.ref(makeSimple(buff), cap[1]);
                filter.push(ref.cmb);
                buff = [];
                continue;
            }
            if ( cap = regex.combinator.exec(sel) ) {
                sel = sel.substring(cap[0].length);
                op = cap[1] || cap[2] || cap[3];
                if ( op === "," ) {
                    filter.push(s2d.cmb.noop(makeSimple(buff)));
                    break;
                }
            }
            else {
                op = "noop";
            }
            filter.push(s2d.cmb[op](makeSimple(buff)));
            buff = [];
        }
        test = makeTest(filter);
        test.qname = qname;
        test.sel = sel;
        if ( subject ) {
            subject.lname = test.qname;
            subject.test = test;
            subject.qname = subject.qname;
            subject.sel = test.sel;
            test = subject;
        }
        if ( ref ) {
            ref.test = test;
            ref.qname = test.qname;
            ref.sel = test.sel;
            test = ref;
        }
        return test;
    };
    var tok = function(cap, qname) {
        if ( qname ) {
            return cap === "*" ? s2d.xpr["*"] : s2d.xpr.type(cap);
        }
        if ( cap[1] ) {
            return cap[1][0] === "." ? s2d.xpr.attr("class", "~=", cap[1].substring(1)) : s2d.xpr.attr("id", "=", cap[1].substring(1));
        }
        if ( cap[2] ) {
            return cap[3] ? s2d.xpr[cap[2]](fixQuote(cap[3])) : s2d.xpr[cap[2]];
        }
        if ( cap[4] ) {
            var i;
            if ( cap[6] ) {
                i = cap[6].length;
                cap[6] = cap[6].replace(/ +i$/, "");
                i = i > cap[6].length;
            }
            return s2d.xpr.attr(cap[4], cap[5] || "-", fixQuote(cap[6]), i);
        }
        throw new Error("Unknown Selector.");
    };
    var makeSimple = function(func) {
        var l = func.length,
                i;
        if ( l < 2 ) {
            return func[0];
        }
        return function(el) {
            if ( !el ) {
                return;
            }
            for ( i = 0; i < l; i++ ) {
                if ( !func[i](el) ) {
                    return;
                }
            }
            return true;
        };
    };
    var makeTest = function(func) {
        if ( func.length < 2 ) {
            return function(el) {
                return !!func[0](el);
            };
        }
        return function(el) {
            var i = func.length;
            while ( i-- ) {
                if ( !(el = func[i](el)) ) {
                    return;
                }
            }
            return true;
        };
    };
    var makeSubject = function() {
        var target;
        function subject(el) {
            var node = el.ownerDocument,
                    scope = node.getElementsByTagName(subject.lname),
                    i = scope.length;
            while ( i-- ) {
                if ( subject.test(scope[i]) && target === el ) {
                    target = null;
                    return true;
                }
            }
            target = null;
        }
        subject.simple = function(el) {
            target = el;
            return true;
        };
        return subject;
    };
    var compileSel = function(sel) {
        var test = compile(sel),
                tests = [test];
        while ( test.sel ) {
            test = compile(test.sel);
            tests.push(test);
        }
        if ( tests.length < 2 ) {
            return test;
        }
        return function(el) {
            var l = tests.length,
                    i = 0;
            for ( ; i < l; i++ ) {
                if ( tests[i](el) ) {
                    return true;
                }
            }
        };
    };
    var find = function(sel, node) {
        var results = [],
                test = compile(sel),
                scope = node.getElementsByTagName(test.qname),
                i = 0,
                el;
        while ( el = scope[i++] ) {
            if ( test(el) ) {
                results.push(el);
            }
        }
        if ( test.sel ) {
            while ( test.sel ) {
                test = compile(test.sel);
                scope = node.getElementsByTagName(test.qname);
                i = 0;
                while ( el = scope[i++] ) {
                    if ( test(el) && !~indexOf.call(results, el) ) {
                        results.push(el);
                    }
                }
            }
            results.sort(sort);
        }
        return results;
    };
    var select = function() {
        var slice = function() {
            try {
                Array.prototype.slice.call(document.getElementsByTagName("s2d   "));
                return Array.prototype.slice;
            }
            catch ( e ) {
                e = null;
                return function() {
                    var a = [],
                            i = 0,
                            l = this.length;
                    for ( ; i < l; i++ ) {
                        a.push(this[i]);
                    }
                    return a;
                };
            }
        }();
        if ( document.querySelectorAll ) {
            return function(sel, node) {
                try {
                    return slice.call(node.querySelectorAll(sel));
                }
                catch ( e ) {
                    return find(sel, node);
                }
            };
        }
        return function(sel, node) {
            try {
                if ( sel[0] === "#" && /^#[\w\-]+$/.test(sel) ) {
                    return [node.getElementById(sel.substring(1))];
                }
                if ( sel[0] === "." && /^\.[\w\-]+$/.test(sel) ) {
                    sel = node.getElementsByClassName(sel.substring(1));
                    return slice.call(sel);
                }
                if ( /^[\w\-]+$/.test(sel) ) {
                    return slice.call(node.getElementsByTagName(sel));
                }
            }
            catch ( e ) {
            }
            return find(sel, node);
        };
    }();
    s2d.matches = function(el, sel) {
        return !!compileSel(sel)(el);
    };
    s2d.compile = compileSel;
    s2d.find = function(selector, context) {
        try {
            selector = select(selector, context || document);
        }
        catch ( e ) {
            selector = [];
        }
        return selector;
    };
    function when(match, obj, arg, context) {
        return obj[match] ? typeof obj[match] === 'function' ? obj[match].apply(context, arg) : obj[match] : obj.def && typeof obj.def === 'function' && obj.def.apply(context, arg) || null;
    }
    var initializing = false,
            superPattern =
            /xyz/.test(function() {
                xyz;
            }) ? /\b_super\b/ : /.*/;
    Object.subClass = function(properties) {
        initializing = true;
        var _super = this.prototype,
                proto = new this();
        initializing = false;
        for ( var name in properties ) {
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
                for ( var i = 0; i < arguments.length; i++ ) {
                    var arg = arguments[i];
                    for ( var item in arg ) {
                        if ( !self[item] ) {
                            self[item] = arg[item];
                        }
                    }
                }
                return self;
            };
            self.Implement = function() {
                for ( var i = 0; i < arguments.length; i++ ) {
                    var arg = arguments[i];
                    for ( var item in arg ) {
                        self[item] = arg[item];
                    }
                }
                return self;
            };
            if ( !initializing && this.constructor ) {
                this.constructor.apply(this, arguments);
            }
        }
        Class.prototype = proto;
        Class.constructor = Class;
        Class.subClass = arguments.callee;
        return Class;
    };
    function Klass(properties) {
        if ( !(this instanceof arguments.callee) ) {
            return new Klass(properties);
        }
        if ( properties.Extends ) {
            for ( var item in properties.Extends.prototype ) {
                if ( !properties[item] ) {
                    properties[item] = properties.Extends.prototype[item];
                }
            }
            properties.parent = properties.Extends.prototype.constructor;
            delete properties.Extends;
        }
        if ( properties.Implements ) {
            for ( var item in properties.Implements.prototype ) {
                properties[item] = properties.Implements.prototype[item];
            }
            delete properties.Implements;
        }
        if ( !properties ) {
            properties = {};
        }
        if ( properties.constructor ) {
            properties.constructor = function() {
            };
        }
        return Object.subClass(properties);
    }
    function Namespace(properties) {
        if ( !(this instanceof arguments.callee) ) {
            return new Namespace(properties);
        }
        properties = properties || {};
        var obj = {};
        for ( var prop in properties ) {
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
    /**
     * The global namespace for the gho library. The gho namespace is nothing more than a simple object, which contains the methods and Classes that can be used to create a high functioning application. 
     * 
     */
    var gho = {};
    /**
     * Extends an object with item from another object, but only if the object doesn't have the given key. This method should only be used when filling hte gaps of an object.
     * @param {object} dest The object to extend, or if extending the gho namepspace the object from which to extend.
     * @param {object} src The object from which to extend. If not provided, then it is assumed that the desired operation is to extend the gho namespace with the 'dest' object.
     * @returns {object} The extended object.
     */
    gho.extend = function(dest, src) {
        if ( !src ) {
            for ( var item in dest ) {
                if ( !gho[item] ) {
                    gho[item] = dest[item];
                }
            }
            return gho;
        } else {
            for ( var item in src ) {
                dest[item] = src[item];
            }
            return dest;
        }
    };
    /**
     * Functions just as teh 'gho.extend' method, but with disregard to existing keys.
     * @param {object} dest The object to extend, or if extending the gho namepspace the object from which to extend.
     * @param {object} src The object from which to extend. If not provided, then it is assumed that the desired operation is to extend the gho namespace with the 'dest' object.
     * @returns {object} The extended object.
     */
    gho.implement = function(dest, src) {
        if ( !src ) {
            for ( var item in dest ) {
                gho[item] = dest[item];
            }
            return gho;
        } else {
            for ( var item in src ) {
                dest[item] = src[item];
            }
            return dest;
        }
    };
    var _nativeCopies = {
        'array': (function() {
            function F(length) {
                if ( arguments.length === 1 && typeof length === "number" ) {
                    this.length = -1 < length && length === length << 1 >> 1 ? length : this.push(length);
                } else if ( arguments.length === 1 && arguments.length) {
                    this.push.apply(this, arguments[0]);
                } else if ( arguments.length ) {
                    this.push.apply(this, arguments);
                }
            }
            function J() {
            }
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
            function F() {
                var self = this;
                gho.when(arguments.length, {
                    0: function() {
                        return self;
                    },
                    1: function(obj) {
                        if ( gho.type(obj) === 'object' ) {
                            for ( var item in obj ) {
                                self.add(item, obj[item])
                            }
                        }
                    },
                    2: function(key, val) {
                        if ( gho.type(key) === 'string' ) {
                            self.add(key, val);
                        } else {
                            for ( var i = 0; i < arguments.length; i++ ) {
                                if ( gho.type(arguments[i]) === 'object' ) {
                                    for ( var item in arguments[i] ) {
                                        self.add(item, arguments[i][item]);
                                    }
                                }
                            }
                        }
                    }, def: function() {
                        for ( var i = 0; i < arguments.length; i++ ) {
                            if ( gho.type(arguments[i]) === 'object' ) {
                                for ( var item in arguments[i] ) {
                                    self.add(item, arguments[i][item]);
                                }
                            }
                        }
                    }
                }, arguments, this);
            }
            function J() {
            }
            ;
            J.prototype = Object.prototype;
            F.prototype = new J;
            F.prototype.constructor = F;
            return F;
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
    /**
     * Get a copy of the native JavaScript objects. Returns a clean copy that can be extended without affecting the native object.
     * @param {*} item The yype to get a copy of, either by string name or type object declaration.
     * @returns {*} The copied object.
     * */
    gho.native = function(item) {
        if ( gho.type(item) === 'string' ) {
            return _nativeCopies[item.toLowerCase()];
        } else {
            return _nativeCopies[gho.type(item)];
        }
    };
    var Query=function(selector,context){
        return new Query.func.constr(selector,context);
    };
    var _DATAREPO={
        
    };
    function ghospando(){
        return 'gho' + (+new Date());
    }
    Query.func=Query.prototype={
        length:0,
        selector:'',
        Query:'1.0.0.0',
        constructor:Query,
        constr:function(selector,context){
            gho.when(gho.type(selector),{
                "string":function(selector,context){
                    return this.merge(s2d.find(selector,context));
                },
                "array":function(selector){
                    this.merge(selector);
                },
                "object":function(){
                    
                },
                def:function(){
                    
                }                
            },arguments,this);
            return this;
        },
        merge:function(){
            var self=this;
            gho.map(arguments,function(item){
                gho.when(gho.type(item),{
                    array:function(it){
                        for(var i=0;i<it.length;i++){
                            this[this.length]=it[i];
                            this.length=this.length+1;
                        }
                    }
                },[item],self);
            });
            return self;
        },
        map:function(fn){
            return Query().merge(gho.map(this,fn));
        },
        each:function(fn){
            this.map(fn);
            return this;
        },
        one:function(fn){
            var items = this.map(fn);
            return items.length > 1 ? items[0] : items;
        },
        array:function(index){
            if(index || this[index]){
                return this[index];
            } else {
                return new gho.Array(this);
            }
        },
        data:function(key,value){
            if(!key){
                return this.one(function(el){
                    return _DATAREPO[el]||{};
                });
            } else {
                if(gho.type(key)==='object'){
                    for(var item in key){
                        this.data(item,key[item]);
                    }
                }
                if(!value){
                    return this.one(function(el){
                        return _DATAREPO[el]&& _DATAREPO[el][key]||{};
                    });
                } else {
                    return this.each(function(el){
                        if(!_DATAREPO[el]){
                            _DATAREPO[el]={};
                        }
                        _DATAREPO[el][key]=value;
                    });                    
                }
                return this;
            }            
        },
        access:function(attr,value){
            if(!attr){
                return this;
            }
            if(gho.type(attr)==='object'){
                for(var item in attr){
                    this.access(item,attr[item]);
                }
            } else {
                var self=this;
                if(gho.type(attr)==='string'){
                    attr=attr.split(' ');
                } else {
                    attr=attr.toString().split(' ');
                } 
                var truItem,cont=true;
                gho.each(attr,function(item){
                    self.each(function(el){
                        if(cont){
                            if(el[item]){
                                truItem=item;
                                cont=false;
                            } else if(el.getAttribute && el.getAttribute(item)){
                                truItem-item;
                                cont=false;
                            }
                        }
                    });
                });
                if(attr.length===1){
                    truItem=attr[0];
                }
                if(value){
                    return this.each(function(el){
                        if(gho.inArray(gho.type(value),'number string boolean'.split(' '))){
                            if(el[truItem]){
                                el[truItem]=value;
                            } else {
                                el.setAttribute && setAttribute(truItem,value);
                            }
                        } else {
                            el[truItem]=value;
                        }
                    });
                } else {
                    return this.one(function(el){
                        return el[truItem] || (el.getAttribute && el.getAttribute(truItem))||null;
                    });
                }
            }
            return this;
        }
    };
    Query.func.constr.prototype=Query.func;
    gho.DOM=Query;
    gho.when = when;
    gho.Class = Klass;
    gho.Namespace = Namespace;
    context[name] = gho;
})(this, 'gho', '1.0.0.0');
gho.extend({
    inArray:function(item,array){
        var is=false;
        gho.each(array,function(it){
           if(item===it) {
               is=true;
           }
        });
        return is;
    },
    map: function(items, callback) {
        var ret = [], i = 0, l = items.length;
        for ( ; i < l; i++ ) {
            ret.push(callback.call(items, items[i], i));
        }
        return ret;
    },
    one: function(items, callback) {
        items = gho.map(items, callback);
        return items.length > 1 ? items[0] : items;
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
        if ( arguments.length === 3 ) {
            return gho.use(obj, method).call(thisItem);
        } else if ( arguments.length > 3 ) {
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
        if ( !obj || !method ) {
            return;
        }
        return obj.prototype[method];
    },
    fill: function(obj, method, func) {
        if ( !obj || !method ) {
            return;
        }
        if ( gho.type(method) === 'object' ) {
            for ( var item in method ) {
                gho.fill(obj, item, method[item]);
            }
            return gho;
        }
        if ( !obj.prototype[method] ) {
            obj.prototype[method] = func;
        }
        return gho;
    },
    fix: function(obj, method, func) {
        if ( !obj || !method ) {
            return;
        }
        if ( gho.type(method) === 'object' ) {
            for ( var item in method ) {
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
    trim: function(str) {
        return str.replace(/^\s+|\s+$/g, '');
    }
});
gho.Array = gho.native('array');
gho.fix(gho.Array, {
    map: function(fn) {
        if ( gho.type(fn) === 'function' ) {
            var ret = new gho.Array();
            for ( var i = 0; i < this.length; i++ ) {
                ret.push(fn.call(this, this[i], i));
            }
            return ret;
        }
        return this;
    },
    filter: function(match) {
        return gho.when(gho.type(match), {
            'function': function(fn) {
                var ret = new gho.Array();
                this.forEach(function(item, i) {
                    if ( fn.call(this, item, i) ) {
                        ret.push(item);
                    }
                });
                return ret;
            },
            'regexp': function(rx) {
                var ret = new gho.Array();
                this.forEach(function(item) {
                    if ( rx.test(item) ) {
                        ret.push(item);
                    }
                });
                return ret;
            },
            def: function(match) {
                var ret = new gho.Array();
                this.forEach(function(item) {
                    if ( item === match ) {
                        ret.push(item);
                    }
                });
                return ret;
            }
        }, arguments, this);
    },
    forEach: function(fn) {
        this.map(fn);
        return this;
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
        for ( var i = 0; i < arguments.length; i++ ) {
            var arg = arguments[i];
            if ( gho.type(arg) === 'array' ) {
                for ( var o = 0; o < arg.length; o++ ) {
                    this.push(arg[o]);
                }
            } else {
                this.push(arg);
            }
        }
        return this;
    },
    contains: function(match) {
        return this.filter(match).length > 0;
    },
    all: function(match) {
        return this.filter(match).length === this.length;
    },
    clean: function() {
        return this.filter(function(i) {
            return i !== undefined && i !== null;
        });
    },
    i: function(index) {
        return this[index];
    },
    add: function() {
        var self = this;
        for ( var i = 0; i < arguments.length; i++ ) {
            var arg = arguments[i];
            if ( gho.type(arg) === 'array' ) {
                for ( var o = 0; o < arg.length; o++ ) {
                    if ( !self.contains(arg[o]) ) {
                        self.push(arg[o]);
                    }
                }
            } else {
                if ( !self.contains(arg) ) {
                    self.push(arg);
                }
            }
        }
        return self;
    },
    singles: function() {
        var ret = new gho.Array();
        this.forEach(function(item) {
            if ( !ret.contains(item) ) {
                ret.push(item);
            }
        });
        return ret;
    },
    name: function(arg) {
        if ( arguments.length ) {
            if ( arguments.length === this.length ) {
                var obj = new gho.Object(),
                        args = arguments;
                this.forEach(function(item, i) {
                    obj[args[i]] = item;
                });
                return obj;
            } else {
                if ( gho.type(arg) === 'array' &&
                        arg.length === this.length ) {
                    var obj = new gho.Object();
                    this.forEach(function(item, i) {
                        obj[arg[i]] = item;
                    });
                    return obj;
                }
            }
        }
        return this;
    },
    plain: function() {
        var ret = [];
        this.forEach(function(item) {
            ret.push(item);
        });
        return ret;
    },
    first: function() {
        return this[0];
    },
    last: function() {
        return this[this.length - 1];
    },
    at: function(match) {
        return gho.when(gho.type(match), {
            'function': function(fn) {
                var fnd = -1;
                this.forEach(function(item, i) {
                    if ( fn.call(this, item, i) && !(fnd > -1) ) {
                        fnd = i;
                    }
                });
                return fnd;
            },
            'regexp': function(rx) {
                var fnd = -1;
                this.forEach(function(item, i) {
                    if ( rx.test(item) && !(fnd > -1) ) {
                        fnd = i;
                    }
                });
                return fnd;
            },
            def: function(match) {
                var fnd = -1;
                this.forEach(function(item, i) {
                    if ( item === match && !(fnd > -1) ) {
                        fnd = i;
                    }
                });
                return fnd;
            }
        }, arguments, this);
    },
    conv: function(obj) {
        return gho.when(gho.type(obj), {
            'array': function(arr) {
                var ret = new gho.Array();
                for ( var i = 0; i < arr.length; i++ ) {
                    ret.push(arr[i]);
                }
                return ret;
            },
            'object': function(obj) {
                var ret = new gho.Array();
                for ( var item in obj ) {
                    ret.push(obj[item]);
                }
                return ret;
            },
            def: function(item) {
                var ret = new gho.Array();
                ret.push(item);
                return ret;
            }
        }, arguments, this);
    },
    rand: function() {
        return this[Math.floor(Math.random() * this.length)];
    },
    collapse: function() {
        var f = function(arr) {
            var is = gho.of(arr, Array);
            if ( is && arr.length > 0 ) {
                var h = arr[0], t = arr.slice(1);
                return f(h).concat(f(t));
            } else {
                return [].concat(arr);
            }
        };
        return new gho.Array(f(this));
    },
    json: function() {
        return gho.JSON.parse(this.literal());
    },
    literal: function() {
        return gho.JSON.stringify(this.plain());
    }
});
gho.JSON = {
    stringify: function(obj) {
        var t = typeof (obj);
        if ( t !== "object" || obj === null ) {
            if ( t === "string" )
                obj = '"' + obj + '"';
            return String(obj);
        } else {
            var n, v, json = [],
                    arr = (obj && obj.constructor === Array);
            for ( n in obj ) {
                if ( obj.hasOwnProperty(n) ) {
                    v = obj[n];
                    t = typeof (v);
                    if ( t === "string" )
                        v = '"' + v + '"';
                    else if ( t === "object" && v !== null )
                        v = JSON.stringify(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    },
    parse: function(str) {
        if ( window.JSON && window.JSON.parse ) {
            return window.JSON.parse(str);
        }
        if ( str === null )
            return str;
        if ( gho.type(str, 'string') ) {
            str = gho.trim(str);
            if ( str ) {
                return (new Function("return " + str));
            }
        }
    }
};
gho.Object = gho.native('object');
gho.fix(gho.Object, {
    map: function(fn) {
        var ret = new gho.Object();
        for ( var i in this ) {
            if ( this.hasOwnProperty(i) ) {
                ret[i] = fn.call(this, this[i], i);
            }
        }
        return ret;
    },
    forEach: function(fn) {
        this.map(fn);
        return this;
    },
    one: function(fn) {
        var a = this.map(fn);
        return a[a.keys()[0]];
    },
    filter: function(match) {
        return gho.when(gho.type(match), {
            'function': function(fn) {
                var ret = new gho.Object();
                this.forEach(function(item, i) {
                    if ( fn.call(this, item, i) ) {
                        ret[i] = item;
                    }
                });
                return ret;
            },
            'regexp': function(rx) {
                var ret = new gho.Object();
                this.forEach(function(item, i) {
                    if ( rx.test(item) ) {
                        ret[i] = item;
                    }
                });
                return ret;
            },
            def: function(match) {
                var ret = new gho.Object();
                this.forEach(function(item, i) {
                    if ( item === match ) {
                        ret[i] = item;
                    }
                });
                return ret;
            }
        }, arguments, this);
    },
    contains: function(match) {
        return this.filter(match).keys().length > 0;
    },
    clear: function() {
        this.forEach(function(item, key) {
            delete this[key];
        });
        return this;
    },
    array: function() {
        return this.values();
    },
    values: function() {
        var ret = new gho.Array();
        this.forEach(function(item) {
            ret.push(item);
        });
        return ret;
    },
    keys: function() {
        var ret = new gho.Array();
        this.forEach(function(item, key) {
            ret.push(key);
        });
        return ret;
    },
    size: function() {
        var i = 0;
        this.forEach(function() {
            i++;
        });
        return i;
    },
    add: function(key, val) {
        if ( gho.type(key) === 'object' ) {
            for ( var item in key ) {
                this[item] = key[item];
            }
        } else {
            this[key] = val;
        }
        return this;
    },
    rand: function() {
        var index = Math.floor(Math.random() * this.size()), i = 0, v;
        this.forEach(function(item) {
            i++;
            if ( i === index ) {
                v = item;
            }
        });
        return v;
    },
    copy: function() {
        var obj = new gho.Object();
        this.forEach(function(val, key) {
            obj[key] = val;
        });
        return obj;
    },
    at: function(match) {
        return gho.when(gho.type(match), {
            'function': function(fn) {
                return this.one(function(item, i) {
                    if ( fn.call(this, item, i) ) {
                        return i;
                    }
                });
            },
            'regexp': function(rx) {
                return this.one(function(item, i) {
                    if ( rx.test(item) ) {
                        return i;
                    }
                });
            },
            def: function(match) {
                return this.one(function(item, i) {
                    if ( item === match ) {
                        return i;
                    }
                });
            }
        }, arguments, this);
    },
    merge: function() {
        for ( var i = 0; i < arguments.length; i++ ) {
            gho.extend(this, arguments[i]);
        }
        return this;
    },
    plain: function() {
        var obj = {};
        this.forEach(function(val, key) {
            obj[key] = val;
        });
        return obj;
    },
    json: function() {
        return gho.JSON.parse(this.literal());
    },
    literal: function() {
        return gho.JSON.stringify(this.plain());
    }
});