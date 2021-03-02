import { Pipe, PipeTransform } from '@angular/core';

export interface HeaderGroup {
  name: string;
  icon: string;
  route: string;
  group?: HeaderGroup[]
}

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], search: string, param: string): any {
    if (!items) return [];
    if (!search) return items;
    search = search.toLowerCase();

    const filtered = items.filter(function doSearch(row) {
      return Object.keys(row).some((key) => {
        if (typeof row[key] === "string") {
          return row[key].toLowerCase().indexOf(search) > -1;
        } else if (row[key] && typeof row[key] === "object") {
          return doSearch(row[key]);
        }
        return false;
      });
    }).map(it => {
      if (it.group) {
        it.openGroup = true;
      }
      return it;
    });
    return filtered;
  }

}
