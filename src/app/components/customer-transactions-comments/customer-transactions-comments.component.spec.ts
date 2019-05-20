import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTransactionsCommentsComponent } from './customer-transactions-comments.component';

describe('CustomerTransactionsCommentsComponent', () => {
  let component: CustomerTransactionsCommentsComponent;
  let fixture: ComponentFixture<CustomerTransactionsCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTransactionsCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTransactionsCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
