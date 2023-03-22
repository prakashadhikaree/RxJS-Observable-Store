import { Observable, BehaviorSubject } from 'rxjs';

/**
 * A generic class for managing state of the application.
 * @template T - The type of state managed by the store.
 */
export class Store<T> {
  /**
   * A private instance of a BehaviorSubject, used to keep track of the state.
   * @private
   */
  private _state$: BehaviorSubject<T>;

  /**
   * An observable that emits the current state of the store.
   * @public
   */
  public state$: Observable<T>;

  /**
   * Creates a new instance of the Store class.
   * @param initialState - The initial state of the store.
   */
  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject(initialState);
    this.state$ = this._state$.asObservable();
  }

  /**
   * Returns the current state of the store.
   * @returns The current state of the store.
   */
  get state(): T {
    return this._state$.getValue();
  }

  /**
   * Sets the next state of the store.
   * @param nextState - The next state of the store.
   */
  public setState(nextState: T): void {
    this._state$.next(nextState);
  }
}
