import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  function findComponent<T>(
    fixture: ComponentFixture<T>,
    selector: string
  ): DebugElement {
    return fixture.debugElement.query(By.css(selector));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an img element', () => {
    const img = findComponent(fixture, 'img');
    expect(img).toBeTruthy();
  });

  it('should have an img title attribute of component.image.title', () => {
    component.image.title = 'Test title';

    fixture.detectChanges();

    const img = findComponent(fixture, 'img');
    expect(img.nativeElement.getAttribute('title')).toBe(component.image.title);
  });

  it('should have an img src attribute of component.image.src', () => {
    component.image.src = 'https://example.com';

    fixture.detectChanges();

    const img = findComponent(fixture, 'img');
    expect(img.nativeElement.getAttribute('src')).toBe(component.image.src);
  });

  it('should have an img alt attribute of component.image.title', () => {
    component.image.title = 'https://example.com';

    fixture.detectChanges();

    const img = findComponent(fixture, 'img');
    expect(img.nativeElement.getAttribute('alt')).toBe(component.image.title);
  });
});
