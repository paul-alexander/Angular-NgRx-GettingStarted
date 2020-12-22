import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),

      //TODO - Why MergeMap
      mergeMap(() =>
        this.productService
          .getProducts()
          .pipe(
            map(products => ProductActions.loadProductsSuccess({ products })),
            catchError(error => of(ProductActions.loadProductsFailure({error})))
          )
      )
    );
  });



  updateProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),

      //TODO - Why ConcatMap
      concatMap(action =>
        this.productService
          .updateProduct( action.product )
          .pipe(
            map(product => ProductActions.updateProductSuccess({ product })),
            catchError(error => of(ProductActions.updateProductFailure({error})))
          )
      )
    );
  });


  deleteProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),

      concatMap(action =>
        this.productService
          .deleteProduct( action.productId )
          .pipe(
            map(product => ProductActions.deleteProductSuccess({ productId: action.productId })),
            catchError(error => of(ProductActions.deleteProductFailure({error})))
          )
      )
    );
  });


  createProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.createProduct),

      concatMap(action =>
        this.productService
          .createProduct( action.product )
          .pipe(
            map(product => ProductActions.createProductSuccess({ product: product })),
            catchError(error => of(ProductActions.createProductFailure({error})))
          )
      )
    );
  });

}
