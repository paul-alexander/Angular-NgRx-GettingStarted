import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { Product } from '../product';
import * as AppState from '../../state/app.state';

export interface State extends AppState.State {
  products: ProductState;
}


export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState  = {
  showProductCode: true,
  currentProduct: null,
  products: null
}

//Selectors

//'products' - same as defined in the product.module
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(getProductFeatureState, state => state.showProductCode);
export const getCurrentProduct = createSelector(getProductFeatureState, state => state.currentProduct);
export const getProducts = createSelector(getProductFeatureState, state => state.products);






export const productReducer = createReducer<ProductState>(

  //same as below  <ProductState>  { showProductCode: true } ,
  //{ showProductCode: true } as ProductState,
  initialState,

  on(createAction('[Product] Toggle Product Code'), (state):ProductState => {
    console.log('Original state: ' + JSON.stringify(state));

    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  })
);
