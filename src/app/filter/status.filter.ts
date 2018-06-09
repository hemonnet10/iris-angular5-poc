import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {
   transform(items: any[], status: any): any {
    if (status != undefined && items != undefined) {
      // filter items array, items which match and return true will be kept, false will be filtered out
      return items.filter(item => item.status.toLowerCase().indexOf(status.toLowerCase()) !== -1);
    }
    return items;
  }
}