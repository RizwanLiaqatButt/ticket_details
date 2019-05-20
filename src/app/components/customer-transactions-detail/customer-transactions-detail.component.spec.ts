import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTransactionsDetailComponent } from './customer-transactions-detail.component';

describe('CustomerTransactionsDetailComponent', () => {
  let component: CustomerTransactionsDetailComponent;
  let fixture: ComponentFixture<CustomerTransactionsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTransactionsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTransactionsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
