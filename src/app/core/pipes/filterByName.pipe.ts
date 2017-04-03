import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myFilterByName'
})
export class FilterByNamePipe implements PipeTransform {
    public transform(items: any[], q: string): any[] {
        if (!q) { return items; }
        q = q.toLowerCase();
        return items.filter((item) => {
            if (typeof item.name !== 'string') { return false; }
            return item.name.toLowerCase().indexOf(q) === 0;
        });
    }
}
