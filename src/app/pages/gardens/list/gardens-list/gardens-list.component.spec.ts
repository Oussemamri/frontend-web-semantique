import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardensListComponent } from './gardens-list.component';

describe('GardensListComponent', () => {
  let component: GardensListComponent;
  let fixture: ComponentFixture<GardensListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GardensListComponent]
    });
    fixture = TestBed.createComponent(GardensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
