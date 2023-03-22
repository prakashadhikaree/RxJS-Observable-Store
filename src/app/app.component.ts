import { Component } from '@angular/core';
import { ProductService } from './services/product.service';
import { Product } from './services/product.state';
import { ProductStore } from './services/product.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title: string = 'RxJs Store';

  public constructor(
    private _productStore: ProductStore,
    private _productService: ProductService
  ) {
    /* Empty Constructor */
  }

  public ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts(): void {
    this._productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this._productStore.setProducts(products);
      },
      error: (err: any) => {},
      complete: () => {},
    });
  }
}
