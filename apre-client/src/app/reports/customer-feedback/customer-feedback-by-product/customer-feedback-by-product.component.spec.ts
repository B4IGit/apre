import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFeedbackByProductComponent } from './customer-feedback-by-product.component';

describe('CustomerFeedbackByProductComponent', () => {
  let component: CustomerFeedbackByProductComponent;
  let fixture: ComponentFixture<CustomerFeedbackByProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerFeedbackByProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerFeedbackByProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
