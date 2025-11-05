import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CallDurationByDateRangeComponent } from './call-duration-by-date-range.component';
import { By } from '@angular/platform-browser';

describe('CallDurationByDateRangeComponent', () => {
  let component: CallDurationByDateRangeComponent;
  let fixture: ComponentFixture<CallDurationByDateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, CallDurationByDateRangeComponent], // Import CallDurationByDateRangeComponent
    }).compileComponents();

    fixture = TestBed.createComponent(CallDurationByDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title "Call Duration By Date Range"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h1');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Call Duration By Date Range');
  });

  it('should display the title "Call Duration By Date Range"', () => {
    const compiled = fixture.nativeElement;
    const titleElement = compiled.querySelector('h1');
    expect(titleElement).toBeTruthy();
    expect(titleElement.textContent).toContain('Call Duration By Date Range');
  });

  it('should update endDate when onEndDateSelected is called', () => {
    const testStartDate = new Date('2024-08-07');
    const testEndDate = new Date('2024-08-08');
    component.startDate = testStartDate; // Set a valid start date
    component.onEndDateSelected(testEndDate);
    expect(component.endDate).toEqual(testEndDate);
  });

  it('should render a submit button with the text "Get Data"', () => {
    const durationButton = fixture.debugElement.query(
      By.css('.calendar-form__actions button'),
    );

    const buttonEl = durationButton.nativeElement as HTMLButtonElement;
    expect(buttonEl.textContent).toContain('Get Data');
  });

  it('should have a tooltip with that renders "Click to fetch data" ', () => {
    const toolTipBtn =
      fixture.debugElement.nativeElement.querySelector('button');
    expect(toolTipBtn.getAttribute('ng-reflect-message')).toBe(
      'Click to fetch data',
    );
  });

  it('should position tooltip above the button', () => {
    const toolTipBtn =
      fixture.debugElement.nativeElement.querySelector('button');
    expect(toolTipBtn.getAttribute('ng-reflect-position')).toBe('above');
  });

  it('should display button with the correct color', () => {
    const buttonColor =
      fixture.debugElement.nativeElement.querySelector('button');
    expect(buttonColor.classList).toContain('button--primary');
  });
});
