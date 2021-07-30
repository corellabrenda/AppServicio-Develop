import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarColaboradoresComponent } from './agregar-colaboradores.component';

describe('AgregarColaboradoresComponent', () => {
  let component: AgregarColaboradoresComponent;
  let fixture: ComponentFixture<AgregarColaboradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarColaboradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
