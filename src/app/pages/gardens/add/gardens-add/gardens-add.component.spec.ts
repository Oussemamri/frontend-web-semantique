import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GardensAddComponent } from './gardens-add.component';

describe('GardensAddComponent', () => {
  let component: GardensAddComponent;
  let fixture: ComponentFixture<GardensAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GardensAddComponent]
    });
    fixture = TestBed.createComponent(GardensAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
