import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTransactionsGridComponent } from './customer-transactions-grid.component';

describe('CustomerTransactionsGridComponent', () => {
  let component: CustomerTransactionsGridComponent;
  let fixture: ComponentFixture<CustomerTransactionsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTransactionsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTransactionsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
