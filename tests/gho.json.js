/* 
 * The MIT License
 *
 * Copyright 2014 sympol foundation.
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
QUnit.module("gho.JSON and Native JSON Comparison");
QUnit.test('gho.JSON', function (assert){
   var g=gho.JSON,
       a=window.JSON;
   assert.ok(g instanceof a.constructor,"The gho.JSON object and the native JSON object are both objects");
   assert.ok(g !== new Array(1,2,3,4,5),"The gho.JSON class is not the same as the native JSON");
   var ga=new gho.Array('parse','stringify');
   ga.forEach(function(i){
       assert.ok(g[i],"The gho.JSON has the '" + i + "' function");
       assert.ok(a[i],"The native JSON has the '" + i + "' function");
   });
});
QUnit.module("gho.JSON Methods");
QUnit.test('gho.JSON.parse', function (assert){
   var g=gho.JSON;
       assert.ok(g.parse('{"item":"hello"}').item,"g.parse('{\"item\":\"hello\"}').item=" + g.parse('{"item":"hello"}').item);
});
QUnit.test('gho.JSON.stringify', function (assert){
   var g=gho.JSON;
       assert.ok(g.stringify({"item":"hello"}),"g.stringify({\"item\":\"hello\"})=" + g.stringify({"item":"hello"}));
});

