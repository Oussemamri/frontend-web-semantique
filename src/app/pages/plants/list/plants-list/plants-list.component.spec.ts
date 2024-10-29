import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantsListComponent } from './plants-list.component';

describe('PlantsListComponent', () => {
  let component: PlantsListComponent;
  let fixture: ComponentFixture<PlantsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantsListComponent]
    });
    fixture = TestBed.createComponent(PlantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
