import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeatilsComponent } from './view-deatils.component';

describe('ViewDeatilsComponent', () => {
  let component: ViewDeatilsComponent;
  let fixture: ComponentFixture<ViewDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDeatilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
