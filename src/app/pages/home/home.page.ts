import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AccountService } from 'src/app/services/auth/account.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Account } from 'src/model/account.model';
import { CustomerService } from '../entities/customer';
import { Invoice, InvoiceService } from '../entities/invoice';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  account: Account;
  invoices: Invoice[] = [];
  constructor(public navController: NavController, private accountService: AccountService, private loginService: LoginService, private customerService: CustomerService, private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.accountService.identity().then((account) => {
      if (account === null) {
        this.goBackToHomePage();
      } else {
        this.account = account;
        this.loadCustomerData(account);
        this.loadInvoices()
      }
    });

  }

  isAuthenticated() {
    return this.accountService.isAuthenticated();
  }

  logout() {
    this.loginService.logout();
    this.goBackToHomePage();
  }


  private goBackToHomePage(): void {
    this.navController.navigateBack('');
  }
  loadCustomerData(account: Account) {
    this.customerService.find(account.id).subscribe(res => {
      localStorage.setItem('customer', JSON.stringify(res.body))
    })

  }
  loadInvoices() {
    this.invoiceService.query({
      "customerId.equals": this.account.id, "paid.equals": false
    }).subscribe(res => {
      this.invoices = res.body
    })
  }
  view(invoice: Invoice) {
    this.navController.navigateForward('/tabs/entities/invoice/' + invoice.id + '/pay');

  }
  trackId(index: number, item: Invoice) {
    return item.id;
  }
}
