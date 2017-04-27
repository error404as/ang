import { Component, ChangeDetectionStrategy, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor,
	FormGroup, FormControl, FormBuilder } from '@angular/forms';

const CUSTOM_VALUE_ACCESSOR = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => McheckFieldComponent), // tslint:disable-line
	multi: true
};

@Component({
	selector: 'mcheck-field',
	templateUrl: 'mcheck-field.component.html',
	styles: [require('./mcheck-field.component.scss')],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [CUSTOM_VALUE_ACCESSOR]
})
export class McheckFieldComponent implements ControlValueAccessor, OnInit {
	public currentValue: any;
	public isDisabled: boolean = false;
	public mchks: FormGroup;
	@Input() public options: any[];
	@Input() public optionsName: string;

	constructor(private formBuilder: FormBuilder) { }

public ngOnInit() {
		console.log('oninit');
		console.log(this.options);
		let options = this.formBuilder.group({});
		this.options.forEach((opt) => {
			options.addControl(opt.name, new FormControl(false));
		});
		let authors = this.formBuilder.array(
			this.options.map((author) => this.formBuilder.group({
				[author.name]: false
			}))
		);

		this.mchks = this.formBuilder.group({
			title: 'fsdf',
			options2: authors
		});
		console.log(this.mchks);
	}

	public setValue(item) {
		this.value = item.target.value;
	}
	set value(newValue) {
		this.currentValue = newValue;
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
			this.currentValue = value;
		}
	}
	public setDisabledState(isDisabled) {
		this.isDisabled = isDisabled;
	}

}
