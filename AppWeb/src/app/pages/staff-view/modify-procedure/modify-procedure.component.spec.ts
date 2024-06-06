import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProcedureComponent } from './modify-procedure.component';

describe('ModifyProcedureComponent', () => {
  let component: ModifyProcedureComponent;
  let fixture: ComponentFixture<ModifyProcedureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyProcedureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyProcedureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
