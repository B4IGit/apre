import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableComponent } from './../../../shared/table/table.component';

@Component({
  selector: 'app-sales-by-product-customer',
  standalone: true,
  imports: [ReactiveFormsModule, TableComponent],
  template: ` <h1>Sales by Product - Customer</h1>
    <div class="product-container">
      <form class="form" [formGroup]="productForm" (ngSubmit)="onSubmit()">
        <div class="form__group">
          <label class="label" for="product">Product</label>
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
          <button class="button button--primary" type="submit">Submit</button>
        </div>
      </form>

      @if (rows.length) {
        <div class="card chart-card">
          <app-table
            [title]="'Sales by Product - Customer'"
            [data]="rows"
            [headers]="headers"
            [sortableColumns]="headers"
            [recordsPerPage]="10"
            [headerBackground]="'secondary'"
          ></app-table>
        </div>
      }
    </div>`,
  styles: [
    `
      .product-container {
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
  ],
})
export class SalesByProductCustomerComponent implements AfterViewInit {
  // Array of distinct product names loaded from the API
  products: string[] = [];

  // Table headers and rows for the TableComponent
  headers: string[] = ['product', 'customer', 'totalSales'];
  rows: Array<{ product: string; customer: string; totalSales: number }> = [];

  productForm = this.fb.group({
    product: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.http
      .get(`${environment.apiBaseUrl}/reports/sales/sales-by-product-customer`)
      .subscribe({
        next: (data: any) => {
          this.products = data;
        },
        error: (err) => {
          console.error('Error fetching products:', err);
        },
      });
  }

  ngAfterViewInit(): void {
    // No need to create chart here, it will be handled by TableComponent
  }

  onSubmit() {
    const product = this.productForm.controls['product'].value;
    if (!this.productForm.valid || !product) {
      alert('Please select a product.');
      return;
    }
    this.http
      .get(
        `${environment.apiBaseUrl}/reports/sales/sales-by-product-customer/${product}`,
      )
      .subscribe({
        next: (data: any) => {
          // Expecting data: Array<{ product: string; customer: string; totalSales: number }>
          this.rows = data || [];

          // Trigger change detection
          this.cdr.markForCheck();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching sales data:', err);
          this.rows = [];
        },
      });
  }
}
