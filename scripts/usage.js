/**
 * Created by ravi.hamsa on 6/23/16.
 */

var Selection = require('../dist/Selection');

var tmp = new Selection();
tmp.select({id:1, name:'name1'})
console.log(tmp);


var tmp2 = new Selection({multiSelect:true});
tmp2.select({id:1, name:'name1'})
tmp2.select({id:2, name:'name2'})
console.log(tmp2.getSelected());