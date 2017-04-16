import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'date-field',
	templateUrl: 'date-field.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateFieldComponent {
	@Input() public date: string;
	@Output() public setDate = new EventEmitter();

	constructor() {
	}

	public dateChanged() {
		this.setDate.emit({ value: this.date });
	}

}
