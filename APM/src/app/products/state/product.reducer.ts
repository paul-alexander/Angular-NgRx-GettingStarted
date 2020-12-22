import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import { Product } from '../product';
import * as AppState from '../../state/app.state';
import * as ProductActions from '../state/product.actions';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: null,
  error: '',
};

//Selectors

//'products' - same as defined in the product.module
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);
export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      };
    } else {
      //TODO - get rid of array of products and use objects with key instead for improved performance and scalability
      return currentProductId
        ? state.products.find((p) => p.id === currentProductId)
        : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);
export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
);

export const productReducer = createReducer<ProductState>(
  //same as below  <ProductState>  { showProductCode: true } ,
  //{ showProductCode: true } as ProductState,
  initialState,

  on(
    ProductActions.toggleProductCode,
    (state): ProductState => {
      console.log('Original state: ' + JSON.stringify(state));

      return {
        ...state,
        showProductCode: !state.showProductCode,
      };
    }
  ),

  on(
    ProductActions.setCurrentProduct,
    (state, action): ProductState => {
      return {
        ...state,
        currentProductId: action.currentProductId,
      };
    }
  ),

  on(
    ProductActions.clearCurrentProduct,
    (state): ProductState => {
      return {
        ...state,
        currentProductId: null,
      };
    }
  ),

  on(
    ProductActions.initializeCurrentProduct,
    (state): ProductState => {
      return {
        ...state,
        currentProductId: 0
      };
    }
  ),

  on(
    ProductActions.loadProductsSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        products: action.products,
        error: '',
      };
    }
  ),

  on(
    ProductActions.loadProductsFailure,
    (state, action): ProductState => {
      return {
        ...state,
        products: [],
        error: action.error,
      };
    }
  ),


  on(
    ProductActions.updateProductSuccess,
    (state, action): ProductState => {

      //copy of state products but ensure the updated product is used to replace existing
      // .map creates new Array and does not mutate the existing state
      const updatedProducts = state.products.map(
        item => action.product.id === item.id ? action.product : item
      );

      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.product.id, 
        error: '',
      };
    }
  ),

  on(
    ProductActions.updateProductFailure,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),

  on(
    ProductActions.deleteProductSuccess,
    (state, action): ProductState => {

      const updatedProducts = state.products.filter(
        item => action.productId !== item.id
      );

      return {
        ...state,
        products: updatedProducts,
        currentProductId: null, 
        error: '',
      };
    }
  ),

  on(
    ProductActions.deleteProductFailure,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),


  on(
    ProductActions.createProductSuccess,
    (state, action): ProductState => {

 

      return {
        ...state,
        products: [...state.products, action.product],
        currentProductId: action.product.id, 
        error: '',
      
      };
    }
  ),

  on(
    ProductActions.createProductFailure,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error,
      };
    }
  ),  
);
