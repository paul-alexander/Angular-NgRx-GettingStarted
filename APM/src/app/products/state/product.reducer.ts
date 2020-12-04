import { createAction, createReducer, on } from '@ngrx/store';

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
