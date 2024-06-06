import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePersonalComponent } from './delete-personal.component';

describe('DeletePersonalComponent', () => {
  let component: DeletePersonalComponent;
  let fixture: ComponentFixture<DeletePersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletePersonalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletePersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
