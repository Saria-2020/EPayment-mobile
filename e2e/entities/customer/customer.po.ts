import { element, by, browser, ElementFinder } from 'protractor';

export class CustomerComponentsPage {
  createButton = element(by.css('ion-fab-button'));
  viewButtons = element.all(by.css('ion-item'));
  title = element.all(by.css('ion-title')).get(2);
  noResult = element(by.cssContainingText('ion-label', 'No Customers found.'));
  entities = element.all(by.css('page-customer ion-item'));

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

export class CustomerUpdatePage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  saveButton = element.all(by.css('ion-button')).get(1);

  phoneNumberInput = element(by.css('ion-input[formControlName="phoneNumber"] input'));
  nationalIdInput = element(by.css('ion-input[formControlName="nationalId"] input'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setPhoneNumberInput(phoneNumber: string): Promise<void> {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }
  async setNationalIdInput(nationalId: string): Promise<void> {
    await this.nationalIdInput.sendKeys(nationalId);
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }
}

export class CustomerDetailPage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  deleteButton = element(by.css('ion-button[color="danger"]'));
  phoneNumberInput = element.all(by.css('span')).get(1);

  nationalIdInput = element.all(by.css('span')).get(2);

  async getPhoneNumberInput(): Promise<string> {
    return await this.phoneNumberInput.getText();
  }

  async getNationalIdInput(): Promise<string> {
    return await this.nationalIdInput.getText();
  }

  async clickOnDeleteButton(): Promise<void> {
    await this.deleteButton.click();
  }

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }
}
