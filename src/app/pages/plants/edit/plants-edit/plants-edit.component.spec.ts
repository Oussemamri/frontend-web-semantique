import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsEditComponent } from './plants-edit.component';

describe('PlantsEditComponent', () => {
  let component: PlantsEditComponent;
  let fixture: ComponentFixture<PlantsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantsEditComponent]
    });
    fixture = TestBed.createComponent(PlantsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
