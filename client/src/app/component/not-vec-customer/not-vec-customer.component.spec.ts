import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotVecCustomerComponent } from './not-vec-customer.component';

describe('NotVecCustomerComponent', () => {
  let component: NotVecCustomerComponent;
  let fixture: ComponentFixture<NotVecCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotVecCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotVecCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
