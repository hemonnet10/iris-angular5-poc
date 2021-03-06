import { EventEmitter, NgZone, OnInit } from '@angular/core';
import { AutocompleteGroup } from '../classes/AutocompleteGroup';
import { AutocompleteItem, StrippedAutocompleteGroup } from '../classes/AutocompleteItem';
import { NgDropdownDirective } from '../dropdown/ng-dropdown.directive';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import { GroupNoResult } from '../utils/utils';
export declare class CompleterComponent implements OnInit {
    private _zone;
    dropdown: NgDropdownDirective;
    cleared: EventEmitter<string>;
    selected: EventEmitter<StrippedAutocompleteGroup>;
    noResult: EventEmitter<GroupNoResult>;
    group: AutocompleteGroup;
    _change: Subject<string>;
    _items: {
        [value: string]: AutocompleteItem;
    };
    _completer: string;
    _highlight: string;
    _DOM: {
        notFound: boolean;
        empty: boolean;
        placeholder: AutocompleteItem;
        selected: string;
        isLoading: boolean;
    };
    constructor(_zone: NgZone);
    /**
     *
     */
    ngOnInit(): void;
    /**
     * Only used when completion is off.
     * @constructor
     */
    RegisterClick(): void;
    /**
     *
     * @constructor
     */
    DropdownArray(): void;
    /**
     *
     * @constructor
     */
    SwitchDropdownState(): void;
    /**
     *
     * @constructor
     */
    CloseDropdown(): void;
    /**
     *
     * @constructor
     */
    OpenDropdown(): void;
    /**
     *
     * @constructor
     */
    SetItems(): void;
    /**
     *
     * @constructor
     */
    SelectItem(item: AutocompleteItem | string): void;
    /**
     *
     * @param {string} value
     * @returns {Promise<void>}
     * @constructor
     */
    RunAsyncFunction(value: string): Promise<void>;
    /**
     *
     * @param value
     * @constructor
     */
    OnModelChange(value: string): void;
    /**
     *
     * @constructor
     */
    ClearModel(): void;
    /**
     *
     * @constructor
     */
    CompareItemsAndSet(value: string): void;
    /**
     *
     * @constructor
     */
    OnInputBlurred(): void;
    /**
     *
     * @constructor
     */
    OnHoverDropdownItem(item: AutocompleteItem | string): void;
    IsInitialEmpty(): void;
    /**
     *
     * @constructor
     */
    HasChosenValue(): boolean;
    /**
     *
     * @param {Object} obj
     * @param {string} query
     * @constructor
     */
    EmptySearch(obj: Object, query: string): void;
    /**
     *
     * @constructor
     */
    ClearValue(): void;
}
