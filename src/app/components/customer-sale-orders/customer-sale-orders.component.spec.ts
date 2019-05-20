import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSaleOrdersComponent } from './customer-sale-orders.component';

describe('CustomerSaleOrdersComponent', () => {
  let component: CustomerSaleOrdersComponent;
  let fixture: ComponentFixture<CustomerSaleOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSaleOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSaleOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
