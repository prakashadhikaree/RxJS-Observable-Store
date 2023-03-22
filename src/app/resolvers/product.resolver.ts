import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { Observable, take } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../services/product.state';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<Product[]> {
  public constructor(private _productService: ProductService) {
    /**
     * Empty Constructor
     */
  }

  /**
   * Resolves the list of products by calling the getProducts method of the _productService object.
   * @returns An Observable that emits an array of products.
   */
  public resolve(): Observable<Product[]> {
    return this._productService.getProducts().pipe(take(1));
  }
}
