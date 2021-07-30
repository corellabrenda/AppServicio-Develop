import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoPreCargadoComponent } from './proyecto-pre-cargado.component';

describe('ProyectoPreCargadoComponent', () => {
  let component: ProyectoPreCargadoComponent;
  let fixture: ComponentFixture<ProyectoPreCargadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoPreCargadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoPreCargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
