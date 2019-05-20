import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTransactionsInformationComponent } from './customer-transactions-information.component';

describe('CustomerTransactionsInformationComponent', () => {
  let component: CustomerTransactionsInformationComponent;
  let fixture: ComponentFixture<CustomerTransactionsInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTransactionsInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTransactionsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
