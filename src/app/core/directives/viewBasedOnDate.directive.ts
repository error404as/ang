import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[viewBasedOnDate]'
})
export class ViewBasedOnDateDirective implements OnInit {
    @Input() private viewBasedOnDate: any;

    constructor(private el: ElementRef) {
    }

    public ngOnInit() {
        let current = new Date().getTime();
        let date = new Date(this.viewBasedOnDate).getTime();
        if (current < date) {
            this.el.nativeElement.classList.add('upcoming');
        } else if (current - date <= 14 * 24 * 60 * 60 * 1000) {
            this.el.nativeElement.classList.add('fresh');
        }

    }

}
