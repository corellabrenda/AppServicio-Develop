import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPlanComponent } from './form-plan.component';

describe('FormPlanComponent', () => {
  let component: FormPlanComponent;
  let fixture: ComponentFixture<FormPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
