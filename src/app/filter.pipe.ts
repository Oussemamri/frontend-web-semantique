import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }

    const lowerCaseTerm = searchTerm.toLowerCase();
    return items.filter(item =>
      item.plant_name.toLowerCase().includes(lowerCaseTerm) || 
      item.planting_season.toLowerCase().includes(lowerCaseTerm)
    );
  }
}
