import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Product } from '../product';
//import { ProductService } from '../product.service';

//note State is Products defined State that extends App State
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state/product.reducer';

import * as ProductActions from '../state/product.actions'
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  //errorMessage: string;

  // displayCode: boolean;

  // products: Product[];

  // // Used to highlight the selected product in the list
  // selectedProduct: Product | null;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;


  constructor(
    private store: Store<State>,
    //private productService: ProductService
  ) {}

  ngOnInit(): void {

    ////TODO - Unsubscribe
    // this.store.select(getCurrentProduct).subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // )

    this.selectedProduct$ = this.store.select(getCurrentProduct);




    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => (this.products = products),
    //   error: (err) => (this.errorMessage = err),
    // });

    this.errorMessage$ = this.store.select(getError);

    this.products$ = this.store.select(getProducts);
    this.store.dispatch(ProductActions.loadProducts());


    // //TODO - Unsubscribe
    // this.store.select(getShowProductCode).subscribe(
    //   (showProductCode) => this.displayCode = showProductCode
    // );

    this.displayCode$ = this.store.select(getShowProductCode);
    
  }

  checkChanged(): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductActions.initializeCurrentProduct());

  }

  productSelected(product: Product): void {
    this.store.dispatch(ProductActions.setCurrentProduct({product}));
  }
}
