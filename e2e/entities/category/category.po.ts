import { element, by, browser, ElementFinder } from 'protractor';

export class CategoryComponentsPage {
  createButton = element(by.css('ion-fab-button'));
  viewButtons = element.all(by.css('ion-item'));
  title = element.all(by.css('ion-title')).get(2);
  noResult = element(by.cssContainingText('ion-label', 'No Categories found.'));
  entities = element.all(by.css('page-category ion-item'));

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

export class CategoryUpdatePage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  saveButton = element.all(by.css('ion-button')).get(1);

  nameInput = element(by.css('ion-input[formControlName="name"] input'));
  descriptionInput = element(by.css('ion-textarea[formControlName="description"] textarea'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }
  async setDescriptionInput(description: string): Promise<void> {
    await this.descriptionInput.sendKeys(description);
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }
}

export class CategoryDetailPage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  deleteButton = element(by.css('ion-button[color="danger"]'));
  nameInput = element.all(by.css('span')).get(1);

  descriptionInput = element.all(by.css('span')).get(2);

  async getNameInput(): Promise<string> {
    return await this.nameInput.getText();
  }

  async getDescriptionInput(): Promise<string> {
    return await this.descriptionInput.getText();
  }

  async clickOnDeleteButton(): Promise<void> {
    await this.deleteButton.click();
  }

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }
}
