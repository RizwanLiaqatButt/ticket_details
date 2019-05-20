import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoBandComponent } from './info-band.component';

describe('InfoBandComponent', () => {
  let component: InfoBandComponent;
  let fixture: ComponentFixture<InfoBandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoBandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
