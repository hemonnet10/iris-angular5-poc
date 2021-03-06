var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
import { ComparableAutoCompleteString, SearchableAutoCompleteString } from '../classes/AutocompleteItem';
import { NgDropdownDirective } from '../dropdown/ng-dropdown.directive';
import { Subject } from 'rxjs';
var CompleterComponent = (function () {
    function CompleterComponent(_zone) {
        this._zone = _zone;
        this.cleared = new EventEmitter();
        this.selected = new EventEmitter();
        this.noResult = new EventEmitter();
        this.group = {};
        this._change = new Subject();
        this._items = {};
        this._completer = '';
        this._highlight = '';
        this._DOM = {
            notFound: false,
            empty: false,
            placeholder: null,
            selected: '',
            isLoading: false
        };
    }
    /**
     *
     */
    CompleterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._zone.runOutsideAngular(function () {
            _this._change
                //.pipe(debounceTime(300))
                .subscribe(function (value) {
                _this._zone.run(function () {
                    if (_this.group.async !== null) {
                        _this.RunAsyncFunction(value);
                    }
                    else {
                        _this.OnModelChange(value);
                    }
                });
            });
        });
        this.SetItems();
    };
    /**
     * Only used when completion is off.
     * @constructor
     */
    CompleterComponent.prototype.RegisterClick = function () {
        if (!this.group.completion) {
            this.SwitchDropdownState();
        }
    };
    /**
     *
     * @constructor
     */
    CompleterComponent.prototype.DropdownArray = function () {
        if (this.group.completion) {
            this.SwitchDropdownState();
        }
    };
    /**
     *
     * @constructor
     */
    CompleterComponent.prototype.SwitchDropdownState = function () {
        if (this.dropdown._open) {
            this.CloseDropdown();
            return;
        }
        /**
         *
         */
        this.OpenDropdown();
    };
    /**
     *
     * @constructor
     */
    CompleterComponent.prototype.CloseDropdown = function () {
        this.dropdown._open = false;
        /**
         *
         * @type {string}
         */
        this._DOM.placeholder = null;
    };
    /**
     *
     * @constructor
     */
    CompleterComponent.prototype.OpenDropdown = function () {
        this.dropdown.Open();
        /**
         *
         * @type {string}
         */
        this._DOM.placeholder = null;
    };
    /**
     *
     * @constructor
     */
    CompleterComponent.prototype.SetItems = function () {
        this._items = this.group.value;
        this.IsInitialEmpty();
    };
    /**
     *
     * @constructor
     */
    CompleterComponent.prototype.SelectItem = function (item) {
        var i;
        if (typeof item === 'string') {
            i = this._items[item];
            this._DOM.selected = item;
        }
        else {
            i = item;
            this._DOM.selected = SearchableAutoCompleteString(item.title, item.id);
        }
        this._completer = i.title;
        this._highlight = '';
        this.dropdown.Close(null, true);
        this.selected.emit({ group: { key: this.group.key }, item: i });
    };
    /**
     *
     * @param {string} value
     * @returns {Promise<void>}
     * @constructor
     */
    CompleterComponent.prototype.RunAsyncFunction = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            var values;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._completer = value;
                        this._highlight = value;
                        this._DOM.selected = null;
                        if (!(value.length === 0)) return [3 /*break*/, 1];
                        this.group.InitialValue();
                        this.ClearModel();
                        this.dropdown.Close('', true);
                        return [3 /*break*/, 3];
                    case 1:
                        if (!(value.length > this.group.searchLength)) return [3 /*break*/, 3];
                        this._DOM.isLoading = true;
                        return [4 /*yield*/, this.group.async(value)];
                    case 2:
                        values = _a.sent();
                        this.group.SetNewValue(values, this.group.keys.titleKey);
                        this._DOM.isLoading = false;
                        this._items = this.group.value;
                        this.EmptySearch(this._items, value);
                        // User has typed something now, results could be shown. We need to remove the "is-initial-empty" class.
                        this.IsInitialEmpty();
                        this.dropdown.Open();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @param value
     * @constructor
     */
    CompleterComponent.prototype.OnModelChange = function (value) {
        this._completer = value;
        this._highlight = value;
        this._DOM.selected = null;
        if (value.length === 0) {
            this.ClearModel();
            this.dropdown.Close('', true);
        }
        else if (value.length > this.group.searchLength) {
            this.CompareItemsAndSet(value);
        }
    };
    /**
     *
     * @constructor
     */
    CompleterComponent.prototype.ClearModel = function () {
        this._DOM.selected = null;
        this._DOM.notFound = false;
        this.cleared.emit(this.group.key);
    };
    /**
     *
     * @constructor
     */
    CompleterComponent.prototype.CompareItemsAndSet = function (value) {
        var obj = {};
        for (var key in this.group.value) {
            if (ComparableAutoCompleteString(key).toLowerCase().indexOf(value.toLowerCase()) > -1) {
                obj[key] = this.group.value[key];
            }
        }
        this._items = obj;
        this.EmptySearch(this._items, value);
        // User has typed something now, results could be shown. We need to remove the "is-initial-empty" class.
        this.IsInitialEmpty();
        this.dropdown.Open();
    };
    /**
     *
     * @constructor
     */
    CompleterComponent.prototype.OnInputBlurred = function () {
        if (!this.HasChosenValue()) {
            /**
             * Let component know completer input has been cleared -
             * this function shows the list again, also resets children, if chosen.
             */
            this.OnModelChange('');
        }
    };
    /**
     *
     * @constructor
     */
    CompleterComponent.prototype.OnHoverDropdownItem = function (item) {
        if (typeof item == 'string') {
            this._DOM.placeholder = this._items[item];
            return;
        }
        if (item == null) {
            this._DOM.placeholder = null;
            return;
        }
        this._DOM.placeholder = item;
    };
    // =======================================================================//
    // ! Utils                                                                //
    // =======================================================================//
    CompleterComponent.prototype.IsInitialEmpty = function () {
        if (Object.keys(this._items).length === 0 && this._completer.length === 0) {
            this._DOM.empty = true;
            return;
        }
        this._DOM.empty = false;
    };
    /**
     *
     * @constructor
     */
    CompleterComponent.prototype.HasChosenValue = function () {
        return this._DOM.selected !== null;
    };
    /**
     *
     * @param {Object} obj
     * @param {string} query
     * @constructor
     */
    CompleterComponent.prototype.EmptySearch = function (obj, query) {
        if (Object.keys(obj).length > 0) {
            this._DOM.notFound = false;
            return;
        }
        this._DOM.notFound = true;
        this.noResult.emit({ group: { key: this.group.key }, query: query });
    };
    /**
     *
     * @constructor
     */
    CompleterComponent.prototype.ClearValue = function () {
        this._completer = '';
        this._DOM.selected = null;
        this.group.InitialValue();
        this.IsInitialEmpty();
        /**
         *
         */
        this.selected.emit({ group: { key: this.group.key }, item: null });
    };
    return CompleterComponent;
}());
export { CompleterComponent };
CompleterComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-completer',
                template: "\n      <div #element class=\"ng-autocomplete-dropdown\" [ngClass]=\"{'open': dropdown._open, 'is-loading': _DOM.isLoading, 'is-async': group.async !== null}\">\n\n        <!--GROUP: {{group.key}}-->\n\n        <div class=\"ng-autocomplete-inputs\" (click)=\"RegisterClick()\"\n             [ngClass]=\"{'completion-off': !group.completion}\">\n                <span class=\"ng-autocomplete-placeholder\"\n                      *ngIf=\"_DOM.placeholder\">\n                  <ng-container *ngIf=\"group.placeholderValue\">\n                      <ng-template *ngTemplateOutlet=\"group.placeholderValue; context: {$implicit: _DOM.placeholder}\"></ng-template>\n                  </ng-container>\n                  <ng-template [ngIf]=\"!group.placeholderValue\">\n                      {{_DOM.placeholder.title}}\n                  </ng-template>\n                </span>\n          <input #input type=\"text\" [placeholder]=\"group.placeholder\" name=\"completer\" [(ngModel)]=\"_completer\"\n                 (ngModelChange)=\"_change.next($event);\"\n                 [value]=\"_completer\"\n                 autocomplete=\"off\"\n                 (click)=\"OpenDropdown()\"\n                 (focus)=\"OpenDropdown()\" class=\"ng-autocomplete-input\">\n\n          <span [ngClass]=\"{'open': dropdown._open}\" class=\"ng-autocomplete-dropdown-icon\"\n                (click)=\"DropdownArray()\"></span>\n        </div>\n\n        <div class=\"ng-dropdown\" ngDropdown [list]=\"_items\" [element]=\"element\" [input]=\"input\"\n             [ngClass]=\"{'is-initial-empty': _DOM.empty}\"\n             [active]=\"_DOM.selected\" [key]=\"group.key\"\n             [completion]=\"group.completion\"\n             (hover)=\"OnHoverDropdownItem($event)\"\n             (selected)=\"SelectItem($event)\"\n             (closed)=\"OnInputBlurred()\"\n        >\n          <div *ngIf=\"_DOM.notFound && group.noResults\" class=\"dropdown-item no-results\">\n            <ng-container *ngIf=\"group.noResults\">\n              <ng-template *ngTemplateOutlet=\"group.noResults; context: {$implicit: _completer}\"></ng-template>\n            </ng-container>\n          </div>\n\n          <div class=\"dropdown-item\" *ngFor=\"let item of _items | keys; let i = index\"\n               (click)=\"SelectItem(_items[item])\">\n\n            <ng-container *ngIf=\"group.dropdownValue\">\n              <ng-template\n                *ngTemplateOutlet=\"group.dropdownValue; context: {$implicit: _items[item], highlight: _items[item].title | highlight:_highlight}\"></ng-template>\n            </ng-container>\n\n            <div *ngIf=\"!group.dropdownValue\" [innerHTML]=\"_items[item].title | highlight:_highlight\"></div>\n          </div>\n        </div>\n      </div>",
                styles: ["\n        .ng-autocomplete-inputs {\n            position: relative;\n        }\n\n        .ng-autocomplete-inputs.completion-off {\n            cursor: pointer;\n        }\n\n        .ng-autocomplete-inputs.completion-off input {\n            pointer-events: none;\n        }\n\n        .ng-autocomplete-placeholder {\n            pointer-events: none;\n        }\n\n        .ng-autocomplete-dropdown-icon {\n\n        }\n\n        .ng-autocomplete-dropdown .ng-dropdown {\n            display: none;\n        }\n\n        .ng-autocomplete-dropdown .ng-dropdown.is-empty {\n          display: none;\n        }\n\n        .ng-autocomplete-dropdown .ng-dropdown.open {\n            display: block;\n        }\n    "]
            },] },
];
/** @nocollapse */
CompleterComponent.ctorParameters = function () { return [
    { type: NgZone, },
]; };
CompleterComponent.propDecorators = {
    'dropdown': [{ type: ViewChild, args: [NgDropdownDirective,] },],
    'cleared': [{ type: Output },],
    'selected': [{ type: Output },],
    'noResult': [{ type: Output, args: ['no-result',] },],
    'group': [{ type: Input },],
};
//# sourceMappingURL=completer.component.js.map