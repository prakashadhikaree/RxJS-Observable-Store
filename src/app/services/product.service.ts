import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../services/product.state';
import { HandleErrorService } from './handle-error.service';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = '/api';

  public constructor(
    private _http: HttpClient,
    private _handleErrorService: HandleErrorService
  ) {
    /** Empty Constructor */
  }

  /**
   * Retrieves a list of products from the API.
   * @returns An Observable that emits an array of Product objects.
   */
  public getProducts(): Observable<Product[]> {
    return this._http
      .get<Product[]>(`${this.apiUrl}/products`)
      .pipe(catchError(this._handleErrorService.handleError));
  }

  /**
   * Adds a new product to the API.
   * @param product The Product object to add.
   * @returns An Observable that emits the added Product object.
   */
  public addProduct(product: Product): Observable<Product> {
    product.id = null;
    return this._http
      .post<Product>(`${this.apiUrl}/products`, product)
      .pipe(catchError(this._handleErrorService.handleError));
  }

  /**
   * Updates an existing product in the API.
   * @param product The Product object to update.
   * @returns An Observable that emits the updated Product object.
   */
  public editProduct(product: Product): Observable<Product> {
    return this._http
      .put<Product>(`${this.apiUrl}/products/${product.id}`, product)
      .pipe(catchError(this._handleErrorService.handleError));
  }

  /**
   * Deletes a product from the API.
   * @param id The ID of the Product object to delete.
   * @returns An Observable that emits the result of the delete operation.
   */
  public deleteProduct(id: number | null): Observable<any> {
    return this._http
      .delete(`${this.apiUrl}/products/${id}`)
      .pipe(catchError(this._handleErrorService.handleError));
  }
}
