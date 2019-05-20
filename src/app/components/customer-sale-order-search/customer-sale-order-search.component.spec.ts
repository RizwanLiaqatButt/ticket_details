import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSaleOrderSearchComponent } from './customer-sale-order-search.component';

describe('CustomerSaleOrderSearchComponent', () => {
  let component: CustomerSaleOrderSearchComponent;
  let fixture: ComponentFixture<CustomerSaleOrderSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSaleOrderSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSaleOrderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
