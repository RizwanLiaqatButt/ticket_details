import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCodeDetailComponent } from './company-code-detail.component';

describe('CompanyCodeDetailComponent', () => {
  let component: CompanyCodeDetailComponent;
  let fixture: ComponentFixture<CompanyCodeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyCodeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyCodeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
