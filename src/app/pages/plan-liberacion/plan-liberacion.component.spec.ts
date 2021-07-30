import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanLiberacionComponent } from './plan-liberacion.component';

describe('PlanLiberacionComponent', () => {
  let component: PlanLiberacionComponent;
  let fixture: ComponentFixture<PlanLiberacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanLiberacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanLiberacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
