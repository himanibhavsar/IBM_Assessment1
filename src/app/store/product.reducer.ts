/* eslint-disable default-param-last */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Product } from '../product';
import { ProductActions, ProductActionTypes } from './product.action';

export interface ProductState {
  toggleCheckBox: boolean;
  products: Product[];
  loaded: boolean;
  error: string;
}

const initialState: ProductState = {
  toggleCheckBox: true,
  products: [],
  loaded: false,
  error: '',
};

export function ProductReducer(
  state: ProductState = initialState,
  action: ProductActions,
): ProductState {
  switch (action.type) {
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: [...action.payload],
        loaded: true,
        error: '',
      };
    default:
      return state;
  }
}
