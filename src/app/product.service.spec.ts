/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { ProductService } from './product.service';
import { Product } from './product';

describe('ProductService', () => {
  let service: ProductService;
  let httpController: HttpTestingController;
  const { baseUrl } = environment;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it('getProducts() should return an Observable<Product[]>', () => {
    const products: Product[] = [];
    service.getProducts().subscribe((data) => {
      expect(data).toEqual(products);
    });
    const req = httpController.expectOne(
      `${baseUrl}coffee/random_coffee?size=50`
    );
    expect(req.request.method).toBe('GET');
    req.flush(products);
  });
});
