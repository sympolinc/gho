{"filter":false,"title":"gho.js","tooltip":"/src/gho.js","undoManager":{"mark":100,"position":100,"stack":[[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2401,"column":26},"end":{"row":2401,"column":27}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2401,"column":27},"end":{"row":2401,"column":28}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2401,"column":28},"end":{"row":2401,"column":30}},"text":"()"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2401,"column":30},"end":{"row":2401,"column":31}},"text":";"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2404,"column":9},"end":{"row":2404,"column":14}},"text":"Event"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2404,"column":9},"end":{"row":2404,"column":10}},"text":"("}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2404,"column":9},"end":{"row":2404,"column":10}},"text":"("}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2411,"column":3},"end":{"row":2412,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":2412,"column":0},"end":{"row":2412,"column":31}},"text":"\t\tvar E=new gho.EventManager();"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2415,"column":6},"end":{"row":2415,"column":17}},"text":"removeEvent"},{"action":"insertText","range":{"start":{"row":2415,"column":6},"end":{"row":2415,"column":7}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2415,"column":7},"end":{"row":2415,"column":8}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2415,"column":8},"end":{"row":2415,"column":9}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2415,"column":9},"end":{"row":2415,"column":10}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2415,"column":10},"end":{"row":2415,"column":11}},"text":"v"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2415,"column":11},"end":{"row":2415,"column":12}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2419,"column":24},"end":{"row":2420,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":2420,"column":0},"end":{"row":2420,"column":5}},"text":"\t    "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2420,"column":5},"end":{"row":2421,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":2421,"column":0},"end":{"row":2421,"column":31}},"text":"\t\tvar E=new gho.EventManager();"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2423,"column":5},"end":{"row":2423,"column":14}},"text":"fireEvent"},{"action":"insertText","range":{"start":{"row":2423,"column":5},"end":{"row":2423,"column":6}},"text":"f"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2423,"column":6},"end":{"row":2423,"column":7}},"text":"i"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2423,"column":7},"end":{"row":2423,"column":8}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2423,"column":8},"end":{"row":2423,"column":9}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2420,"column":0},"end":{"row":2420,"column":5}},"text":"\t    "},{"action":"removeText","range":{"start":{"row":2419,"column":24},"end":{"row":2420,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2424,"column":2},"end":{"row":2424,"column":3}},"text":","}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2425,"column":3},"end":{"row":2426,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2426,"column":0},"end":{"row":2426,"column":187}},"text":"var events = \"click,dblclick,mousedown,mousemove,mouseover,mouseout,mouseup,keydown,keypress,keyup,abort,error,load,resize,scroll,unload,blur,change,focus,reset,select,submit\".split(',');"},{"action":"insertText","range":{"start":{"row":2426,"column":187},"end":{"row":2427,"column":0}},"text":"\n"},{"action":"insertLines","range":{"start":{"row":2427,"column":0},"end":{"row":2445,"column":0}},"lines":["\t\ttk.each(events, function (e) {","\t\t\tDom.prototype[e] = function (fn) {","\t\t\t\tif (fn && tk.type(fn, 'function')) {","\t\t\t\t\treturn this.each(function (el) {","\t\t\t\t\t\tE.addEvent(el, e, fn);","\t\t\t\t\t});","\t\t\t\t}","\t\t\t\telse if (fn && fn.toString().toLowerCase() === 'off') {","\t\t\t\t\treturn this.each(function (el) {","\t\t\t\t\t\tE.removeEvent(el, e);","\t\t\t\t\t});","\t\t\t\t}","\t\t\t\telse {","\t\t\t\t\treturn this.each(function (el) {","\t\t\t\t\t\tE.fireEvent(el, e);","\t\t\t\t\t});","\t\t\t\t}","\t\t\t}"]},{"action":"insertText","range":{"start":{"row":2445,"column":0},"end":{"row":2445,"column":5}},"text":"\t\t});"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2426,"column":13},"end":{"row":2426,"column":186}},"text":"\"click,dblclick,mousedown,mousemove,mouseover,mouseout,mouseup,keydown,keypress,keyup,abort,error,load,resize,scroll,unload,blur,change,focus,reset,select,submit\".split(',')"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2426,"column":0},"end":{"row":2426,"column":14}},"text":"var events = ;"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2427,"column":0},"end":{"row":2427,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2428,"column":0},"end":{"row":2428,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2429,"column":0},"end":{"row":2429,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2430,"column":0},"end":{"row":2430,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2431,"column":0},"end":{"row":2431,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2432,"column":0},"end":{"row":2432,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2433,"column":0},"end":{"row":2433,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2434,"column":0},"end":{"row":2434,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2435,"column":0},"end":{"row":2435,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2436,"column":0},"end":{"row":2436,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2437,"column":0},"end":{"row":2437,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2438,"column":0},"end":{"row":2438,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2439,"column":0},"end":{"row":2439,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2440,"column":0},"end":{"row":2440,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2441,"column":0},"end":{"row":2441,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2442,"column":0},"end":{"row":2442,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2443,"column":0},"end":{"row":2443,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2444,"column":0},"end":{"row":2444,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2445,"column":0},"end":{"row":2445,"column":1}},"text":"\t"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2427,"column":0},"end":{"row":2427,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2428,"column":0},"end":{"row":2428,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2429,"column":0},"end":{"row":2429,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2430,"column":0},"end":{"row":2430,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2431,"column":0},"end":{"row":2431,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2432,"column":0},"end":{"row":2432,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2433,"column":0},"end":{"row":2433,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2434,"column":0},"end":{"row":2434,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2435,"column":0},"end":{"row":2435,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2436,"column":0},"end":{"row":2436,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2437,"column":0},"end":{"row":2437,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2438,"column":0},"end":{"row":2438,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2439,"column":0},"end":{"row":2439,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2440,"column":0},"end":{"row":2440,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2441,"column":0},"end":{"row":2441,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2442,"column":0},"end":{"row":2442,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2443,"column":0},"end":{"row":2443,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2444,"column":0},"end":{"row":2444,"column":1}},"text":"\t"},{"action":"removeText","range":{"start":{"row":2445,"column":0},"end":{"row":2445,"column":1}},"text":"\t"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2427,"column":0},"end":{"row":2427,"column":2}},"text":"tk"},{"action":"insertText","range":{"start":{"row":2427,"column":0},"end":{"row":2427,"column":1}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2427,"column":1},"end":{"row":2427,"column":2}},"text":"h"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2427,"column":2},"end":{"row":2427,"column":3}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2428,"column":5},"end":{"row":2428,"column":14}},"text":"prototype"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2428,"column":4},"end":{"row":2428,"column":5}},"text":"."}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2428,"column":3},"end":{"row":2428,"column":4}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2428,"column":2},"end":{"row":2428,"column":3}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2428,"column":1},"end":{"row":2428,"column":2}},"text":"D"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2428,"column":1},"end":{"row":2428,"column":2}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2428,"column":2},"end":{"row":2428,"column":3}},"text":"h"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2428,"column":3},"end":{"row":2428,"column":4}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2428,"column":4},"end":{"row":2428,"column":5}},"text":"."}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2428,"column":5},"end":{"row":2428,"column":6}},"text":"D"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2428,"column":6},"end":{"row":2428,"column":7}},"text":"O"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2428,"column":7},"end":{"row":2428,"column":8}},"text":"M"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2428,"column":8},"end":{"row":2428,"column":9}},"text":"."}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2428,"column":9},"end":{"row":2428,"column":10}},"text":"f"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2428,"column":10},"end":{"row":2428,"column":11}},"text":"u"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2428,"column":11},"end":{"row":2428,"column":12}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2428,"column":12},"end":{"row":2428,"column":13}},"text":"c"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2427,"column":9},"end":{"row":2427,"column":15}},"text":"events"},{"action":"insertText","range":{"start":{"row":2427,"column":9},"end":{"row":2427,"column":182}},"text":"\"click,dblclick,mousedown,mousemove,mouseover,mouseout,mouseup,keydown,keypress,keyup,abort,error,load,resize,scroll,unload,blur,change,focus,reset,select,submit\".split(',')"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2429,"column":12},"end":{"row":2429,"column":14}},"text":"tk"},{"action":"insertText","range":{"start":{"row":2429,"column":12},"end":{"row":2429,"column":13}},"text":"g"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2429,"column":13},"end":{"row":2429,"column":14}},"text":"h"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2429,"column":14},"end":{"row":2429,"column":15}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2429,"column":23},"end":{"row":2429,"column":35}},"text":", 'function'"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2429,"column":24},"end":{"row":2429,"column":25}},"text":"="}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2429,"column":25},"end":{"row":2429,"column":26}},"text":"="}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2429,"column":26},"end":{"row":2429,"column":27}},"text":"="}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2429,"column":27},"end":{"row":2429,"column":29}},"text":"''"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2429,"column":28},"end":{"row":2429,"column":29}},"text":"f"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2429,"column":29},"end":{"row":2429,"column":30}},"text":"u"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2429,"column":30},"end":{"row":2429,"column":31}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2429,"column":31},"end":{"row":2429,"column":32}},"text":"c"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2429,"column":32},"end":{"row":2429,"column":33}},"text":"t"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2429,"column":33},"end":{"row":2429,"column":34}},"text":"i"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2429,"column":34},"end":{"row":2429,"column":35}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2429,"column":35},"end":{"row":2429,"column":36}},"text":"n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2429,"column":40},"end":{"row":2430,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":2430,"column":0},"end":{"row":2430,"column":31}},"text":"\t\tvar E=new gho.EventManager();"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2432,"column":6},"end":{"row":2432,"column":14}},"text":"addEvent"},{"action":"insertText","range":{"start":{"row":2432,"column":6},"end":{"row":2432,"column":7}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2432,"column":7},"end":{"row":2432,"column":8}},"text":"d"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2432,"column":8},"end":{"row":2432,"column":9}},"text":"d"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2437,"column":6},"end":{"row":2437,"column":17}},"text":"removeEvent"},{"action":"insertText","range":{"start":{"row":2437,"column":6},"end":{"row":2437,"column":7}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2437,"column":7},"end":{"row":2437,"column":8}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2437,"column":8},"end":{"row":2437,"column":9}},"text":"m"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2437,"column":9},"end":{"row":2437,"column":10}},"text":"o"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2437,"column":10},"end":{"row":2437,"column":11}},"text":"v"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2437,"column":11},"end":{"row":2437,"column":12}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2442,"column":6},"end":{"row":2442,"column":15}},"text":"fireEvent"},{"action":"insertText","range":{"start":{"row":2442,"column":6},"end":{"row":2442,"column":7}},"text":"f"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2442,"column":7},"end":{"row":2442,"column":8}},"text":"i"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2442,"column":8},"end":{"row":2442,"column":9}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2442,"column":9},"end":{"row":2442,"column":10}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":2430,"column":0},"end":{"row":2430,"column":31}},"text":"\t\tvar E=new gho.EventManager();"},{"action":"removeText","range":{"start":{"row":2429,"column":40},"end":{"row":2430,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":2428,"column":34},"end":{"row":2429,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":2429,"column":0},"end":{"row":2429,"column":31}},"text":"\t\tvar E=new gho.EventManager();"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1891,"column":20},"end":{"row":1891,"column":21}},"text":"v"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1891,"column":21},"end":{"row":1891,"column":22}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1891,"column":22},"end":{"row":1891,"column":23}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1891,"column":23},"end":{"row":1891,"column":24}},"text":" "}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":1887,"column":20},"end":{"row":1887,"column":21}},"text":"t"},{"action":"insertText","range":{"start":{"row":1887,"column":20},"end":{"row":1887,"column":21}},"text":"t"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1887,"column":21},"end":{"row":1887,"column":22}},"text":"y"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1887,"column":22},"end":{"row":1887,"column":23}},"text":"p"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1887,"column":23},"end":{"row":1887,"column":24}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1791,"column":34},"end":{"row":1792,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":1792,"column":0},"end":{"row":1792,"column":10}},"text":"          "}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1792,"column":10},"end":{"row":1792,"column":11}},"text":"a"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1792,"column":11},"end":{"row":1792,"column":12}},"text":"l"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1792,"column":12},"end":{"row":1792,"column":13}},"text":"e"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1792,"column":13},"end":{"row":1792,"column":14}},"text":"r"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1792,"column":14},"end":{"row":1792,"column":15}},"text":"t"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1792,"column":15},"end":{"row":1792,"column":17}},"text":"()"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":1792,"column":0},"end":{"row":1792,"column":17}},"text":"          alert()"},{"action":"removeText","range":{"start":{"row":1791,"column":34},"end":{"row":1792,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1790,"column":32},"end":{"row":1791,"column":0}},"text":"\n"},{"action":"insertText","range":{"start":{"row":1791,"column":0},"end":{"row":1791,"column":17}},"text":"          alert()"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":1791,"column":0},"end":{"row":1791,"column":17}},"text":"          alert()"},{"action":"removeText","range":{"start":{"row":1790,"column":32},"end":{"row":1791,"column":0}},"text":"\n"}]}],[{"group":"doc","deltas":[{"action":"removeText","range":{"start":{"row":1878,"column":16},"end":{"row":1878,"column":20}},"text":"type"},{"action":"insertText","range":{"start":{"row":1878,"column":16},"end":{"row":1878,"column":17}},"text":"f"}]}],[{"group":"doc","deltas":[{"action":"insertText","range":{"start":{"row":1878,"column":17},"end":{"row":1878,"column":18}},"text":"n"}]}]]},"ace":{"folds":[{"start":{"row":28,"column":3},"end":{"row":793,"column":0},"placeholder":"..."},{"start":{"row":1743,"column":38},"end":{"row":1778,"column":8},"placeholder":"..."}],"scrolltop":22018,"scrollleft":0,"selection":{"start":{"row":1862,"column":17},"end":{"row":1862,"column":17},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":2413,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1405527628881,"hash":"0ff666c6cb882edd39b89e7f527d19d2f1e1a269"}