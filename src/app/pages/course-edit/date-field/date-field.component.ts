import { Component, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const CUSTOM_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DateFieldComponent), // tslint:disable-line
	multi: true
};

@Component({
	selector: 'date-field',
	templateUrl: 'date-field.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [DatePipe, CUSTOM_VALUE_ACCESSOR]
})
export class DateFieldComponent implements ControlValueAccessor {
	public currentValue: any;
	public isDisabled: boolean = false;

	constructor() {
	}

	public setValue(item) {
		this.value = item.target.value;
	}
	set value(newValue) {
		this.currentValue = newValue;
		this.onChange(this.convertDate(newValue));
	}
	get value() {
		return this.convertDate(this.currentValue);
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
			this.currentValue = value instanceof Date ? this.convertDate(value) : value;
		}
	}
	public setDisabledState(isDisabled) {
		this.isDisabled = isDisabled;
	}
	public convertDate(value) {
		if (typeof value === 'string') {
			let d = value.split('/').reverse().map((n: any) => n * 1);
			let date = new Date(d[0], d[1] - 1, d[2]);
			return date.toString() === 'Invalid Date' ? null : date;
		} else if (value instanceof Date) {
			return new DatePipe('en-EN').transform(value, 'dd/MM/yyyy');
		}
		return value;
	}
}
