import {Pipe, PipeTransform} from '@angular/core';
import { CarsService } from './cars.service';

@Pipe({
 name: 'sortCarsPipe',
 pure: false
})
export class SortCarsPipe implements PipeTransform {
  carsService: CarsService;

  constructor(carsService: CarsService) {
    this.carsService = carsService;
  }

  transform(array: Array<any>, args: any): Array<any> {

    if (!array || array === undefined || array.length === 0) { return null; }

    if (typeof args !== 'undefined') {

      // Filter by make
      if (args.makeFilter !== 'All Makes') {
        array = array.filter((a: any) => {
          return a.make === args.makeFilter;
        });
      }

      // Filter by decade
      if (args.decadeFilter !== -1) {
        array = array.filter((a: any) => {
          if (a.year > args.decadeFilter && a.year - args.decadeFilter < 10) {
            return true;
          } else {
            return false;
          }
        });
      }

      // Sort by model
      if (args.modelSort) {
        array.sort((a: any, b: any) => {
          if (a.make.toLowerCase() < b.make.toLowerCase()) { return -1;
          } else if (a.make.toLowerCase() > b.make.toLowerCase()) { return 1;
          } else {
            if (a.baseModel.toLowerCase() < b.baseModel.toLowerCase()) { return -1;
            } else if (a.baseModel.toLowerCase() > b.baseModel.toLowerCase()) { return 1;
            } else {
              if (a.year < b.year) { return -1;
              } else if (a.year > b.year) { return 1;
              } else { return 0;
              }
            }
          }
        });
      }

      // Sort by year
      if (args.yearSort) {
        array.sort((a: any, b: any) => {
          if (a.year < b.year) { return 1;
          } else if (a.year > b.year) { return -1;
          } else {
            if (a.make.toLowerCase() < b.make.toLowerCase()) { return -1;
            } else if (a.make.toLowerCase() > b.make.toLowerCase()) { return 1;
            } else {
              if (a.baseModel.toLowerCase() < b.baseModel.toLowerCase()) { return -1;
              } else if (a.baseModel.toLowerCase() > b.baseModel.toLowerCase()) { return 1;
              } else { return 0;
              }
            }
          }
        });
      }

      // Sort by selected
      if (args.selectedSort) {
        array.sort((a: any, b: any) => {
          if (a.isSelected && !b.isSelected) { return -1;
          } else if (!a.isSelected && b.isSelected) { return 1;
          } else {
            if (a.make.toLowerCase() < b.make.toLowerCase()) { return -1;
            } else if (a.make.toLowerCase() > b.make.toLowerCase()) { return 1;
            } else {
              if (a.baseModel.toLowerCase() < b.baseModel.toLowerCase()) { return -1;
              } else if (a.baseModel.toLowerCase() > b.baseModel.toLowerCase()) { return 1;
              } else {
                if (a.year < b.year) { return -1;
                } else if (a.year > b.year) { return 1;
                } else { return 0;
                }
              }
            }
          }
        });
      }

      // Reverse order
      if (args.reverse) {
        array.reverse();
      }

      return array;
    }
  }
}
