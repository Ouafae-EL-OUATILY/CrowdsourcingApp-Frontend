import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerAccountComponent } from './freelancer-account.component';

describe('FreelancerAccountComponent', () => {
  let component: FreelancerAccountComponent;
  let fixture: ComponentFixture<FreelancerAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreelancerAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
