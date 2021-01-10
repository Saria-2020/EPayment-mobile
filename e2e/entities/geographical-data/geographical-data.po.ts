import { element, by, browser, ElementFinder } from 'protractor';

export class GeographicalDataComponentsPage {
  createButton = element(by.css('ion-fab-button'));
  viewButtons = element.all(by.css('ion-item'));
  title = element.all(by.css('ion-title')).get(2);
  noResult = element(by.cssContainingText('ion-label', 'No Geographical Data found.'));
  entities = element.all(by.css('page-geographical-data ion-item'));

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

export class GeographicalDataUpdatePage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  saveButton = element.all(by.css('ion-button')).get(1);

  stateInput = element(by.css('ion-input[formControlName="state"] input'));
  unitsInput = element(by.css('ion-input[formControlName="units"] input'));
  districtInput = element(by.css('ion-input[formControlName="district"] input'));
  squareInput = element(by.css('ion-input[formControlName="square"] input'));
  realEstateNumberInput = element(by.css('ion-input[formControlName="realEstateNumber"] input'));
  activityNumberInput = element(by.css('ion-input[formControlName="activityNumber"] input'));
  areaOfTheRealEstateInput = element(by.css('ion-input[formControlName="areaOfTheRealEstate"] input'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }

  async setStateInput(state: string): Promise<void> {
    await this.stateInput.sendKeys(state);
  }
  async setUnitsInput(units: string): Promise<void> {
    await this.unitsInput.sendKeys(units);
  }
  async setDistrictInput(district: string): Promise<void> {
    await this.districtInput.sendKeys(district);
  }
  async setSquareInput(square: string): Promise<void> {
    await this.squareInput.sendKeys(square);
  }
  async setRealEstateNumberInput(realEstateNumber: string): Promise<void> {
    await this.realEstateNumberInput.sendKeys(realEstateNumber);
  }
  async setActivityNumberInput(activityNumber: string): Promise<void> {
    await this.activityNumberInput.sendKeys(activityNumber);
  }
  async setAreaOfTheRealEstateInput(areaOfTheRealEstate: string): Promise<void> {
    await this.areaOfTheRealEstateInput.sendKeys(areaOfTheRealEstate);
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }
}

export class GeographicalDataDetailPage {
  pageTitle = element.all(by.css('ion-title')).get(3);
  deleteButton = element(by.css('ion-button[color="danger"]'));
  stateInput = element.all(by.css('span')).get(1);

  unitsInput = element.all(by.css('span')).get(2);

  districtInput = element.all(by.css('span')).get(3);

  squareInput = element.all(by.css('span')).get(4);

  realEstateNumberInput = element.all(by.css('span')).get(5);

  activityNumberInput = element.all(by.css('span')).get(6);

  areaOfTheRealEstateInput = element.all(by.css('span')).get(7);

  async getStateInput(): Promise<string> {
    return await this.stateInput.getText();
  }

  async getUnitsInput(): Promise<string> {
    return await this.unitsInput.getText();
  }

  async getDistrictInput(): Promise<string> {
    return await this.districtInput.getText();
  }

  async getSquareInput(): Promise<string> {
    return await this.squareInput.getText();
  }

  async getRealEstateNumberInput(): Promise<string> {
    return await this.realEstateNumberInput.getText();
  }

  async getActivityNumberInput(): Promise<string> {
    return await this.activityNumberInput.getText();
  }

  async getAreaOfTheRealEstateInput(): Promise<string> {
    return await this.areaOfTheRealEstateInput.getText();
  }

  async clickOnDeleteButton(): Promise<void> {
    await this.deleteButton.click();
  }

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getText();
  }
}
