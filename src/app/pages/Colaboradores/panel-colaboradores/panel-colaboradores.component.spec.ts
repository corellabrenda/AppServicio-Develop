import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelColaboradoresComponent } from './panel-colaboradores.component';

describe('PanelColaboradoresComponent', () => {
  let component: PanelColaboradoresComponent;
  let fixture: ComponentFixture<PanelColaboradoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelColaboradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
