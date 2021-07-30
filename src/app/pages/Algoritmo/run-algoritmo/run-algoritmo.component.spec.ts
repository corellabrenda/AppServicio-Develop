import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunAlgoritmoComponent } from './run-algoritmo.component';

describe('RunAlgoritmoComponent', () => {
  let component: RunAlgoritmoComponent;
  let fixture: ComponentFixture<RunAlgoritmoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunAlgoritmoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunAlgoritmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
