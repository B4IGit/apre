import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { TableComponent } from './../../../shared/table/table.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-feedback-by-product',
  standalone: true,
  imports: [ReactiveFormsModule, TableComponent],
  template: `
    <h1>Customer Feedback by Product</h1>
    <div class="customer-feedback-container">
      <form class="form" [formGroup]="productForm" (ngSubmit)="onSubmit()">
        <div class="form__group">
          <label class="label" for="product">Select a product</label>
          <select
            class="select"
            formControlName="product"
            id="product"
            name="product"
          >
            @for (product of products; track product) {
              <option value="{{ product }}">{{ product }}</option>
            }
          </select>
        </div>

        <div class="form__actions">
          <button class="button button--primary" type="submit">Get Data</button>
        </div>
      </form>

      @if (productData.length) {
        <div class="card chart-card">
          <app-table
            [title]="'Customer Feedback by Product'"
            [data]="productData"
            [headers]="['Customer', 'Product', 'Region']"
            [sortableColumns]="['Customer', 'Region']"
            [recordsPerPage]="10"
            [headerBackground]="'secondary'"
          ></app-table>
        </div>
      }
    </div>
  `,
  styles: `
    .customer-feedback-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .form,
    .chart-card {
      width: 50%;
      margin: 20px 0;
      padding: 10px;
    }
    app-table {
      padding: 50px;
    }
  `,
})
export class CustomerFeedbackByProductComponent implements AfterViewInit {
  productData: any[] = [];
  products: string[] = [];

  productForm = this.fb.group({
    product: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.http
      .get(
        `${environment.apiBaseUrl}/reports/customer-feedback/customer-feedback-by-product`,
      )
      .subscribe({
        next: (data: any) => {
          this.products = data;
        },
        error: (err) => {
          console.error('Error fetching products: ', err);
        },
      });
  }

  ngAfterViewInit(): void {
    // No need to create table here, it will be handled by TableComponent
  }

  onSubmit() {
    const product = this.productForm.controls['product'].value;
    if (!this.productForm.valid || !product) {
      alert('Please select a product.');
      return;
    }
    this.http
      .get(
        `${environment.apiBaseUrl}/reports/customer-feedback/customer-feedback-by-product/${product}`,
      )
      .subscribe({
        next: (data: any) => {
          this.productData = data; // Customer | Product | Region | Sale Amount
          for (let data of this.productData) {
            data['Customer'] = data['customer'];
            data['Product'] = product;
            data['Region'] = data['region'];
          }
          this.cdr.markForCheck(); // Trigger change detection
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching customer feedback data: ', err);
          this.productData = [];
        },
      });
  }
}
