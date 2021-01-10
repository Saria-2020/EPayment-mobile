import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-entities',
  templateUrl: 'entities.page.html',
  styleUrls: ['entities.page.scss'],
})
export class EntitiesPage {
  entities: Array<any> = [
    { name: 'Invoice', component: 'InvoicePage', route: 'invoice' },
    // { name: 'GeographicalData', component: 'GeographicalDataPage', route: 'geographical-data' },
    // { name: 'ActivityInformation', component: 'ActivityInformationPage', route: 'activity-information' },
    { name: 'PaymentInfo', component: 'PaymentInfoPage', route: 'payment-info' },
    { name: 'Transaction', component: 'TransactionPage', route: 'transaction' },
    /* jhipster-needle-add-entity-page - JHipster will add entity pages here */
  ];

  constructor(public navController: NavController) { }

  openPage(page) {
    this.navController.navigateForward('/tabs/entities/' + page.route);
  }
}
