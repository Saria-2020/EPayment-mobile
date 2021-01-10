import { element, by, browser, ElementFinder } from 'protractor';

export class ActivityInformationComponentsPage {
  createButton = element(by.css('ion-fab-button'));
  viewButtons = element.all(by.css('ion-item'));
  title = element.all(by.css('ion-title')).get(2);
  noResult = element(by.cssContainingText('ion-label', 'No Activity Informations found.'));
  entities = element.all(by.css('page-activity-information ion-item'));

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

export class ActivityInformationUpdatePage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  saveButton = element.all(by.css('ion-button')).get(1);

  nameInput = element(by.css('ion-input[formControlName="name"] input'));
  sectorInput = element(by.css('ion-input[formControlName="sector"] input'));
  typeOfActivityInput = element(by.css('ion-input[formControlName="typeOfActivity"] input'));
  propertyTypeInput = element(by.css('ion-input[formControlName="propertyType"] input'));
  areaClassInput = element(by.css('ion-input[formControlName="areaClass"] input'));
  architectureTypeInput = element(by.css('ion-input[formControlName="architectureType"] input'));
  numberOfFloorsInput = element(by.css('ion-input[formControlName="numberOfFloors"] input'));
  featuresInput = element(by.css('ion-input[formControlName="features"] input'));
  descriptionOfTheFeaturesInput = element(by.css('ion-textarea[formControlName="descriptionOfTheFeatures"] textarea'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setNameInput(name: string): Promise<void> {
    await this.nameInput.sendKeys(name);
  }
  async setSectorInput(sector: string): Promise<void> {
    await this.sectorInput.sendKeys(sector);
  }
  async setTypeOfActivityInput(typeOfActivity: string): Promise<void> {
    await this.typeOfActivityInput.sendKeys(typeOfActivity);
  }
  async setPropertyTypeInput(propertyType: string): Promise<void> {
    await this.propertyTypeInput.sendKeys(propertyType);
  }
  async setAreaClassInput(areaClass: string): Promise<void> {
    await this.areaClassInput.sendKeys(areaClass);
  }
  async setArchitectureTypeInput(architectureType: string): Promise<void> {
    await this.architectureTypeInput.sendKeys(architectureType);
  }
  async setNumberOfFloorsInput(numberOfFloors: string): Promise<void> {
    await this.numberOfFloorsInput.sendKeys(numberOfFloors);
  }
  async setFeaturesInput(features: string): Promise<void> {
    await this.featuresInput.sendKeys(features);
  }
  async setDescriptionOfTheFeaturesInput(descriptionOfTheFeatures: string): Promise<void> {
    await this.descriptionOfTheFeaturesInput.sendKeys(descriptionOfTheFeatures);
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }
}

export class ActivityInformationDetailPage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  deleteButton = element(by.css('ion-button[color="danger"]'));
  nameInput = element.all(by.css('span')).get(1);

  sectorInput = element.all(by.css('span')).get(2);

  typeOfActivityInput = element.all(by.css('span')).get(3);

  propertyTypeInput = element.all(by.css('span')).get(4);

  areaClassInput = element.all(by.css('span')).get(5);

  architectureTypeInput = element.all(by.css('span')).get(6);

  numberOfFloorsInput = element.all(by.css('span')).get(7);

  featuresInput = element.all(by.css('span')).get(8);

  descriptionOfTheFeaturesInput = element.all(by.css('span')).get(9);

  async getNameInput(): Promise<string> {
    return await this.nameInput.getText();
  }

  async getSectorInput(): Promise<string> {
    return await this.sectorInput.getText();
  }

  async getTypeOfActivityInput(): Promise<string> {
    return await this.typeOfActivityInput.getText();
  }

  async getPropertyTypeInput(): Promise<string> {
    return await this.propertyTypeInput.getText();
  }

  async getAreaClassInput(): Promise<string> {
    return await this.areaClassInput.getText();
  }

  async getArchitectureTypeInput(): Promise<string> {
    return await this.architectureTypeInput.getText();
  }

  async getNumberOfFloorsInput(): Promise<string> {
    return await this.numberOfFloorsInput.getText();
  }

  async getFeaturesInput(): Promise<string> {
    return await this.featuresInput.getText();
  }

  async getDescriptionOfTheFeaturesInput(): Promise<string> {
    return await this.descriptionOfTheFeaturesInput.getText();
  }

  async clickOnDeleteButton(): Promise<void> {
    await this.deleteButton.click();
  }

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }
}
