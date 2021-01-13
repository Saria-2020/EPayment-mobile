import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Transaction } from '../transaction.model';

@Component({
  selector: 'app-invoice-transaction',
  templateUrl: './invoice-transaction.component.html',
  styleUrls: ['./invoice-transaction.component.css']
})
export class InvoiceTransactionComponent implements OnInit {
  transaction: Transaction
  transactionInfo: Array<{ title: string; value: string }> = [];


  constructor(protected activatedRoute: ActivatedRoute,
    protected navController: NavController) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response) => {
      this.transaction = response.data;

      this.parsePaymentInfo();

    })
  }

  parsePaymentInfo() {
    if (this.transaction.invoice) {
      this.transaction.invoice.customer = null
      this.transaction.invoice.transaction = null
      const obj = this.transaction.invoice;
      Object.keys(obj).forEach((key, index) => {
        if (obj[key]) {
          this.transactionInfo.push({ title: key, value: obj[key] })
        }
      });
    }
  }
  goHome() {
    this.navController.navigateForward(['tabs/home'])


  }
}
