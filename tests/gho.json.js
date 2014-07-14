/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
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

