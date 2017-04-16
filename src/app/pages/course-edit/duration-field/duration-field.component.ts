import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'duration-field',
	templateUrl: 'duration-field.component.html',
	styles: [require('./duration-field.component.scss')],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DurationFieldComponent {
	@Input() public val;
	@Output() public setDuration = new EventEmitter();

	constructor() {
	}

	public valueChanged() {
		this.val = parseInt(this.val, 10) || 0;
		this.setDuration.emit({ value: this.val });
	}

}
