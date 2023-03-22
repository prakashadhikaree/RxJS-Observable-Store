import { Injectable } from '@angular/core';
import { Product } from '../services/product.state';
import { ProductState } from './product.state';
import { Store } from './store.service';

@Injectable({
  providedIn: 'root',
})
export class ProductStore extends Store<ProductState> {
  /**
   * Invoke the constructor of the parent Store class, passing in the ProductState instance as an argument.
   */
  public constructor() {
    super(new ProductState());
  }

  /**
   * Set the products in the state.
   * @param {Product[]} products - The products to be set.
   * @returns {void}
   */
  public setProducts(products: Product[]): void {
    this.setState({
      ...this.state,
      products,
    });
  }

  /**
   * Get the products from the state.
   * @returns {Product[]} - The products from the state.
   */
  public getProducts(): Product[] {
    return this.state.products;
  }

  /**
   * Get the last updated product from the state.
   * @returns {Product} - The last updated product from the state.
   */
  public getLastUpdatedProduct(): Product {
    return this.state.lastUpdatedProduct;
  }

  /**
   * Get the last deleted product from the state.
   * @returns {Product} - The last deleted product from the state.
   */
  public getLastDeletedProduct(): Product {
    return this.state.lastDeletedProduct;
  }

  /**
   * Get the last ordered product from the state.
   * @returns {Product} - The last ordered product from the state.
   */
  public getLastOrderedProduct(): Product {
    return this.state.lastOrderedProduct;
  }

  /**
   * Get the last created product from the state.
   * @returns {Product} - The last created product from the state.
   */
  public getLastCreatedProduct(): Product {
    return this.state.lastCreatedProduct;
  }

  /**
   * Remove a product from the state.
   * @param {Product} deletedProduct - The product to be removed.
   * @returns {void}
   */
  public removeProduct(deletedProduct: Product): void {
    const products: Product[] = JSON.parse(
      JSON.stringify(this.state.products)
    ).filter((product: Product) => product.id != deletedProduct.id);
    this.setState({
      ...this.state,
      products,
      lastDeletedProduct: deletedProduct,
    });
  }

  /**
   * Update a product in the state.
   * @param {Product} updatedProduct - The updated product.
   * @returns {void}
   */
  public updateProduct(updatedProduct: Product): void {
    const products: Product[] = JSON.parse(JSON.stringify(this.state.products));
    const updatedIndex: number = products.findIndex(
      (product: Product) => product.id == updatedProduct.id
    );
    if (updatedIndex > -1) {
      products[updatedIndex] = updatedProduct;
      this.setState({
        ...this.state,
        products,
        lastUpdatedProduct: updatedProduct,
      });
    }
  }

  /**
   * Save a product to the state.
   * @param {Product} product - The product to be saved.
   * @returns {void}
   */
  public saveProduct(product: Product): void {
    console.log(product);
    const products = JSON.parse(JSON.stringify(this.state.products));
    products.push(product);
    this.setState({
      ...this.state,
      products,
      lastCreatedProduct: product,
    });
  }

  /**
   * Save a order of a product to the state.
   * @param {Product} product - The product to be ordered.
   * @returns {void}
   */
  public orderProduct(product: Product): void {
    this.setState({
      ...this.state,
      lastOrderedProduct: product,
    });
  }

  /**
   * Reset the state.
   * @returns {void}
   */
  public resetState(): void {
    this.setState(new ProductState());
  }
}
