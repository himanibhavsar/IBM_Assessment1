/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {
  catchError, map, switchMap, withLatestFrom,
} from 'rxjs/operators';
import { Action, Store, select } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs/internal/observable/of';
import { empty } from 'rxjs/internal/observable/empty';
import * as fromProduct from './index';
import * as productAction from './product.action';
import { ProductService } from '../product.service';

@Injectable()
export class ProductEffect {
  constructor(
    private productService: ProductService,
    private action$: Actions,
    private store: Store<any>,
  ) {
  }

  @Effect()
    loadProduct$: Observable<Action> = this.action$.pipe(
      ofType(productAction.ProductActionTypes.Load),
      withLatestFrom(this.store.pipe(select(fromProduct.getLoaded))),
      switchMap(([, loaded]) => {
        if (loaded) {
          return empty();
        }

        // console.log('LOADING DATA', loaded);

        return this.productService.getProducts().pipe(
          map((products) => new productAction.LoadSuccess(products)),
          catchError((err) => of(new productAction.LoadFail(err))),
        );
      }),
    );
}
