/**
 * Created by ravi.hamsa on 6/23/16.
 */

import EventEmitter from "events";


class Selection extends EventEmitter{
    constructor(config){
        super(...arguments);
        config = config || {};
        this._dataStoreIndex = {};
        this._deselectCallBacks = {};
        this._multiSelect = config.multiSelect || false;
        this._emitter = new EventEmitter();
        this._selected = null;
    }

    validateItem(item){
        if(typeof item !== 'object' || item.id === undefined){
            throw new Error('item must have id be selected')
        }else{
            return true
        }
    }


    triggerChange(){
        let {_dataStoreIndex} =  this;
        let prevSelection = this._selected;
        let curSelection = this.getSelected();
        this.trigger('change', curSelection, prevSelection);
        this._selected = curSelection;
    }

    select(selectedItem){

        let {_multiSelect, _dataStoreIndex} =  this;

        if(this.validateItem(selectedItem) && !this.isSelected(selectedItem)){
            if (_multiSelect) {
                _dataStoreIndex[selectedItem.id] = selectedItem;
            } else {
                _dataStoreIndex = {};
                _dataStoreIndex[selectedItem.id] = selectedItem;
                this._dataStoreIndex = {[selectedItem.id]:selectedItem}
            }

            this.triggerChange();
        }
    }

    deselect(deselectedItem){
        let {_multiSelect, _dataStoreIndex} =  this;
        if(this.validateItem(deselectedItem) && this.isSelected(deselectedItem)){
            delete _dataStoreIndex[deselectedItem.id];
            this.triggerChange();
        }
    }

    toggle(toToggleItem){
        let {_multiSelect, _dataStoreIndex} =  this;
        if(this.validateItem(toToggleItem)){
            if(_dataStoreIndex[toToggleItem.id]){
                this.deselect(toToggleItem)
            }else{
                this.select(toToggleItem)
            }
        }
    }

    clear(){
        this._dataStoreIndex = {};
        this.triggerChange();
    }


    getSelected(){
        let {_multiSelect, _dataStoreIndex} =  this;
        let selected = Object.keys(_dataStoreIndex).map( keyName => _dataStoreIndex[keyName]);
        if(selected.length > 0){
            return _multiSelect ? selected : selected[0];
        }else {
            return _multiSelect ? [] : null;
        }
    }

    setSelected(){
        let {_multiSelect, _dataStoreIndex} =  this;
    }

    isSelected(item){
        return this._dataStoreIndex[item.id] !== undefined;
    }

    trigger (){
        this.emit.apply(this, arguments)
    }
}

export default Selection;