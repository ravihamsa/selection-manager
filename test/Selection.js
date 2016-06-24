/**
 * Created by ravi.hamsa on 6/24/16.
 */

var chai = require('chai'),  should = chai.should(), expect = chai.expect ,
    Selection = require('../dist/Selection');


var dataItems = [{id:1, name:'name'}, {id:2, name:'two'}, {id:3, name:'three'}];

describe('#singleselect', function() {

    it('selecting returns object', function(){
        var selection = new Selection();
        selection.select(dataItems[0]);
        expect(selection.getSelected()).to.be.a('object')
    })

    it('selecting returns null when none selected', function(){
        var selection = new Selection();
        expect(selection.getSelected()).to.equal(null)
    })

    it('selecting returns null after clear', function(){
        var selection = new Selection();
        selection.select(dataItems[0]);
        selection.clear();
        expect(selection.getSelected()).to.equal(null)
    })


    it('selecting multiple times store only latest selection', function(){
        var selection = new Selection();
        selection.select(dataItems[0]);
        selection.select(dataItems[1]);
        selection.getSelected().should.equal(dataItems[1])
    })
})


describe('#multiselect', function() {


    it('selecting returns object', function(){
        var selection = new Selection({multiSelect:true});
        selection.select(dataItems[0]);
        expect(selection.getSelected()).to.be.a('array')
    })


    it('selecting returns empty array when none selected', function(){
        var selection = new Selection({multiSelect:true});
        expect(selection.getSelected()).to.have.length(0);
    })

    it('selecting returns empty array after clear', function(){
        var selection = new Selection({multiSelect:true});
        selection.select(dataItems[0]);
        selection.clear();
        expect(selection.getSelected()).to.have.length(0);
    })

    it('selecting multiple times store all selection', function(){
        var selection = new Selection({multiSelect:true});
        selection.select(dataItems[0]);
        selection.select(dataItems[1]);
        expect(selection.getSelected()).to.have.length(2)
    })
})