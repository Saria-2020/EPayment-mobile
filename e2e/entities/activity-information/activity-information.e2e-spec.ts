import { browser, by, element, ExpectedConditions as ec } from 'protractor';
import { LoginPage } from '../../pages/login.po';
import { ActivityInformationComponentsPage, ActivityInformationDetailPage, ActivityInformationUpdatePage } from './activity-information.po';

describe('ActivityInformation e2e test', () => {
  let loginPage: LoginPage;
  let activityInformationComponentsPage: ActivityInformationComponentsPage;
  let activityInformationUpdatePage: ActivityInformationUpdatePage;
  let activityInformationDetailPage: ActivityInformationDetailPage;
  let initNumberOfEntities: number;
  const COMPONENT_TITLE = 'Activity Informations';
  const SUBCOMPONENT_TITLE = 'Activity Information';
  let lastElement: any;
  let isVisible = false;

  const name = 'name';
  const sector = 'sector';
  const typeOfActivity = 'typeOfActivity';
  const propertyType = 'propertyType';
  const areaClass = 'areaClass';
  const architectureType = 'architectureType';
  const numberOfFloors = 'numberOfFloors';
  const features = 'features';
  const descriptionOfTheFeatures = 'descriptionOfTheFeatures';

  beforeAll(async () => {
    loginPage = new LoginPage();
    await loginPage.navigateTo('/');
    await loginPage.signInButton.click();
    const username = process.env.E2E_USERNAME || 'admin';
    const password = process.env.E2E_PASSWORD || 'admin';
    await browser.wait(ec.elementToBeClickable(loginPage.loginButton), 3000);
    await loginPage.login(username, password);
    await browser.wait(ec.visibilityOf(loginPage.logoutButton), 1000);
  });

  it('should load ActivityInformations', async () => {
    // go to entity component page
    const tabEntities = element(by.css('ion-tab-button[tab="entities"]'));
    await browser.wait(ec.elementToBeClickable(tabEntities), 3000);
    await tabEntities.click();
    await element
      .all(by.css('ion-item'))
      .filter(async (el) => (await el.element(by.css('h2')).getText()) === 'ActivityInformation')
      .first()
      .click();

    activityInformationComponentsPage = new ActivityInformationComponentsPage();
    await browser.wait(ec.visibilityOf(activityInformationComponentsPage.title), 5000);
    expect(await activityInformationComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
    await browser.wait(
      ec.or(
        ec.visibilityOf(activityInformationComponentsPage.entities.get(0)),
        ec.visibilityOf(activityInformationComponentsPage.noResult)
      ),
      5000
    );
  });

  it('should create ActivityInformation', async () => {
    initNumberOfEntities = await activityInformationComponentsPage.getEntitiesNumber();
    await browser.wait(ec.elementToBeClickable(activityInformationComponentsPage.createButton), 5000);
    await activityInformationComponentsPage.clickOnCreateButton();
    activityInformationUpdatePage = new ActivityInformationUpdatePage();
    await browser.wait(ec.visibilityOf(activityInformationUpdatePage.pageTitle), 1000);
    expect(await activityInformationUpdatePage.getPageTitle()).toEqual(SUBCOMPONENT_TITLE);

    await activityInformationUpdatePage.setNameInput(name);
    await activityInformationUpdatePage.setSectorInput(sector);
    await activityInformationUpdatePage.setTypeOfActivityInput(typeOfActivity);
    await activityInformationUpdatePage.setPropertyTypeInput(propertyType);
    await activityInformationUpdatePage.setAreaClassInput(areaClass);
    await activityInformationUpdatePage.setArchitectureTypeInput(architectureType);
    await activityInformationUpdatePage.setNumberOfFloorsInput(numberOfFloors);
    await activityInformationUpdatePage.setFeaturesInput(features);
    await activityInformationUpdatePage.setDescriptionOfTheFeaturesInput(descriptionOfTheFeatures);

    await activityInformationUpdatePage.save();
    await browser.wait(ec.visibilityOf(activityInformationComponentsPage.title), 1000);
    expect(await activityInformationComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
    expect(await activityInformationComponentsPage.getEntitiesNumber()).toEqual(initNumberOfEntities + 1);
  });

  it('should get the last ActivityInformation', async () => {
    activityInformationComponentsPage = new ActivityInformationComponentsPage();
    await browser.wait(ec.visibilityOf(activityInformationComponentsPage.title), 5000);
    lastElement = await activityInformationComponentsPage.viewButtons.last().getWebElement();
  });

  it('should scroll the last ActivityInformation', async () => {
    browser
      .executeScript('arguments[0].scrollIntoView()', lastElement)
      .then(async () => {
        if ((await lastElement.isEnabled()) && (await lastElement.isDisplayed())) {
          browser
            .executeScript('arguments[0].click()', lastElement)
            .then(async () => {
              isVisible = true;
            })
            .catch();
        }
      })
      .catch();
  });

  it('should view the last ActivityInformation', async () => {
    activityInformationDetailPage = new ActivityInformationDetailPage();
    if (isVisible && (await activityInformationDetailPage.pageTitle.isDisplayed())) {
      expect(await activityInformationDetailPage.getPageTitle()).toEqual(SUBCOMPONENT_TITLE);

      expect(await activityInformationDetailPage.getNameInput()).toEqual(name);

      expect(await activityInformationDetailPage.getSectorInput()).toEqual(sector);

      expect(await activityInformationDetailPage.getTypeOfActivityInput()).toEqual(typeOfActivity);

      expect(await activityInformationDetailPage.getPropertyTypeInput()).toEqual(propertyType);

      expect(await activityInformationDetailPage.getAreaClassInput()).toEqual(areaClass);

      expect(await activityInformationDetailPage.getArchitectureTypeInput()).toEqual(architectureType);

      expect(await activityInformationDetailPage.getNumberOfFloorsInput()).toEqual(numberOfFloors);

      expect(await activityInformationDetailPage.getFeaturesInput()).toEqual(features);

      expect(await activityInformationDetailPage.getDescriptionOfTheFeaturesInput()).toEqual(descriptionOfTheFeatures);
    }
  });

  it('should delete last ActivityInformation', async () => {
    activityInformationDetailPage = new ActivityInformationDetailPage();
    if (isVisible && (await activityInformationDetailPage.deleteButton.isDisplayed())) {
      await browser.executeScript('arguments[0].click()', await activityInformationDetailPage.deleteButton.getWebElement());

      const alertConfirmButton = element.all(by.className('alert-button')).last();

      await browser.wait(ec.elementToBeClickable(alertConfirmButton), 3000);
      alertConfirmButton.click();
      await browser.wait(ec.visibilityOf(activityInformationComponentsPage.title), 3000);
      expect(await activityInformationComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
      expect(await activityInformationComponentsPage.getEntitiesNumber()).toEqual(initNumberOfEntities);
    }
  });

  it('finish ActivityInformations tests performing logout', async () => {
    // go to home page
    const tabHome = element(by.css('ion-tab-button[tab="home"]'));
    await browser.wait(ec.elementToBeClickable(tabHome), 3000);
    await tabHome.click();
    await browser.wait(ec.elementToBeClickable(loginPage.logoutButton), 3000);
    await loginPage.logout();
  });
});
