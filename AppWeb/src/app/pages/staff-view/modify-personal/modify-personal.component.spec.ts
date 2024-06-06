import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPersonalComponent } from './modify-personal.component';

describe('ModifyPersonalComponent', () => {
  let component: ModifyPersonalComponent;
  let fixture: ComponentFixture<ModifyPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyPersonalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
