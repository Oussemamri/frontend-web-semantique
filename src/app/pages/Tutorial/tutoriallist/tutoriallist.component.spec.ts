import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutoriallistComponent } from './tutoriallist.component';

describe('TutoriallistComponent', () => {
  let component: TutoriallistComponent;
  let fixture: ComponentFixture<TutoriallistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TutoriallistComponent]
    });
    fixture = TestBed.createComponent(TutoriallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
