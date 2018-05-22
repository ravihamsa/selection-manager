/**
 * Created by ravi.hamsa on 6/24/16.
 */

var chai = require('chai'),  should = chai.should(), expect = chai.expect , sinon = require('sinon'),
Selection = require('../dist/Selection').default;


var dataItems = [{id:1, name:'name'}, {id:2, name:'two'}, {id:3, name:'three'}];
var dataItemsNonId = [{_id:1, name:'name'}, {_id:2, name:'two'}, {_id:3, name:'three'}];
var getSingleSelection = function(){
    return new Selection();
}

var getSingleSelectionNoIdAttribute = function(){
	return new Selection({idAttribute:'_id'});
}


var getMultiSelection= function(){
    return new Selection({multiSelect:true})
}

describe('#singleselect', function() {

    it('isEmpty return true initially', function(){
        var selection = getSingleSelection();
        expect(selection.isEmpty()).to.equal(true)
    })

    it('isEmpty return true after clear', function(){
        var selection =  getSingleSelection();
        selection.select(dataItems[0]);
        selection.clear();
        expect(selection.isEmpty()).to.equal(true)
    })

    it('isEmpty return false after selection', function(){
        var selection = getSingleSelection();
        selection.select(dataItems[0]);
        expect(selection.isEmpty()).to.equal(false)
    })

    it('selecting returns object', function(){
        var selection =  getSingleSelection();
        selection.select(dataItems[0]);
        expect(selection.getSelected()).to.be.a('object')
    })

    it('selecting returns null when none selected', function(){
        var selection =  getSingleSelection();
        expect(selection.getSelected()).to.equal(null)
    })

    it('selecting returns null after clear', function(){
        var selection =  getSingleSelection();
        selection.select(dataItems[0]);
        selection.clear();
        expect(selection.getSelected()).to.equal(null)
    })


    it('selecting multiple times store only latest selection', function(){
        var selection =  getSingleSelection();
        selection.select(dataItems[0]);
        selection.select(dataItems[1]);
        selection.getSelected().should.equal(dataItems[1])
    })

    it('return whether selection is multiSelect', function(){
        var selection =  getSingleSelection();
        expect(selection.isMultiSelect()).to.be.false;
    })

    it("should emit `change` event", function(done){
        var selection =  getSingleSelection();
        var eventStub = sinon.stub(selection, 'emit')
        selection.select(dataItems[0]);
        eventStub.calledWith("change").should.eql(true);
        eventStub.restore();
        done();
    })

    it("should not emit `change` event for repeated selection", function(done){
        var selection = getSingleSelection();
        var sinonSpy = sinon.spy();
        selection.on('change', sinonSpy);
        selection.select(dataItems[0]);
        selection.select(dataItems[0]);
        sinonSpy.calledOnce.should.eql(true);
        done();
    })

    it("should not emit `change` event for repeated clear", function(done){
        var selection = getSingleSelection();
        var sinonSpy = sinon.spy();
        selection.on('change', sinonSpy);
        selection.select(dataItems[0]);
        selection.clear();
        selection.clear();
        sinonSpy.calledTwice.should.eql(true);
        done();
    })
})


