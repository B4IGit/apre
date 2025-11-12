import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CalendarComponent } from '../../../shared/calendar/calendar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { TableComponent } from './../../../shared/table/table.component';

@Component({
  selector: 'app-call-duration-by-date-range-tabular',
  standalone: true,
  imports: [CalendarComponent, CommonModule, TableComponent],
  providers: [DatePipe],
  template: `
    <h1>Call Duration by Date Range - Tabular</h1>
    <div class="call-duration-container">
      <div class="calendar-form">
        <div class="calendar-form__group">
          <div class="calendar-form__item">
            <label class="calendar-form__label" for="startDate">
              Start Date:</label
            >
            <app-calendar
              (dateSelected)="onStartDateSelected($event)"
            ></app-calendar>
          </div>
          <div class="calendar-form__item">
            <label class="calendar-form__label" for="endDate">End Date:</label>
            <app-calendar
              (dateSelected)="onEndDateSelected($event)"
            ></app-calendar>
          </div>
        </div>
        <div class="calendar-form__actions">
          <button
            class="button button--primary"
            (click)="fetchPerformanceData()"
          >
            Get Data
          </button>
        </div>
      </div>

      <br />

      <div *ngIf="salesData.length > 0" class="card chart-card">
        <app-table
          [title]="'Agent Call Duration by Date Range'"
          [data]="salesData"
          [headers]="['Agent', 'Call Duration (min)']"
          [sortableColumns]="['Agent', 'Call Duration (min)']"
          [headerBackground]="'secondary'"
        ></app-table>
      </div>
    </div>
  `,
  styles: `
    .call-duration-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .calendar-form {
      width: 50%;
      background: #fff;
      border: 1px solid #ddd;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      box-sizing: border-box;
      margin: 20px 0;
      min-height: 200px;
      margin: 0 auto;
    }

    .calendar-form__group {
      display: flex;
      gap: 10px;
    }

    .calendar-form__item {
      flex: 1;
    }

    .calendar-form__label {
      padding-right: 10px;
    }

    .calendar-form__actions .button {
      margin-top: 10%;
      width: 100%;
    }

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
export class CallDurationByDateRangeTabularComponent {
  startDate: Date | null = null;
  endDate: Date | null = null;
  salesData: any[] = [];
  agents: string[] = [];
  callDurationData: number[] = [];

  constructor(private http: HttpClient) {}

  onStartDateSelected(date: Date) {
    this.startDate = date;
    this.logDate(date);
  }

  onEndDateSelected(date: Date) {
    if (this.startDate && date < this.startDate) {
      alert('End date must be after the start date.');
      return;
    }

    this.endDate = date;
    this.logDate(date);
  }

  fetchPerformanceData() {
    if (this.startDate && this.endDate) {
      // Convert the dates to ISO 8601 strings
      const startDateISO = this.startDate.toISOString();
      const endDateISO = this.endDate.toISOString();

      console.log(
        'Fetching performance data for dates:',
        startDateISO,
        endDateISO,
      );

      this.http
        .get(
          `${environment.apiBaseUrl}/reports/agent-performance/call-duration-by-date-range?startDate=${startDateISO}&endDate=${endDateISO}`,
        )
        .subscribe({
          next: (data: any) => {
            const result = Array.isArray(data) ? data[0] : null; // Checks if data is an array
            if (!result?.agents || !result?.callDurations) {
              this.salesData = [];
              console.warn('No data returned.');
              return;
            }

            this.agents = result.agents; // Stores agents name
            this.callDurationData = result.callDurations; // Stores call durations in minutes

            // Formats and renders the data for the table
            this.salesData = this.agents.map((agent: string, i: number) => ({
              Agent: agent,
              'Call Duration (min)': this.callDurationData[i],
            }));
          },
          error: (err: any) => {
            console.error(
              'Error fetching call duration by date range data:',
              err,
            );
          },
        });
    } else {
      alert('Please select both start and end dates.');
    }
  }

  logDate(date: Date) {
    console.log('Date selected:', date);
  }
}
