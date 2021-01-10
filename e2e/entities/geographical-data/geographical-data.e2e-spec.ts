import { browser, by, element, ExpectedConditions as ec } from 'protractor';
import { LoginPage } from '../../pages/login.po';
import { GeographicalDataComponentsPage, GeographicalDataDetailPage, GeographicalDataUpdatePage } from './geographical-data.po';

describe('GeographicalData e2e test', () => {
  let loginPage: LoginPage;
  let geographicalDataComponentsPage: GeographicalDataComponentsPage;
  let geographicalDataUpdatePage: GeographicalDataUpdatePage;
  let geographicalDataDetailPage: GeographicalDataDetailPage;
  let initNumberOfEntities: number;
  const COMPONENT_TITLE = 'Geographical Data';
  const SUBCOMPONENT_TITLE = 'Geographical Data';
  let lastElement: any;
  let isVisible = false;

  const state = 'state';
  const units = 'units';
  const district = 'district';
  const square = 'square';
  const realEstateNumber = 'realEstateNumber';
  const activityNumber = 'activityNumber';
  const areaOfTheRealEstate = 'areaOfTheRealEstate';

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

  it('should load GeographicalData', async () => {
    // go to entity component page
    const tabEntities = element(by.css('ion-tab-button[tab="entities"]'));
    await browser.wait(ec.elementToBeClickable(tabEntities), 3000);
    await tabEntities.click();
    await element
      .all(by.css('ion-item'))
      .filter(async (el) => (await el.element(by.css('h2')).getText()) === 'GeographicalData')
      .first()
      .click();

    geographicalDataComponentsPage = new GeographicalDataComponentsPage();
    await browser.wait(ec.visibilityOf(geographicalDataComponentsPage.title), 5000);
    expect(await geographicalDataComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
    await browser.wait(
      ec.or(ec.visibilityOf(geographicalDataComponentsPage.entities.get(0)), ec.visibilityOf(geographicalDataComponentsPage.noResult)),
      5000
    );
  });

  it('should create GeographicalData', async () => {
    initNumberOfEntities = await geographicalDataComponentsPage.getEntitiesNumber();
    await browser.wait(ec.elementToBeClickable(geographicalDataComponentsPage.createButton), 5000);
    await geographicalDataComponentsPage.clickOnCreateButton();
    geographicalDataUpdatePage = new GeographicalDataUpdatePage();
    await browser.wait(ec.visibilityOf(geographicalDataUpdatePage.pageTitle), 1000);
    expect(await geographicalDataUpdatePage.getPageTitle()).toEqual(SUBCOMPONENT_TITLE);

    await geographicalDataUpdatePage.setStateInput(state);
    await geographicalDataUpdatePage.setUnitsInput(units);
    await geographicalDataUpdatePage.setDistrictInput(district);
    await geographicalDataUpdatePage.setSquareInput(square);
    await geographicalDataUpdatePage.setRealEstateNumberInput(realEstateNumber);
    await geographicalDataUpdatePage.setActivityNumberInput(activityNumber);
    await geographicalDataUpdatePage.setAreaOfTheRealEstateInput(areaOfTheRealEstate);

    await geographicalDataUpdatePage.save();
    await browser.wait(ec.visibilityOf(geographicalDataComponentsPage.title), 1000);
    expect(await geographicalDataComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
    expect(await geographicalDataComponentsPage.getEntitiesNumber()).toEqual(initNumberOfEntities + 1);
  });

  it('should get the last GeographicalData', async () => {
    geographicalDataComponentsPage = new GeographicalDataComponentsPage();
    await browser.wait(ec.visibilityOf(geographicalDataComponentsPage.title), 5000);
    lastElement = await geographicalDataComponentsPage.viewButtons.last().getWebElement();
  });

  it('should scroll the last GeographicalData', async () => {
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

  it('should view the last GeographicalData', async () => {
    geographicalDataDetailPage = new GeographicalDataDetailPage();
    if (isVisible && (await geographicalDataDetailPage.pageTitle.isDisplayed())) {
      expect(await geographicalDataDetailPage.getPageTitle()).toEqual(SUBCOMPONENT_TITLE);

      expect(await geographicalDataDetailPage.getStateInput()).toEqual(state);

      expect(await geographicalDataDetailPage.getUnitsInput()).toEqual(units);

      expect(await geographicalDataDetailPage.getDistrictInput()).toEqual(district);

      expect(await geographicalDataDetailPage.getSquareInput()).toEqual(square);

      expect(await geographicalDataDetailPage.getRealEstateNumberInput()).toEqual(realEstateNumber);

      expect(await geographicalDataDetailPage.getActivityNumberInput()).toEqual(activityNumber);

      expect(await geographicalDataDetailPage.getAreaOfTheRealEstateInput()).toEqual(areaOfTheRealEstate);
    }
  });

  it('should delete last GeographicalData', async () => {
    geographicalDataDetailPage = new GeographicalDataDetailPage();
    if (isVisible && (await geographicalDataDetailPage.deleteButton.isDisplayed())) {
      await browser.executeScript('arguments[0].click()', await geographicalDataDetailPage.deleteButton.getWebElement());

      const alertConfirmButton = element.all(by.className('alert-button')).last();

      await browser.wait(ec.elementToBeClickable(alertConfirmButton), 3000);
      alertConfirmButton.click();
      await browser.wait(ec.visibilityOf(geographicalDataComponentsPage.title), 3000);
      expect(await geographicalDataComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
      expect(await geographicalDataComponentsPage.getEntitiesNumber()).toEqual(initNumberOfEntities);
    }
  });

  it('finish GeographicalData tests performing logout', async () => {
    // go to home page
    const tabHome = element(by.css('ion-tab-button[tab="home"]'));
    await browser.wait(ec.elementToBeClickable(tabHome), 3000);
    await tabHome.click();
    await browser.wait(ec.elementToBeClickable(loginPage.logoutButton), 3000);
    await loginPage.logout();
  });
});
