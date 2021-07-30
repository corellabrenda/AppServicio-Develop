import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisColaboradoresComponent } from './mis-colaboradores.component';

describe('MisColaboradoresComponent', () => {
  let component: MisColaboradoresComponent;
  let fixture: ComponentFixture<MisColaboradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisColaboradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
