import { browser, by, element, ExpectedConditions as ec } from 'protractor';
import { LoginPage } from '../../pages/login.po';
import { CustomerComponentsPage, CustomerDetailPage, CustomerUpdatePage } from './customer.po';

describe('Customer e2e test', () => {
  let loginPage: LoginPage;
  let customerComponentsPage: CustomerComponentsPage;
  let customerUpdatePage: CustomerUpdatePage;
  let customerDetailPage: CustomerDetailPage;
  let initNumberOfEntities: number;
  const COMPONENT_TITLE = 'Customers';
  const SUBCOMPONENT_TITLE = 'Customer';
  let lastElement: any;
  let isVisible = false;

  const phoneNumber = 'phoneNumber';
  const nationalId = 'nationalId';

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

  it('should load Customers', async () => {
    // go to entity component page
    const tabEntities = element(by.css('ion-tab-button[tab="entities"]'));
    await browser.wait(ec.elementToBeClickable(tabEntities), 3000);
    await tabEntities.click();
    await element
      .all(by.css('ion-item'))
      .filter(async (el) => (await el.element(by.css('h2')).getText()) === 'Customer')
      .first()
      .click();

    customerComponentsPage = new CustomerComponentsPage();
    await browser.wait(ec.visibilityOf(customerComponentsPage.title), 5000);
    expect(await customerComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
    await browser.wait(
      ec.or(ec.visibilityOf(customerComponentsPage.entities.get(0)), ec.visibilityOf(customerComponentsPage.noResult)),
      5000
    );
  });

  it('should create Customer', async () => {
    initNumberOfEntities = await customerComponentsPage.getEntitiesNumber();
    await browser.wait(ec.elementToBeClickable(customerComponentsPage.createButton), 5000);
    await customerComponentsPage.clickOnCreateButton();
    customerUpdatePage = new CustomerUpdatePage();
    await browser.wait(ec.visibilityOf(customerUpdatePage.pageTitle), 1000);
    expect(await customerUpdatePage.getPageTitle()).toEqual(SUBCOMPONENT_TITLE);

    await customerUpdatePage.setPhoneNumberInput(phoneNumber);
    await customerUpdatePage.setNationalIdInput(nationalId);

    await customerUpdatePage.save();
    await browser.wait(ec.visibilityOf(customerComponentsPage.title), 1000);
    expect(await customerComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
    expect(await customerComponentsPage.getEntitiesNumber()).toEqual(initNumberOfEntities + 1);
  });

  it('should get the last Customer', async () => {
    customerComponentsPage = new CustomerComponentsPage();
    await browser.wait(ec.visibilityOf(customerComponentsPage.title), 5000);
    lastElement = await customerComponentsPage.viewButtons.last().getWebElement();
  });

  it('should scroll the last Customer', async () => {
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

  it('should view the last Customer', async () => {
    customerDetailPage = new CustomerDetailPage();
    if (isVisible && (await customerDetailPage.pageTitle.isDisplayed())) {
      expect(await customerDetailPage.getPageTitle()).toEqual(SUBCOMPONENT_TITLE);

      expect(await customerDetailPage.getPhoneNumberInput()).toEqual(phoneNumber);

      expect(await customerDetailPage.getNationalIdInput()).toEqual(nationalId);
    }
  });

  it('should delete last Customer', async () => {
    customerDetailPage = new CustomerDetailPage();
    if (isVisible && (await customerDetailPage.deleteButton.isDisplayed())) {
      await browser.executeScript('arguments[0].click()', await customerDetailPage.deleteButton.getWebElement());

      const alertConfirmButton = element.all(by.className('alert-button')).last();

      await browser.wait(ec.elementToBeClickable(alertConfirmButton), 3000);
      alertConfirmButton.click();
      await browser.wait(ec.visibilityOf(customerComponentsPage.title), 3000);
      expect(await customerComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
      expect(await customerComponentsPage.getEntitiesNumber()).toEqual(initNumberOfEntities);
    }
  });

  it('finish Customers tests performing logout', async () => {
    // go to home page
    const tabHome = element(by.css('ion-tab-button[tab="home"]'));
    await browser.wait(ec.elementToBeClickable(tabHome), 3000);
    await tabHome.click();
    await browser.wait(ec.elementToBeClickable(loginPage.logoutButton), 3000);
    await loginPage.logout();
  });
});
