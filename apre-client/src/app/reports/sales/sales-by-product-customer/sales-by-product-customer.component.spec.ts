import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesByProductCustomerComponent } from './sales-by-product-customer.component';

describe('SalesByProductCustomerComponent', () => {
  let component: SalesByProductCustomerComponent;
  let fixture: ComponentFixture<SalesByProductCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesByProductCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesByProductCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
