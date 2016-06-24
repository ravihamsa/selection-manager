/**
 * Created by ravi.hamsa on 6/23/16.
 */

var Selection = require('../dist/Selection');

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
