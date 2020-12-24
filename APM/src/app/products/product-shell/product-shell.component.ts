import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

//note State is Products defined State that extends App State
import {
  getCurrentProduct,
  getError,
  getProducts,
  getShowProductCode,
  State,
} from '../state/product.reducer';

import * as ProductActions from '../state/product.actions';
import { Observable } from 'rxjs';
import { Product } from '../product';

@Component({
  templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit {
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());

    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.errorMessage$ = this.store.select(getError);
    this.products$ = this.store.select(getProducts);
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(
      ProductActions.setCurrentProduct({ currentProductId: product.id })
    );
  }
}
