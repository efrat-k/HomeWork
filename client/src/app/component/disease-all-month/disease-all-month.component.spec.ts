import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseAllMonthComponent } from './disease-all-month.component';

describe('DiseaseAllMonthComponent', () => {
  let component: DiseaseAllMonthComponent;
  let fixture: ComponentFixture<DiseaseAllMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiseaseAllMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiseaseAllMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
