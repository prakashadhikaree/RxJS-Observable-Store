/**
 * Represents the state of the product management application's products.
 */
export class ProductState {
  /**
   * An array of products.
   * @type {Product[]}
   */
  public products: Product[] = [];

  /**
   * The most recently updated product.
   * @type {Product}
   */
  public lastUpdatedProduct: Product = new Product();

  /**
   * The most recently deleted product.
   * @type {Product}
   */
  public lastDeletedProduct: Product = new Product();

  /**
   * The most recently ordered product.
   * @type {Product}
   */
  public lastOrderedProduct: Product = new Product();

  /**
   * The most recently created product.
   * @type {Product}
   */
  public lastCreatedProduct: Product = new Product();
}

/**
 * Represents a single product in the product management application.
 */
export class Product {
  /**
   * The ID of the product.
   * @type {number | null}
   */
  public id: number | null = 0;

  /**
   * The name of the product.
   * @type {string}
   */
  public name: string = '';

  /**
   * The ASIN (Amazon Standard Identification Number) of the product.
   * @type {string}
   */
  public asin: string = '';

  /**
   * The price of the product.
   * @type {string}
   */
  public price: string = '';
}
