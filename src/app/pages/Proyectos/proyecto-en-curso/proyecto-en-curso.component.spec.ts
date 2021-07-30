import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoEnCursoComponent } from './proyecto-en-curso.component';

describe('ProyectoEnCursoComponent', () => {
  let component: ProyectoEnCursoComponent;
  let fixture: ComponentFixture<ProyectoEnCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoEnCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoEnCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
