import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ProductUpdateComponent } from './product-update.component';
import { ProductFormComponent } from 'src/app/shared/product-form/product-form.component';

fdescribe('ProductUpdateComponent', () => {
  let component: ProductUpdateComponent;
  let fixture: ComponentFixture<ProductUpdateComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let productServiceSpy = jasmine.createSpyObj('ProductService', [
    'getProductById',
    'updateProduct',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductUpdateComponent, ProductFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1',
              },
            },
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductUpdateComponent);
    component = fixture.componentInstance;
    const mockProduct: Product = {
      id: 1,
      name: 'Test Product',
      price: 10,
      quantity: 5,
    };
    productServiceSpy.getProductById.and.returnValue(mockProduct);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prefill form', () => {
    component.ngOnInit();

    expect(component.productForm.value).toEqual({
      name: 'Test Product',
      price: 10,
      quantity: 5,
    });
  });

  it('should update product', () => {
    const updatedProduct: Product = {
      id: 1,
      name: 'Updated Product',
      price: 15,
      quantity: 3,
    };

    component.ngOnInit();

    component.onSubmit(updatedProduct);

    expect(productServiceSpy.updateProduct).toHaveBeenCalledWith(
      updatedProduct
    );
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
  });
});
