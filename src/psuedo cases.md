#Psuedo Cases for 'gho.when' Method
A psuedo case is a conditional case for the ```gho.when``` method. They allow for applying condition statements against an item. An example.

```
    "~:gt(5)":function(item,val){
        //  item is the test value
        //  val is compare value, 5 in this case.
        return item>val;
    },
    "~:gte(5)":function(item,val){
        //  item is the test value
        //  val is compare value, 5 in this case.
        return item>=val;
    },
    "~:num":function(item){
        return gho.type(item)==='number';
    },
    "~:nan":function(item){
        return gho.type(item)!=='number';
    }
    
    
```

a use in the ```gho.when``` method would be like so...

```
    //  example of notifying when a person's age determines access to a site.
    //  in this case only ages 13-17 are allowed
    var a=15;
    gho.when(a,{
        "~:gte(13)&&~:lte(17)":function(){
            alert("You are allowed on our site");
        },
        "~:gte(~:plus(16))":function(){
            alert("You seem to be a parent, redirecting to the parent portal...");
        },
        def:function(){
            alert("You are not allowed on our site");
        }
    });
```