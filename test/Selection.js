/**
 * Created by ravi.hamsa on 6/24/16.
 */

var chai = require('chai'),  should = chai.should(), expect = chai.expect ,
    Selection = require('../dist/Selection');


var dataItems = [{id:1, name:'name'}, {id:2, name:'two'}, {id:3, name:'three'}];

describe('#singleselect', function() {
    it('selecting multiple times store only latest selection', function(){
        var selection = new Selection();
        selection.select(dataItems[0]);
        selection.select(dataItems[1]);
        selection.getSelected().should.equal(dataItems[1])
    })
})


describe('#multiselect', function() {
    it('selecting multiple times store all selection', function(){
        var selection = new Selection({multiSelect:true});
        selection.select(dataItems[0]);
        selection.select(dataItems[1]);
        expect(selection.getSelected()).to.have.length(2)
    })
})