import { Component } from '@angular/core';
import { delay, tap } from 'rxjs';
import { Product } from '../../services/product.state';
import { ProductStore } from '../../services/product.store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  public products: Product[] = [];
  public lastUpdatedProduct: Product = new Product();
  public lastDeletedProduct: Product = new Product();
  public lastOrderedProduct: Product = new Product();
  public lastCreatedProduct: Product = new Product();
  public isLoading: boolean = false;

  /**
   * @param _productStore The product store service.
   */
  public constructor(private _productStore: ProductStore) {
    /* Empty Constructor */
  }

  /**
   * Subscribes to the product store state changes and updates the component's properties
   */
  public ngOnInit(): void {
    this._productStore.state$
      .pipe(
        tap(() => (this.isLoading = true)),
        delay(1000),
        tap(() => (this.isLoading = false))
      )
      .subscribe(() => {
        this.products = this._productStore.getProducts();
        this.lastUpdatedProduct = this._productStore.getLastUpdatedProduct();
        this.lastDeletedProduct = this._productStore.getLastDeletedProduct();
        this.lastOrderedProduct = this._productStore.getLastOrderedProduct();
        this.lastCreatedProduct = this._productStore.state.lastCreatedProduct;
      });
  }
}
