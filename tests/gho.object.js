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
   var ga=new gho.Array('map','forEach','filter','contains','clear','array','values','keys','size','add','rand','copy','at','merge','plain','json','literal');
   ga.forEach(function(i){
       assert.ok(g[i],"The gho.Object has the '" + i + "' function");
       assert.ok(a[i],"The native Object has the '" + i + "' function");
   });
});
QUnit.module("gho.Object Methods");
QUnit.test('gho.Object.map', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(true,"g.map(function(item,i){return item; });");
   g.map(function(item,i){assert.ok(true,item); });
});
QUnit.test('gho.Object.forEach', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(true,"g.forEach(function(item,i){return item; });");
   g.forEach(function(item,i){assert.ok(true,item); });
});
QUnit.test('gho.Object.one', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(true,"g.one(function(item,i){return item + 's'; });");
   assert.ok(true,g.one(function(item,i){return item + 's'; }));
});
QUnit.test('gho.Object.filter', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(true,"g.filter('world').forEach(function(item,i){assert.ok(true,item); });");
   g.filter('world').forEach(function(item,i){assert.ok(true,item); });
   assert.ok(true,"g.filter(/\\w{5}/).forEach(function(item,i){assert.ok(true,item); });");
   g.filter(/^[\w]{5}$/).forEach(function(item,i){assert.ok(true,item); });
   assert.ok(true,"g.filter(function(item){return item.split(' ').length>1;}).forEach(function(item,i){assert.ok(true,item); });");
   g.filter(function(item){return item.split(' ').length>1;}).forEach(function(item,i){assert.ok(true,item); });
});
QUnit.test('gho.Object.contains', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(g.contains('world'),"g.contains('world')");
   assert.ok(g.contains(/^[\w]{5}$/),"g.contains(/\\w{5}/)");
   assert.ok(g.contains(function(item){return item.split(' ').length>1;}),"g.contains(function(item){return item.split(' ').length>1;})");
});
QUnit.test('gho.Object.clear', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(!g.clear().keys().length,"!g.clear().keys().length");
});
QUnit.test('gho.Object.array', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(true,'g.array().forEach(function(item,i){assert.ok(true,item + " is now associated with " + i);});');
   g.array().forEach(function(item,i){
      assert.ok(true,item + " is now associated with " + i);
   });
});
QUnit.test('gho.Object.values', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(true,'g.values().forEach(function(item,i){assert.ok(true,item);});');
   g.values().forEach(function(item,i){
      assert.ok(true,item);
   });
});
QUnit.test('gho.Object.keys', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(true,'g.keys().forEach(function(item,i){assert.ok(true,item);});');
   g.keys().forEach(function(item,i){
      assert.ok(true,item);
   });
});
QUnit.test('gho.Object.size', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(g.size(),g.size());
});
QUnit.test('gho.Object.add', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   var a=g.add({"Igni":"carentem"});
   assert.ok(a.size(),'g.add({"Igni":"carentem"}).size()=' + a.size());
});
QUnit.test('gho.Object.rand', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(true,g.rand());
   assert.ok(true,g.rand());
   assert.ok(true,g.rand());
   assert.ok(true,g.rand());
   assert.ok(true,g.rand());
});
QUnit.test('gho.Object.copy', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(true,'var c=g.copy().add("copied","yes");');
   var c=g.copy().add("copied","yes");
   assert.ok(c.copied,"The copy has a 'copied' value");
   assert.ok(!g.copied,"The original does not have a 'copied' value");
});
QUnit.test('gho.Object.merge', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(true,'g.merge({merge:true,copy:false,extended:"basically"}).forEach(function(item,i){return i + "=" + item;});');
   g.merge({merge:true,copy:false,extended:"basically"});
   g.forEach(function(item,i){
      assert.ok(true,i + '=' + item);
   })
});
QUnit.test('gho.Object.at', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(g.at('world'),g.at('world'));
});
QUnit.test('gho.Object.plain', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(!g.plain().merge,'!g.plain().merge');
});
QUnit.test('gho.Object.literal', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(g.literal(),g.literal());
});
QUnit.test('gho.Object.json', function (assert){
   var g=new gho.Object({hello:"world",another:"generic statement",lorem:"ipsum"});
   assert.ok(g.json(),g.json());
});