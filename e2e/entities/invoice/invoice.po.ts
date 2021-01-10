import { element, by, browser, ElementFinder } from 'protractor';

export class InvoiceComponentsPage {
  createButton = element(by.css('ion-fab-button'));
  viewButtons = element.all(by.css('ion-item'));
  title = element.all(by.css('ion-title')).get(2);
  noResult = element(by.cssContainingText('ion-label', 'No Invoices found.'));
  entities = element.all(by.css('page-invoice ion-item'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastViewButton(): Promise<void> {
    await this.viewButtons.last().click();
  }

  async getTitle(): Promise<string> {
    return this.title.getText();
  }

  async getEntitiesNumber(): Promise<number> {
    return await this.entities.count();
  }
}

export class InvoiceUpdatePage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  saveButton = element.all(by.css('ion-button')).get(1);

  invoiceNumberInput = element(by.css('ion-input[formControlName="invoiceNumber"] input'));
  verificationNumberInput = element(by.css('ion-input[formControlName="verificationNumber"] input'));
  unitNameInput = element(by.css('ion-input[formControlName="unitName"] input'));
  totalAmountInput = element(by.css('ion-input[formControlName="totalAmount"] input'));
  amountPaidInput = element(by.css('ion-input[formControlName="amountPaid"] input'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setInvoiceNumberInput(invoiceNumber: string): Promise<void> {
    await this.invoiceNumberInput.sendKeys(invoiceNumber);
  }
  async setVerificationNumberInput(verificationNumber: string): Promise<void> {
    await this.verificationNumberInput.sendKeys(verificationNumber);
  }
  async setUnitNameInput(unitName: string): Promise<void> {
    await this.unitNameInput.sendKeys(unitName);
  }
  async setTotalAmountInput(totalAmount: string): Promise<void> {
    await this.totalAmountInput.sendKeys(totalAmount);
  }
  async setAmountPaidInput(amountPaid: string): Promise<void> {
    await this.amountPaidInput.sendKeys(amountPaid);
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }
}

export class InvoiceDetailPage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  deleteButton = element(by.css('ion-button[color="danger"]'));
  invoiceNumberInput = element.all(by.css('span')).get(1);

  verificationNumberInput = element.all(by.css('span')).get(3);

  unitNameInput = element.all(by.css('span')).get(4);

  totalAmountInput = element.all(by.css('span')).get(5);

  amountPaidInput = element.all(by.css('span')).get(6);

  async getInvoiceNumberInput(): Promise<string> {
    return await this.invoiceNumberInput.getText();
  }

  async getVerificationNumberInput(): Promise<string> {
    return await this.verificationNumberInput.getText();
  }

  async getUnitNameInput(): Promise<string> {
    return await this.unitNameInput.getText();
  }

  async getTotalAmountInput(): Promise<string> {
    return await this.totalAmountInput.getText();
  }

  async getAmountPaidInput(): Promise<string> {
    return await this.amountPaidInput.getText();
  }

  async clickOnDeleteButton(): Promise<void> {
    await this.deleteButton.click();
  }

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }
}
