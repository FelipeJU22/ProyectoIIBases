import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyInstanceComponent } from './modify-instance.component';

describe('ModifyInstanceComponent', () => {
  let component: ModifyInstanceComponent;
  let fixture: ComponentFixture<ModifyInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyInstanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
