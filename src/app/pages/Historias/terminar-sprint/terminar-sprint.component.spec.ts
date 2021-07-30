import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminarSprintComponent } from './terminar-sprint.component';

describe('TerminarSprintComponent', () => {
  let component: TerminarSprintComponent;
  let fixture: ComponentFixture<TerminarSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminarSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminarSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
