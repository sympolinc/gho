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
QUnit.module("gho.Array and Native Array Comparison");
QUnit.test('gho.Array', function (assert){
   var g=new gho.Array(1,2,3,4,5),
       a=new Array(1,2,3,4,5);
   assert.ok(g instanceof Array,"The gho.Array class is an instance of the native array");
   assert.ok(g !== new Array(1,2,3,4,5),"The gho.Array class is not the same as the native array");
   
   assert.equal(g.length,a.length,"Their lengths are the same.");
   assert.equal(g[2],a[2],"They display indexes the same.");
   var ga=new gho.Array('map','filter','forEach','one','copy','merge','contains','all','clean','i','singles','name','plain','first','last','at','conv','rand','collapse');
   ga.forEach(function(i){
       assert.ok(g[i],"The gho.Array has the '" + i + "' function");
       assert.ok(a[i],"The native Array has the '" + i + "' function");
   });
});
QUnit.module("gho.Array Methods");
QUnit.test('gho.Array.map', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(true,"g.map(function(item,i){return item; });");
   g.map(function(item,i){assert.ok(true,item); });
});
QUnit.test('gho.Array.filter', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(true,"g.filter(function(item){return item.charAt(0)==='W' });");
   g.filter(function(item){return item.charAt(0)==='W';}).map(function(item,i){assert.ok(true,(i+1) + '. ' + item);});
   assert.ok(true,"g.filter('Wombat');");
   g.filter('Wombat').map(function(item,i){assert.ok(true,item);});
   assert.ok(true,"g.filter(/roo/gi);");
   g.filter(/roo/gi).map(function(item,i){assert.ok(true,item);});
});
QUnit.test('gho.Array.forEach', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(true,"g.forEach(function(item,i){return item; });");
   g.forEach(function(item,i){assert.ok(true,item); });
});
QUnit.test('gho.Array.one', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(true,"g.one(function(item,i){return item; })");
   assert.ok(true,g.one(function(item,i){assert.ok(true,item);}));
});
QUnit.test('gho.Array.copy', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(true,"(g.copy().length===g.length && g.copy()!==g)");
   assert.ok((g.copy().length===g.length && g.copy()!==g),(g.copy().length===g.length && g.copy()!==g));
});
QUnit.test('gho.Array.merge', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(true,"g.merge(['Pottoroos','Monjon','Pademelon']).map(function(item,i){return item; });");
   g.merge(['Pottoroos','Monjon','Pademelon']).map(function(item,i){assert.ok(true,item); });
});
QUnit.test('gho.Array.contains', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(true,"g.contains(function(item){return gho.type(item)==='string';});");
   assert.ok(g.contains(function(item){return gho.type(item)==='string';}),g.contains(function(item){return gho.type(item)==='string';}));
   assert.ok(true,"g.contains('Kangaroo');");
   assert.ok(g.contains('Kangaroo'),g.contains('Kangaroo'));
   assert.ok(true,"g.contains(/roo/gi);");
   assert.ok(g.contains(/roo/gi),g.contains(/roo/gi));
});
QUnit.test('gho.Array.all', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(true,"g.all(function(item){return gho.type(item)==='string';});");
   assert.ok(g.all(function(item){return gho.type(item)==='string';}),g.all(function(item){return gho.type(item)==='string';}));
   assert.ok(true,"!g.all('Kangaroo');");
   assert.ok(!g.all('Kangaroo'),!g.all('Kangaroo'));
   assert.ok(true,"g.all(/([\w]{5,})/);");
   assert.ok(g.all(/([\w]{5,})/),g.all(/([\w]{5,})/));
});
QUnit.test('gho.Array.clean', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(true,"g.merge([undefined,null]).clean().forEach(function(item){return item; });");
   g.merge([undefined,null]).clean().forEach(function(item){assert.ok(true,item);});
});
QUnit.test('gho.Array.i', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(true,"g.i(5)==='Bilbies';");
   assert.ok(g.i(5)==='Bilbies',g.i(5)==='Bilbies');
});
QUnit.test('gho.Array.add', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(true,"g.add(['Pottoroos','Quokka','Monjon'],'Pademelon').forEach(function(item){return item;});");
   g.add(['Pottoroos','Quokka','Monjon'],'Pademelon').forEach(function(item){assert.ok(true,item);});
});
QUnit.test('gho.Array.singles', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(true,"g.merge(['Pottoroos','Quokka','Monjon'],'Pademelon').singles().forEach(function(item){return item;});");
   g.merge(['Pottoroos','Quokka','Monjon'],'Pademelon').singles().forEach(function(item){assert.ok(true,item);});
});
QUnit.test('gho.Array.name', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(true,"g.name(['Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo'])['Kangaroo'];");
   assert.ok(g.name(['Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo'])["Kangaroo"],g.name(['Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo'])["Kangaroo"]);
});
QUnit.test('gho.Array.plain', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(!g.plain().name,"!g.plain().name");
});
QUnit.test('gho.Array.first', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(g.first()==='Kangaroo',"g.first()==='Kangaroo'");
});
QUnit.test('gho.Array.last', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(g.last()==='Wallaroo',"g.last()==='Wallaroo'");
});
QUnit.test('gho.Array.at', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(g.at('Koala')===1,"g.at('Koala')===1");
   assert.ok(g.at(/num/i)===3,"g.at(/([num])/i)===3");
   assert.ok(g.at(function(item){return item.length>6;})===0,"g.at(function(item){return item.length>6;})===0");
});
QUnit.test('gho.Array.conv', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(g.conv('Koala')[0]==='Koala',"g.conv('Koala')[0]==='Koala'");
   assert.ok(g.conv({P:'Pottoroos',M:'Monjon'})[1]==='Monjon',"g.conv({P:'Pottoroos',M:'Monjon'})[1]==='Monjon'");
   assert.ok(g.conv(function(){return 'Hello';})[0]()==='Hello',"g.conv(function(){return 'Hello';})[0]()==='Hello'");
});
QUnit.test('gho.Array.rand', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
   assert.ok(g.rand(),g.rand());
   assert.ok(g.rand(),g.rand());
   assert.ok(g.rand(),g.rand());
});
QUnit.test('gho.Array.collapse', function (assert){
   assert.ok(true,"var g=new gho.Array(['Kangaroo','Koala','Wombat'],['Numbat','Bandacoot','Bilbies','Wallabies',['Quokka','Wallaroo']]);");
   var g=new gho.Array(['Kangaroo','Koala','Wombat'],['Numbat','Bandacoot','Bilbies','Wallabies',['Quokka','Wallaroo']]);
   assert.ok(true,"g.collapse().map(function(item){return item; });");
   g.collapse().map(function(item){assert.ok(true,item); });
});
QUnit.test('gho.Array.json', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
    assert.ok(g.json(),"g.json()=" + g.json());
});
QUnit.test('gho.Array.literal', function (assert){
   var g=new gho.Array('Kangaroo','Koala','Wombat','Numbat','Bandacoot','Bilbies','Wallabies','Quokka','Wallaroo');
    assert.ok(g.literal(),"g.literal()=" + g.literal());
});


