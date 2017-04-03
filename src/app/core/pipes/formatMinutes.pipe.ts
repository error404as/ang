import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myFormatMinutes'
})
export class FormatMinutesPipe implements PipeTransform {
    public transform(minutes: number): string {
        if (minutes < 60 && minutes >= 0) {
            return minutes + 'm';
        } else if (minutes >= 60) {
            return Math.floor(minutes / 60) + 'h ' + (minutes % 60 ? minutes % 60 + 'm' : '');
        }
        return minutes + '';
    }
}
