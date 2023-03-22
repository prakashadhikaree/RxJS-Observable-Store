import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { PRODUCTS } from '../mocks/products';
import { Product } from './product.state';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  public constructor() {
    /* Empty Constructor */
  }

  public createDb(): { [key: string]: Product[] } {
    return {
      products: PRODUCTS,
    };
  }

  get(reqInfo: any) {
    console.log(reqInfo);
    return undefined;
  }
}
