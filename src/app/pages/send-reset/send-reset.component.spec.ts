import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendResetComponent } from './send-reset.component';

describe('SendResetComponent', () => {
  let component: SendResetComponent;
  let fixture: ComponentFixture<SendResetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendResetComponent]
    });
    fixture = TestBed.createComponent(SendResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
