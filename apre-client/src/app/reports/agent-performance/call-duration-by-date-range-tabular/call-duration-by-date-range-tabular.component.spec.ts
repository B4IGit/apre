import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CallDurationByDateRangeTabularComponent } from './call-duration-by-date-range-tabular.component';

describe('CallDurationByDateRangeTabularComponent', () => {
  let component: CallDurationByDateRangeTabularComponent;
  let fixture: ComponentFixture<CallDurationByDateRangeTabularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        CallDurationByDateRangeTabularComponent,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CallDurationByDateRangeTabularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should alert the user when the form is submitted without selecting a date range', () => {
    spyOn(window, 'alert');

    component.startDate = null;
    component.endDate = null;

    component.fetchPerformanceData();

    expect(window.alert).toHaveBeenCalledWith(
      'Please select both start and end dates.',
    );
  });

  it('should render app-table when salesData has entries', () => {
    component.salesData = [
      { Agent: 'Burnt Toast', 'Call Duration (min)': 120 },
      { Agent: 'French Toast', 'Call Duration (min)': 90 },
    ];
    fixture.detectChanges();

    const tableElement = fixture.nativeElement.querySelector('app-table');
    expect(tableElement).toBeTruthy();
  });

  it('should call fetchPerformanceData when the form is submitted', () => {
    spyOn(component, 'fetchPerformanceData');

    const button = fixture.nativeElement.querySelector('.button');
    button.click();

    expect(component.fetchPerformanceData).toHaveBeenCalled();
  });
});
