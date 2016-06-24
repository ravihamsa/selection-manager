# selection-manager

Single Selection and Multi Selection handler for JavaScript objects, each object is expected to have unique `id` attribute defined
 
#Usage

```javascript


var Selection = require('selection-manager');

var singleSelect = new Selection();
singleSelect.on('change', function(selected, prevSelected){
    console.log(selected);
})
singleSelect.select({id:1, name:'name1'})



var multiSelect = new Selection({multiSelect:true});

multiSelect.on('change', function(selected, prevSelected){
    console.log(selected);
})


multiSelect.select({id:1, name:'name1'})
multiSelect.select({id:2, name:'name2'})


```