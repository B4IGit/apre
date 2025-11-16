import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerFeedbackByProductComponent } from './customer-feedback-by-product.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CustomerFeedbackByProductComponent', () => {
  let component: CustomerFeedbackByProductComponent;
  let fixture: ComponentFixture<CustomerFeedbackByProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        CustomerFeedbackByProductComponent,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerFeedbackByProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title "Customer Feedback by Product"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h1');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Customer Feedback by Product');
  });

  it('should not submit the form if no product is selected', () => {
    spyOn(component, 'onSubmit').and.callThrough();

    const compiled = fixture.nativeElement;
    const submitButton = compiled.querySelector('.form__actions button');
    submitButton.click();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.productForm.valid).toBeFalse();
  });

  it('should display an alert if a product is not selected when button is clicked', () => {
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Please select a product.');
  });
});
