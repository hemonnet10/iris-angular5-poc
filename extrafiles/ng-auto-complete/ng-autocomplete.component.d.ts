import { AfterViewChecked, ElementRef, EventEmitter, OnChanges, OnInit, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { AutocompleteGroup } from './classes/AutocompleteGroup';
import { SelectedAutocompleteItem } from './classes/typing';
import { CompleterComponent } from './completer/completer.component';
import { GroupNoResult } from './utils/utils';
import { Subject } from 'rxjs';
export declare class NgAutocompleteComponent implements OnInit, AfterViewChecked, OnChanges {
    completers: QueryList<CompleterComponent>;
    init: ElementRef;
    selected: EventEmitter<SelectedAutocompleteItem>;
    noResult: EventEmitter<GroupNoResult>;
    group: AutocompleteGroup[];
    key: string;
    classes: string[];
    _viewHasBeenInit: boolean;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    /**
     *
     */
    ngOnInit(): void;
    /**
     *
     */
    ngAfterViewChecked(): void;
    /**
     *
     * @constructor
     * @param selected
     */
    ListenToSelected(selected: SelectedAutocompleteItem): void;
    /**
     *
     * @constructor
     * @param group
     */
    NoResult(group: GroupNoResult): void;
    /**
     *
     * @constructor
     */
    InputCleared(key: string): void;
    /**
     *
     * @param selected
     * @constructor
     */
    SetChildren(selected: SelectedAutocompleteItem): void;
    /**
     *
     * @constructor
     */
    TriggerChange(): void;
    /**
     *
     * @param {string} key
     * @returns {CompleterComponent}
     * @constructor
     */
    GetInput(key: string): CompleterComponent;
    /**
     *
     * @param {string} key
     * @param {(completer: CompleterComponent) => void} f
     * @constructor
     */
    SubscribeInput(key: string, f: (completer: CompleterComponent) => void): void;
    /**
     *
     * @param key
     * @returns {CompleterComponent}
     * @constructor
     */
    FindInput(key: string): Subject<CompleterComponent>;
    /**
     *
     * @param key
     * @constructor
     */
    ResetInput(key: string): void;
    /**
     *
     * @param key
     * @param values
     * @constructor
     */
    SetValues(key: string, values: {
        id?: string | number;
        [value: string]: any;
    }[]): void;
    /**
     *
     * @param {string} key
     * @param {"noResults" | "selectedValue"} type
     * @param {TemplateRef<any>} template
     * @constructor
     */
    SetTemplate(key: string, type: 'noResults' | 'placeholderValue' | 'dropdownValue', template: TemplateRef<any>): void;
    /**
     *
     * @param {string} key
     * @param promise
     * @constructor
     */
    SetAsync(key: string, promise: (str: string) => Promise<{
        id: string | number;
        [value: string]: any;
    }[]>): void;
    /**
     *
     * @param key
     * @param id
     * @constructor
     */
    SelectItem(key: string, id: string | number): void;
    /**
     *
     * @param key
     * @param ids
     * @constructor
     */
    RemovableValues(key: string, ids: {
        id: string | number;
        [value: string]: any;
    }[]): void;
    /**
     *
     * @constructor
     */
    ResetInputs(): void;
    /**
     *
     * @constructor
     */
    static FindCompleter(key: string, list: QueryList<NgAutocompleteComponent>): NgAutocompleteComponent;
}
