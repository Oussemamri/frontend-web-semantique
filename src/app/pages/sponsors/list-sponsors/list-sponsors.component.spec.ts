import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSponsorsComponent } from './list-sponsors.component';

describe('ListSponsorsComponent', () => {
  let component: ListSponsorsComponent;
  let fixture: ComponentFixture<ListSponsorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSponsorsComponent]
    });
    fixture = TestBed.createComponent(ListSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
