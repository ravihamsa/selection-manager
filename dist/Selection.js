/**
 * Created by ravi.hamsa on 6/23/16.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

var Selection = (function (_EventEmitter) {
    _inherits(Selection, _EventEmitter);

    function Selection(config) {
        _classCallCheck(this, Selection);

        _get(Object.getPrototypeOf(Selection.prototype), 'constructor', this).apply(this, arguments);
        config = config || {};
        this._dataStoreIndex = {};
        this._deselectCallBacks = {};
        this._multiSelect = config.multiSelect || false;
        this._emitter = new _events2['default']();
        this._selected = null;
    }

    _createClass(Selection, [{
        key: 'validateItem',
        value: function validateItem(item) {
            if (typeof item !== 'object' || item.id === undefined) {
                throw new Error('item must have id be selected');
            } else {
                return true;
            }
        }
    }, {
        key: 'triggerChange',
        value: function triggerChange() {
            var _dataStoreIndex = this._dataStoreIndex;

            var prevSelection = this._selected;
            var curSelection = this.getSelected();
            this.trigger('change', curSelection, prevSelection);
            this._selected = curSelection;
        }
    }, {
        key: 'select',
        value: function select(selectedItem) {
            var _multiSelect = this._multiSelect;
            var _dataStoreIndex = this._dataStoreIndex;

            if (this.validateItem(selectedItem) && !this.isSelected(selectedItem)) {
                if (_multiSelect) {
                    _dataStoreIndex[selectedItem.id] = selectedItem;
                } else {
                    _dataStoreIndex = {};
                    _dataStoreIndex[selectedItem.id] = selectedItem;
                    this._dataStoreIndex = _defineProperty({}, selectedItem.id, selectedItem);
                }

                this.triggerChange();
            }
        }
    }, {
        key: 'deselect',
        value: function deselect(deselectedItem) {
            var _multiSelect = this._multiSelect;
            var _dataStoreIndex = this._dataStoreIndex;

            if (this.validateItem(deselectedItem) && this.isSelected(deselectedItem)) {
                delete _dataStoreIndex[deselectedItem.id];
                this.triggerChange();
            }
        }
    }, {
        key: 'toggle',
        value: function toggle(toToggleItem) {
            var _multiSelect = this._multiSelect;
            var _dataStoreIndex = this._dataStoreIndex;

            if (this.validateItem(toToggleItem)) {
                if (_dataStoreIndex[toToggleItem.id]) {
                    this.deselect(toToggleItem);
                } else {
                    this.select(toToggleItem);
                }
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            this._dataStoreIndex = {};
            this.triggerChange();
        }
    }, {
        key: 'getSelected',
        value: function getSelected() {
            var _multiSelect = this._multiSelect;
            var _dataStoreIndex = this._dataStoreIndex;

            var selected = Object.keys(_dataStoreIndex).map(function (keyName) {
                return _dataStoreIndex[keyName];
            });
            if (selected.length > 0) {
                return _multiSelect ? selected : selected[0];
            } else {
                return _multiSelect ? [] : null;
            }
        }
    }, {
        key: 'setSelected',
        value: function setSelected() {
            var _multiSelect = this._multiSelect;
            var _dataStoreIndex = this._dataStoreIndex;
        }
    }, {
        key: 'isSelected',
        value: function isSelected(item) {
            return this._dataStoreIndex[item.id] !== undefined;
        }
    }, {
        key: 'trigger',
        value: function trigger() {
            this.emit.apply(this, arguments);
        }
    }]);

    return Selection;
})(_events2['default']);

exports['default'] = Selection;
module.exports = exports['default'];