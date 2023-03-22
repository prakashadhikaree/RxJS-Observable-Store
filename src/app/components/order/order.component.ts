import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay, tap } from 'rxjs';
import { NotificationService } from '../../services/notification.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../services/product.state';
import { ProductStore } from '../../services/product.store';
import { STATIC_TEXT } from '../../services/static-text';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent {
  public products: Product[] = [];
  public lastUpdatedProduct: Product = new Product();
  public lastDeletedProduct: Product = new Product();
  public lastOrderedProduct: Product = new Product();
  public isLoading: boolean = false;

  public constructor(
    private _productStore: ProductStore,
    private _notification: NotificationService,
    private _activateRoute: ActivatedRoute
  ) {
    /* Empty Constructor */
  }

  public ngOnInit(): void {
    // this._activateRoute.data.subscribe((data: { [key: string]: Product[] }) => {
    //   this.products = data['products'];
    //   this._productStore.setProducts(this.products);
    // });

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
      });
  }

  public confirm(product: Product): void {
    console.log(`Thank you for your order. See your order: ${product}`);
    this._productStore.orderProduct(product);
    this._notification.notification(
      'success',
      STATIC_TEXT['001'],
      STATIC_TEXT['007']
    );
  }
}
