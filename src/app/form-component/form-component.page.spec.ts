import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponentPage } from './form-component.page';

describe('FormComponentPage', () => {
  let component: FormComponentPage;
  let fixture: ComponentFixture<FormComponentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
