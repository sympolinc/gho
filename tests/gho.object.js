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
QUnit.module("gho.Object and Native Object Comparison");
QUnit.test('gho.Object', function (assert){
   var g=new gho.Object(),
       a=new Object();
   assert.ok(g instanceof Object,"The gho.Object class is an instance of the native Object");
   assert.ok(g !== new Object(),"The gho.Object class is not the same as the native Object");
   var ga=new gho.Array('map','filter','forEach','one','copy','merge','contains','all','clean','i','singles','name','plain','first','last','at','conv','rand','collapse');
   ga.forEach(function(i){
       assert.ok(g[i],"The gho.Object has the '" + i + "' function");
       assert.ok(a[i],"The native Object has the '" + i + "' function");
   });
});
QUnit.module("gho.Object Methods");
QUnit.test('gho.Object.map', function (assert){
   var g=new gho.Object();
   assert.ok(true,"g.map(function(item,i){return item; });");
   g.map(function(item,i){assert.ok(true,item); });
});