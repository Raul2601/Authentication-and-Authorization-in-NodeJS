import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPermissionsComponent } from './view-permissions.component';

describe('ViewPermissionsComponent', () => {
  let component: ViewPermissionsComponent;
  let fixture: ComponentFixture<ViewPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPermissionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
