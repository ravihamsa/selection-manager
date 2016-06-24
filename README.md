# selection-manager

Single Selection and Multi Selection handler for JavaScript objects, each object is expected to have unique "id" attribute defined
 
#Usage

```javascript


var Selection = require('../dist/Selection');

var singleSelect = new Selection();
singleSelect.select({id:1, name:'name1'})
console.log(singleSelect);


var multiSelect = new Selection({multiSelect:true});
multiSelect.select({id:1, name:'name1'})
multiSelect.select({id:2, name:'name2'})
console.log(multiSelect.getSelected());

```