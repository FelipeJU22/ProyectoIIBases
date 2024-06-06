import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBedComponent } from './modify-bed.component';

describe('ModifyBedComponent', () => {
  let component: ModifyBedComponent;
  let fixture: ComponentFixture<ModifyBedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyBedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyBedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
