import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFrontComponent } from './register-front.component';

describe('RegisterFrontComponent', () => {
  let component: RegisterFrontComponent;
  let fixture: ComponentFixture<RegisterFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFrontComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
