import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})

/* Filter for Searching Product By Names and Categories */
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propertyName: string): any[] {
    const result: any = [];
    if (!value || filterString === '' || propertyName === '') {
      return value;
    }
    value.forEach((ele: any) => {
      if (
        ele[propertyName]
          .trim()
          .toLowerCase()
          .includes(filterString.toLowerCase())
      ) {
        result.push(ele);
      }
    });
    return result;
  }
}
