import { Component } from '@angular/core';
import { Product } from '../../services/product.state';
import { ProductService } from '../../services/product.service';
import { ProductStore } from '../../services/product.store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ProductFormComponent } from './product-form/product-form.component';
import { delay, tap } from 'rxjs/operators';
import { NotificationService } from '../../services/notification.service';
import { STATIC_TEXT } from '../../services/static-text';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  public products: Product[] = [];
  public product: Product = new Product();
  public lastUpdatedProduct: Product = new Product();
  public lastDeletedProduct: Product = new Product();
  public lastOrderedProduct: Product = new Product();
  public lastCreatedProduct: Product = new Product();

  public isLoading: boolean = false;

  public constructor(
    private _productStore: ProductStore,
    private _productService: ProductService,
    private _modal: NzModalService,
    private _notification: NotificationService
  ) {
    /**
     * Empty Constructor
     */
  }

  public ngOnInit(): void {
    /**
     * Subscribe to the state of the ProductStore and update the component data accordingly
     */
    this._productStore.state$
      .pipe(
        /**
         * Show a loading spinner while the data is being loaded
         */
        tap(() => (this.isLoading = true)),
        /**
         * Introduce a delay of 1 second before hiding the loading spinner
         */
        delay(1000),
        /**
         * Hide the loading spinner after the data has been loaded
         */
        tap(() => (this.isLoading = false))
      )
      .subscribe(() => {
        /**
         * Update the products, lastUpdatedProduct, lastDeletedProduct, lastOrderedProduct,and lastCreatedProduct
         * property with the latest data from the ProductStore
         */
        this.products = this._productStore.getProducts();
        this.lastUpdatedProduct = this._productStore.getLastUpdatedProduct();
        this.lastDeletedProduct = this._productStore.getLastDeletedProduct();
        this.lastOrderedProduct = this._productStore.getLastOrderedProduct();
        this.lastCreatedProduct = this._productStore.state.lastCreatedProduct;
      });
  }

  /**
   * Method called when the user clicks on the edit button of a product
   * @param product - The product to edit
   * @param isEdit - A flag indicating if the product is being edited or created
   */
  public onEditProduct(product: Product, isEdit: boolean): void {
    /**
     * Create a modal to display the product form
     */
    this._modal.create({
      nzTitle: 'Product Form',
      nzContent: ProductFormComponent,
      nzFooter: null,
      /**
       * Pass the product and isEdit flags as component parameters to the ProductFormComponent
       */
      nzComponentParams: {
        product: { ...product },
        isEdit,
      },
    });
  }
  /**
   * Method called when the user clicks on the delete button of a product
   * @param product - The product to delete
   */
  public onDeleteProduct(product: Product): void {
    /**
     * Delete the product via the ProductService and remove it from the ProductStore
     */
    this._productService.deleteProduct(product.id).subscribe({
      next: () => this._productStore.removeProduct(product),
      error: (err) => console.log(err),
      complete: () => {
        /**
         * Show success message after product is deleted
         */
        this._notification.notification(
          'success',
          STATIC_TEXT['001'],
          STATIC_TEXT['006']
        );
      },
    });
  }
}
