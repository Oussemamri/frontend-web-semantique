import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardensEditComponent } from './gardens-edit.component';

describe('GardensEditComponent', () => {
  let component: GardensEditComponent;
  let fixture: ComponentFixture<GardensEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GardensEditComponent]
    });
    fixture = TestBed.createComponent(GardensEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
