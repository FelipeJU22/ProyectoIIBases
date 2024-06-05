import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyMedicalEquipmentComponent } from './modify-medical-equipment.component';

describe('ModifyMedicalEquipmentComponent', () => {
  let component: ModifyMedicalEquipmentComponent;
  let fixture: ComponentFixture<ModifyMedicalEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyMedicalEquipmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyMedicalEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
