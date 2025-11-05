import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SalesByProductCustomerComponent } from './sales-by-product-customer.component';

describe('SalesByProductCustomerComponent', () => {
  let component: SalesByProductCustomerComponent;
  let fixture: ComponentFixture<SalesByProductCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SalesByProductCustomerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesByProductCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title "Sales by Product - Customer"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h1');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Sales by Product - Customer');
  });

  it('should initialize the productForm with a null value', () => {
    const productControl = component.productForm.controls['product'];
    expect(productControl.value).toBeNull();
    expect(productControl.valid).toBeFalse();
  });

  it('should not submit the form if no category is selected', () => {
    spyOn(component, 'onSubmit').and.callThrough();

    const compiled = fixture.nativeElement;
    const submitButton = compiled.querySelector('.form__actions button');
    submitButton.click();

    expect(component.onSubmit).toHaveBeenCalled();
    expect(component.productForm.valid).toBeFalse();
  });

  it('should call window.alert with correct message', () => {
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith('Please select a product.');
  });
});
