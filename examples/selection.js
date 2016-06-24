/**
 * Created by ravi.hamsa on 6/23/16.
 */

var Selection = require('../dist/Selection');

var singleSelect = new Selection();
singleSelect.select({id:1, name:'name1'})
console.log(singleSelect);


var multiSelect = new Selection({multiSelect:true});
multiSelect.select({id:1, name:'name1'})
multiSelect.select({id:2, name:'name2'})
console.log(multiSelect.getSelected());