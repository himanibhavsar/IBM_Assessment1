/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-useless-constructor */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { Observable } from 'rxjs/internal/Observable';
import {
  AfterViewInit, Component, OnInit, ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { select, Store } from '@ngrx/store';
import { Product } from '../product';
import { ProductService } from '../product.service';
import * as fromProduct from '../store/index';
import * as productActions from '../store/product.action';
import * as fromApp from '../store/product.reducer';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  displayedColumns: any[] = [
    'id',
    'blend_name',
    'origin',
    'variety',
    'notes',
    'intensifier',
  ];

  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products!: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    private store: Store<fromApp.ProductState>,
  ) {}

  ngOnInit() {
    this.getProductList();
    // this.getProductdata();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getProductList() {
    this.store.dispatch(new productActions.Load());
    this.products = this.store.pipe(select(fromProduct.getProducts));

    this.products.subscribe((data) => {
      // console.log('material tabel data', data);
      this.dataSource.data = data;
    });
  }

  // getProductdata() {
  //   this.productService.getProducts().subscribe((response) => {
  //     this.dataSource.data = response;
  //     // console.log(this.dataSource.data);
  //   });
  // }
}