describe('#multiselect', function() {

    it('isEmpty return true initially', function(){
        var selection = getMultiSelection();
        expect(selection.isEmpty()).to.equal(true)
    })

    it('isEmpty return true after clear', function(){
        var selection = getMultiSelection();
        selection.select(dataItems[0]);
        selection.clear();
        expect(selection.isEmpty()).to.equal(true)
    })

    it('isEmpty return false after selection', function(){
        var selection = getMultiSelection();
        selection.select(dataItems[0]);
        expect(selection.isEmpty()).to.equal(false)
    })

    it('selecting returns array', function(){
        var selection = getMultiSelection();
        selection.select(dataItems[0]);
        expect(selection.getSelected()).to.be.a('array')
    })


    it('selecting returns empty array when none selected', function(){
        var selection = getMultiSelection();
        expect(selection.getSelected()).to.have.length(0);
    })

    it('selecting returns empty array after clear', function(){
        var selection = getMultiSelection();
        selection.select(dataItems[0]);
        selection.clear();
        expect(selection.getSelected()).to.have.length(0);
    })

    it('selecting multiple times store all selection', function(){
        var selection = getMultiSelection();
        selection.select(dataItems[0]);
        selection.select(dataItems[1]);
        expect(selection.getSelected()).to.have.length(2)
    })

    it('return whether selection is multiSelect', function(){
        var selection = getMultiSelection();
        expect(selection.isMultiSelect()).to.be.true
    })

    it("should emit `change` event", function(done){
        var selection =  getMultiSelection();
        var eventStub = sinon.stub(selection, 'emit')
        selection.select(dataItems[0]);
        eventStub.calledWith("change").should.eql(true);
        eventStub.restore();
        done();
    })

    it("should not emit `change` event for repeated selection", function(done){
        var selection = getMultiSelection();
        var sinonSpy = sinon.spy();
        selection.on('change', sinonSpy);
        selection.select(dataItems[0]);
        selection.select(dataItems[0]);
        sinonSpy.calledOnce.should.eql(true);
        done();
    })

    it("should not emit `change` event for repeated clear", function(done){
        var selection = getMultiSelection();
        var sinonSpy = sinon.spy();
        selection.on('change', sinonSpy);
        selection.select(dataItems[0]);
        selection.clear();
        selection.clear();
        sinonSpy.calledTwice.should.eql(true);
        done();
    })
})


describe('#singleselectNonId', function() {

	it('isEmpty return true initially', function(){
		var selection = getSingleSelectionNoIdAttribute();
		expect(selection.isEmpty()).to.equal(true)
	})

	it('isEmpty return true after clear', function(){
		var selection =  getSingleSelectionNoIdAttribute();
		selection.select(dataItemsNonId[0]);
		selection.clear();
		expect(selection.isEmpty()).to.equal(true)
	})

	it('isEmpty return false after selection', function(){
		var selection = getSingleSelectionNoIdAttribute();
		selection.select(dataItemsNonId[0]);
		expect(selection.isEmpty()).to.equal(false)
	})

	it('selecting returns object', function(){
		var selection =  getSingleSelectionNoIdAttribute();
		selection.select(dataItemsNonId[0]);
		expect(selection.getSelected()).to.be.a('object')
	})

	it('selecting returns null when none selected', function(){
		var selection =  getSingleSelectionNoIdAttribute();
		expect(selection.getSelected()).to.equal(null)
	})

	it('selecting returns null after clear', function(){
		var selection =  getSingleSelectionNoIdAttribute();
		selection.select(dataItemsNonId[0]);
		selection.clear();
		expect(selection.getSelected()).to.equal(null)
	})


	it('selecting multiple times store only latest selection', function(){
		var selection =  getSingleSelectionNoIdAttribute();
		selection.select(dataItemsNonId[0]);
		selection.select(dataItemsNonId[1]);
		selection.getSelected().should.equal(dataItemsNonId[1])
	})

	it('return whether selection is multiSelect', function(){
		var selection =  getSingleSelectionNoIdAttribute();
		expect(selection.isMultiSelect()).to.be.false;
	})

	it("should emit `change` event", function(done){
		var selection =  getSingleSelectionNoIdAttribute();
		var eventStub = sinon.stub(selection, 'emit')
		selection.select(dataItemsNonId[0]);
		eventStub.calledWith("change").should.eql(true);
		eventStub.restore();
		done();
	})

	it("should not emit `change` event for repeated selection", function(done){
		var selection = getSingleSelectionNoIdAttribute();
		var sinonSpy = sinon.spy();
		selection.on('change', sinonSpy);
		selection.select(dataItemsNonId[0]);
		selection.select(dataItemsNonId[0]);
		sinonSpy.calledOnce.should.eql(true);
		done();
	})

	it("should not emit `change` event for repeated clear", function(done){
		var selection = getSingleSelectionNoIdAttribute();
		var sinonSpy = sinon.spy();
		selection.on('change', sinonSpy);
		selection.select(dataItemsNonId[0]);
		selection.clear();
		selection.clear();
		sinonSpy.calledTwice.should.eql(true);
		done();
	})
})
