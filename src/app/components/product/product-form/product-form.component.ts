import { Component, Input } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { delay } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/services/product.state';
import { ProductStore } from 'src/app/services/product.store';
import { STATIC_TEXT } from 'src/app/services/static-text';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  @Input()
  public product: Product = new Product();

  @Input()
  public isEdit: boolean = false;

  public isSaving: boolean = false;

  public constructor(
    private _modal: NzModalRef,
    private _productStore: ProductStore,
    private _productService: ProductService,
    private _notification: NotificationService
  ) {
    /* Empty Constructor */
  }

  public ngOnInit(): void {
    /* Empty Constructor */
  }

  private _destroyModal(): void {
    this._modal.destroy();
    this.isSaving = false;
  }

  public saveProduct(): void {
    // const formStatus = Object.values(this.product).every(p => p !== "");
    // if (!formStatus) return;
    this.isSaving = true;
    if (this.isEdit) {
      this._productService
        .editProduct(this.product)
        .pipe(delay(1000))
        .subscribe({
          next: () => this._productStore.updateProduct(this.product),
          error: (err) => console.log(err),
          complete: () => { 
            this._destroyModal()
            this._notification.notification(
              'success',
              STATIC_TEXT['001'],
              STATIC_TEXT['005']
            );
          }
        });
    } else {
      this._productService
        .addProduct(this.product)
        .pipe(delay(1000))
        .subscribe({
          next: (product: Product) => this._productStore.saveProduct(product),
          error: (err) => console.log(err),
          complete: () => {
            this._destroyModal()
            this._notification.notification(
              'success',
              STATIC_TEXT['001'],
              STATIC_TEXT['004']
            );
          } ,
        });
    }
    // this._destroyModal();
  }
}
