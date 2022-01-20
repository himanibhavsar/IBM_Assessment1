/* eslint-disable import/no-unresolved */
import {
  createFeatureSelector,
  createSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromProduct from './product.reducer';

export interface State {
  productFeature: fromProduct.ProductState;
}

export const reducers: ActionReducerMap<State, any> = {
  productFeature: fromProduct.ProductReducer,
};

const getProductFeatureState = createFeatureSelector<fromProduct.ProductState>('productFeature');

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products,
);

export const getLoaded = createSelector(
  getProductFeatureState,
  (state) => state.loaded,
);
