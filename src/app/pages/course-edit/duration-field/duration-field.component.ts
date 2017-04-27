import { Component, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const CUSTOM_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DurationFieldComponent), // tslint:disable-line
	multi: true
};

@Component({
	selector: 'duration-field',
	templateUrl: 'duration-field.component.html',
	styles: [require('./duration-field.component.scss')],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [CUSTOM_VALUE_ACCESSOR]
})
export class DurationFieldComponent implements ControlValueAccessor {
	public currentValue: any;
	public isDisabled: boolean = false;

	constructor() {
	}

	public setValue(item) {
		this.value = item.target.value;
	}
	set value(newValue) {
		this.currentValue = newValue || 0;
		this.onChange(this.currentValue);
	}
	get value() {
		return this.currentValue;
	}
	public onChange = (_) => { };
	public onTouched = () => { };
	public registerOnChange(fn: any) {
		this.onChange = fn;
	}
	public registerOnTouched(fn: any) {
		this.onTouched = fn;
	}
	public writeValue(value: any) {
		if (value !== this.currentValue) {
			this.currentValue = value || 0;
		}
	}
	public setDisabledState(isDisabled) {
		this.isDisabled = isDisabled;
	}

}
