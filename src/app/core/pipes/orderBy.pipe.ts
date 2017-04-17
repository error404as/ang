import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myOrderBy'
})
export class OrderByPipe implements PipeTransform {
    public transform(items: any[], field: string, revers: boolean): any[] {
        if (typeof items !== 'object' || !Array.isArray(items)) {
            return items;
        }
        let result = items.sort((a, b) => {
            if (typeof a[field] === 'string' && typeof b[field] === 'string') {
                if (a[field].toLowerCase() < b[field].toLowerCase()) { return -1; }
                if (a[field].toLowerCase() > b[field].toLowerCase()) { return 1; }
                return 0;
            } else if (typeof a[field] === 'number' && typeof b[field] === 'number') {
                return a[field] - b[field];
            } else if (a[field].constructor === Date && b[field].constructor === Date) {
                if (a[field] === b[field]) { return 0; }
                if (a[field] > b[field]) { return 1; } else { return -1; }
            }

            return 0;
        });

        if (revers) {
            return items.reverse();
        }
        return items;
    }
}
