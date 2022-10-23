import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiseasComponent } from './add-diseas.component';

describe('AddDiseasComponent', () => {
  let component: AddDiseasComponent;
  let fixture: ComponentFixture<AddDiseasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDiseasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDiseasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
