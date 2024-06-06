import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMedicalEquipmentComponent } from './new-medical-equipment.component';

describe('NewMedicalEquipmentComponent', () => {
  let component: NewMedicalEquipmentComponent;
  let fixture: ComponentFixture<NewMedicalEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMedicalEquipmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewMedicalEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
