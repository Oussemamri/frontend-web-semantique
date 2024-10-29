import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertlistComponent } from './expertlist.component';

describe('ExpertlistComponent', () => {
  let component: ExpertlistComponent;
  let fixture: ComponentFixture<ExpertlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertlistComponent]
    });
    fixture = TestBed.createComponent(ExpertlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
