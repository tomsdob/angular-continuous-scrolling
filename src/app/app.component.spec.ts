import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  function findComponent<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): DebugElement {
    return fixture.debugElement.query(By.css(selector));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have 1 as the default page number', () => {
    expect(component.page).toEqual(1);
  });

  it('should render image container', () => {
    const imageContainer = findComponent(fixture, '#imageContainer');

    expect(imageContainer).toBeTruthy();
  });

  // TODO: should convert the manual images array to some kind of a fake API call
  it('should render image component if has images', () => {
    component.images = [
      {
        title: 'Test image',
        src: 'https://example.com',
      },
    ];

    fixture.detectChanges();

    const imageComponent = findComponent(fixture, 'app-image');

    expect(imageComponent).toBeTruthy();
  });

  // TODO: should convert the manual images array to some kind of a fake API call
  it('should not render image component if has no images', () => {
    component.images = [];

    fixture.detectChanges();

    const imageComponent = findComponent(fixture, 'app-image');

    expect(imageComponent).toBeNull();
  });

  it('should not render loading-spinner component if isLoading is false', () => {
    component.isLoading = false;

    fixture.detectChanges();

    const loadingSpinnerComponent = findComponent(
      fixture,
      'app-loading-spinner'
    );

    expect(loadingSpinnerComponent).toBeNull();
  });

  it('should render loading-spinner component if isLoading is true', () => {
    component.isLoading = true;

    fixture.detectChanges();

    const loadingSpinnerComponent = findComponent(
      fixture,
      'app-loading-spinner'
    );

    expect(loadingSpinnerComponent).toBeTruthy();
  });

  it('should render last page notification if isLastPage is true', () => {
    component.page = 2;
    component.pageAmount = 1;

    fixture.detectChanges();

    const lastPageNotification = findComponent(
      fixture,
      '#lastPageNotification'
    );

    expect(lastPageNotification).toBeTruthy();
  });

  it('should not render last page notification if isLastPage is false', () => {
    component.page = 1;
    component.pageAmount = 10;

    fixture.detectChanges();

    const lastPageNotification = findComponent(
      fixture,
      '#lastPageNotification'
    );

    expect(lastPageNotification).toBeNull();
  });

  it('should have last page notification with correct textContent', () => {
    component.page = 2;
    component.pageAmount = 1;

    fixture.detectChanges();

    const lastPageNotification = findComponent(
      fixture,
      '#lastPageNotification'
    );

    expect(lastPageNotification.nativeElement.textContent).toContain(
      'Sorry, no more images available at the moment!'
    );
  });
});
