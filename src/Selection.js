/**
 * Created by ravi.hamsa on 6/23/16.
 */

import EventEmitter from "events";

export default class Selection extends EventEmitter{
    constructor(config){
        super(...arguments);
        config = config || {};
        this._dataStoreIndex = {};
        this._deselectCallBacks = {};
        this._multiSelect = config.multiSelect || false;
        this._idAttribute = config.idAttribute || 'id';
        this._selected = null;
    }

    validateItem(item){
        const {_idAttribute} = this;
        if(typeof item !== 'object' || item[_idAttribute] === undefined){
            throw new Error(`item must have ${_idAttribute} be selected`)
        }else{
            return true
        }
    }


    triggerChange(){
        let {_dataStoreIndex} =  this;
        let prevSelection = this._selected;
        let curSelection = this.getSelected();
        if(curSelection !== prevSelection){
            this.trigger('change', curSelection, prevSelection);
            this._selected = curSelection;
        }
    }

    select(selectedItem){

        let {_multiSelect, _dataStoreIndex, _idAttribute} =  this;

        if(this.validateItem(selectedItem) && !this.isSelected(selectedItem)){
            if (_multiSelect) {
                _dataStoreIndex[selectedItem[_idAttribute]] = selectedItem;
            } else {
                _dataStoreIndex = {};
                _dataStoreIndex[selectedItem[_idAttribute]] = selectedItem;
                this._dataStoreIndex = {[selectedItem[_idAttribute]]:selectedItem}
            }

            this.triggerChange();
        }
    }

    deselect(deselectedItem){
        let {_dataStoreIndex, _idAttribute} =  this;
        if(this.validateItem(deselectedItem) && this.isSelected(deselectedItem)){
            delete _dataStoreIndex[deselectedItem[_idAttribute]];
            this.triggerChange();
        }
    }

    toggle(toToggleItem){
        let {_dataStoreIndex, _idAttribute} =  this;
        if(this.validateItem(toToggleItem)){
            if(_dataStoreIndex[toToggleItem[_idAttribute]]){
                this.deselect(toToggleItem)
            }else{
                this.select(toToggleItem)
            }
        }
    }

    clear(){
        if(!this.isEmpty()){
            this._dataStoreIndex = {};
            this.triggerChange();
        }
    }

    isEmpty(){
        return Object.keys(this._dataStoreIndex).length === 0;
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

    isSelected(item){
        const {_idAttribute} = this;
        return this._dataStoreIndex[item[_idAttribute]] !== undefined;
    }

    isMultiSelect(){
        return this._multiSelect;
    }

    on(event, callback){
        super.on(event, callback);
        return ()=>{
            super.removeListener(event, callback);
        }
    }

    trigger (){
        this.emit.apply(this, arguments)
    }
}

