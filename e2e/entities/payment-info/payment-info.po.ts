import { element, by, browser, ElementFinder } from 'protractor';

export class PaymentInfoComponentsPage {
  createButton = element(by.css('ion-fab-button'));
  viewButtons = element.all(by.css('ion-item'));
  title = element.all(by.css('ion-title')).get(2);
  noResult = element(by.cssContainingText('ion-label', 'No Payment Infos found.'));
  entities = element.all(by.css('page-payment-info ion-item'));

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

export class PaymentInfoUpdatePage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  saveButton = element.all(by.css('ion-button')).get(1);

  nameInput = element(by.css('ion-input[formControlName="name"] input'));
  accountNumberInput = element(by.css('ion-input[formControlName="accountNumber"] input'));
  cardNumberInput = element(by.css('ion-input[formControlName="cardNumber"] input'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }
  async setAccountNumberInput(accountNumber: string): Promise<void> {
    await this.accountNumberInput.sendKeys(accountNumber);
  }
  async setCardNumberInput(cardNumber: string): Promise<void> {
    await this.cardNumberInput.sendKeys(cardNumber);
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }
}

export class PaymentInfoDetailPage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  deleteButton = element(by.css('ion-button[color="danger"]'));
  nameInput = element.all(by.css('span')).get(1);

  accountNumberInput = element.all(by.css('span')).get(2);

  cardNumberInput = element.all(by.css('span')).get(3);

  async getNameInput(): Promise<string> {
    return await this.nameInput.getText();
  }

  async getAccountNumberInput(): Promise<string> {
    return await this.accountNumberInput.getText();
  }

  async getCardNumberInput(): Promise<string> {
    return await this.cardNumberInput.getText();
  }

  async clickOnDeleteButton(): Promise<void> {
    await this.deleteButton.click();
  }

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }
}
