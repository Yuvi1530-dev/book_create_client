import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SitLayoutComponent } from './sit-layout.component';

describe('SitLayoutComponent', () => {
  let component: SitLayoutComponent;
  let fixture: ComponentFixture<SitLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SitLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SitLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
