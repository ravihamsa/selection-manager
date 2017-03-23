'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by ravi.hamsa on 6/23/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Selection = function (_EventEmitter) {
    _inherits(Selection, _EventEmitter);

    function Selection(config) {
        _classCallCheck(this, Selection);

        var _this = _possibleConstructorReturn(this, (Selection.__proto__ || Object.getPrototypeOf(Selection)).apply(this, arguments));

        config = config || {};
        _this._dataStoreIndex = {};
        _this._deselectCallBacks = {};
        _this._multiSelect = config.multiSelect || false;
        _this._selected = null;
        return _this;
    }

    _createClass(Selection, [{
        key: 'validateItem',
        value: function validateItem(item) {
            if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) !== 'object' || item.id === undefined) {
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
            if (curSelection !== prevSelection) {
                this.trigger('change', curSelection, prevSelection);
                this._selected = curSelection;
            }
        }
    }, {
        key: 'select',
        value: function select(selectedItem) {
            var _multiSelect = this._multiSelect,
                _dataStoreIndex = this._dataStoreIndex;


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
            var _multiSelect = this._multiSelect,
                _dataStoreIndex = this._dataStoreIndex;

            if (this.validateItem(deselectedItem) && this.isSelected(deselectedItem)) {
                delete _dataStoreIndex[deselectedItem.id];
                this.triggerChange();
            }
        }
    }, {
        key: 'toggle',
        value: function toggle(toToggleItem) {
            var _multiSelect = this._multiSelect,
                _dataStoreIndex = this._dataStoreIndex;

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
            if (!this.isEmpty()) {
                this._dataStoreIndex = {};
                this.triggerChange();
            }
        }
    }, {
        key: 'isEmpty',
        value: function isEmpty() {
            return Object.keys(this._dataStoreIndex).length === 0;
        }
    }, {
        key: 'getSelected',
        value: function getSelected() {
            var _multiSelect = this._multiSelect,
                _dataStoreIndex = this._dataStoreIndex;

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
        key: 'isSelected',
        value: function isSelected(item) {
            return this._dataStoreIndex[item.id] !== undefined;
        }
    }, {
        key: 'isMultiSelect',
        value: function isMultiSelect() {
            return this._multiSelect;
        }
    }, {
        key: 'on',
        value: function on(event, callback) {
            var _this2 = this;

            _get(Selection.prototype.__proto__ || Object.getPrototypeOf(Selection.prototype), 'on', this).call(this, event, callback);
            return function () {
                _get(Selection.prototype.__proto__ || Object.getPrototypeOf(Selection.prototype), 'removeListener', _this2).call(_this2, event, callback);
            };
        }
    }, {
        key: 'trigger',
        value: function trigger() {
            this.emit.apply(this, arguments);
        }
    }]);

    return Selection;
}(_events2.default);

exports.default = Selection;