/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { ProductService } from '../product.service';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(() => {
    const storeStub = () => ({ dispatch: () => ({}), pipe: () => ({}) });
    const productServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProductListComponent],
      providers: [
        { provide: Store, useFactory: storeStub },
        { provide: ProductService, useFactory: productServiceStub },
      ],
    });
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it('displayedColumns has default value', () => {
    expect(component.displayedColumns).toEqual([
      'id',
      'blend_name',
      'origin',
      'variety',
      'notes',
      'intensifier',
    ]);
  });

  it('DataSource is instance of MatTableDataSource', () => {
    expect(component.dataSource).toEqual(jasmine.any(MatTableDataSource));
  });

  it('Stor to be defined', async () => {
    expect(component.getProductList).toBeDefined();
  });

  it('Data is there in component', () => {
    expect(component.dataSource.data).toBeDefined();
  });
});
