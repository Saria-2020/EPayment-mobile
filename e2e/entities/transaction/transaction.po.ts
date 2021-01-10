import { element, by, browser, ElementFinder } from 'protractor';

export class TransactionComponentsPage {
  createButton = element(by.css('ion-fab-button'));
  viewButtons = element.all(by.css('ion-item'));
  title = element.all(by.css('ion-title')).get(2);
  noResult = element(by.cssContainingText('ion-label', 'No Transactions found.'));
  entities = element.all(by.css('page-transaction ion-item'));

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

export class TransactionUpdatePage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  saveButton = element.all(by.css('ion-button')).get(1);

  nameInput = element(by.css('ion-input[formControlName="name"] input'));
  uuidInput = element(by.css('ion-input[formControlName="uuid"] input'));
  amountInput = element(by.css('ion-input[formControlName="amount"] input'));
  paymentDetailsInput = element(by.css('ion-input[formControlName="paymentDetails"] input'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }
  async setUuidInput(uuid: string): Promise<void> {
    await this.uuidInput.sendKeys(uuid);
  }
  async setAmountInput(amount: string): Promise<void> {
    await this.amountInput.sendKeys(amount);
  }
  async setPaymentDetailsInput(paymentDetails: string): Promise<void> {
    await this.paymentDetailsInput.sendKeys(paymentDetails);
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }
}

export class TransactionDetailPage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  deleteButton = element(by.css('ion-button[color="danger"]'));
  nameInput = element.all(by.css('span')).get(1);

  uuidInput = element.all(by.css('span')).get(2);

  amountInput = element.all(by.css('span')).get(3);

  paymentDetailsInput = element.all(by.css('span')).get(5);

  async getNameInput(): Promise<string> {
    return await this.nameInput.getText();
  }

  async getUuidInput(): Promise<string> {
    return await this.uuidInput.getText();
  }

  async getAmountInput(): Promise<string> {
    return await this.amountInput.getText();
  }

  async getPaymentDetailsInput(): Promise<string> {
    return await this.paymentDetailsInput.getText();
  }

  async clickOnDeleteButton(): Promise<void> {
    await this.deleteButton.click();
  }

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }
}
