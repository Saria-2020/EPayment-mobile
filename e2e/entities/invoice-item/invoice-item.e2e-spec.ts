import { browser, by, element, ExpectedConditions as ec } from 'protractor';
import { LoginPage } from '../../pages/login.po';
import { InvoiceItemComponentsPage, InvoiceItemDetailPage, InvoiceItemUpdatePage } from './invoice-item.po';

describe('InvoiceItem e2e test', () => {
  let loginPage: LoginPage;
  let invoiceItemComponentsPage: InvoiceItemComponentsPage;
  let invoiceItemUpdatePage: InvoiceItemUpdatePage;
  let invoiceItemDetailPage: InvoiceItemDetailPage;
  let initNumberOfEntities: number;
  const COMPONENT_TITLE = 'Invoice Items';
  const SUBCOMPONENT_TITLE = 'Invoice Item';
  let lastElement: any;
  let isVisible = false;

  const name = 'name';
  const amount = '10';

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

  it('should load InvoiceItems', async () => {
    // go to entity component page
    const tabEntities = element(by.css('ion-tab-button[tab="entities"]'));
    await browser.wait(ec.elementToBeClickable(tabEntities), 3000);
    await tabEntities.click();
    await element
      .all(by.css('ion-item'))
      .filter(async (el) => (await el.element(by.css('h2')).getText()) === 'InvoiceItem')
      .first()
      .click();

    invoiceItemComponentsPage = new InvoiceItemComponentsPage();
    await browser.wait(ec.visibilityOf(invoiceItemComponentsPage.title), 5000);
    expect(await invoiceItemComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
    await browser.wait(
      ec.or(ec.visibilityOf(invoiceItemComponentsPage.entities.get(0)), ec.visibilityOf(invoiceItemComponentsPage.noResult)),
      5000
    );
  });

  it('should create InvoiceItem', async () => {
    initNumberOfEntities = await invoiceItemComponentsPage.getEntitiesNumber();
    await browser.wait(ec.elementToBeClickable(invoiceItemComponentsPage.createButton), 5000);
    await invoiceItemComponentsPage.clickOnCreateButton();
    invoiceItemUpdatePage = new InvoiceItemUpdatePage();
    await browser.wait(ec.visibilityOf(invoiceItemUpdatePage.pageTitle), 1000);
    expect(await invoiceItemUpdatePage.getPageTitle()).toEqual(SUBCOMPONENT_TITLE);

    await invoiceItemUpdatePage.setNameInput(name);
    await invoiceItemUpdatePage.setAmountInput(amount);

    await invoiceItemUpdatePage.save();
    await browser.wait(ec.visibilityOf(invoiceItemComponentsPage.title), 1000);
    expect(await invoiceItemComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
    expect(await invoiceItemComponentsPage.getEntitiesNumber()).toEqual(initNumberOfEntities + 1);
  });

  it('should get the last InvoiceItem', async () => {
    invoiceItemComponentsPage = new InvoiceItemComponentsPage();
    await browser.wait(ec.visibilityOf(invoiceItemComponentsPage.title), 5000);
    lastElement = await invoiceItemComponentsPage.viewButtons.last().getWebElement();
  });

  it('should scroll the last InvoiceItem', async () => {
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

  it('should view the last InvoiceItem', async () => {
    invoiceItemDetailPage = new InvoiceItemDetailPage();
    if (isVisible && (await invoiceItemDetailPage.pageTitle.isDisplayed())) {
      expect(await invoiceItemDetailPage.getPageTitle()).toEqual(SUBCOMPONENT_TITLE);

      expect(await invoiceItemDetailPage.getNameInput()).toEqual(name);

      expect(await invoiceItemDetailPage.getAmountInput()).toEqual(amount);
    }
  });

  it('should delete last InvoiceItem', async () => {
    invoiceItemDetailPage = new InvoiceItemDetailPage();
    if (isVisible && (await invoiceItemDetailPage.deleteButton.isDisplayed())) {
      await browser.executeScript('arguments[0].click()', await invoiceItemDetailPage.deleteButton.getWebElement());

      const alertConfirmButton = element.all(by.className('alert-button')).last();

      await browser.wait(ec.elementToBeClickable(alertConfirmButton), 3000);
      alertConfirmButton.click();
      await browser.wait(ec.visibilityOf(invoiceItemComponentsPage.title), 3000);
      expect(await invoiceItemComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
      expect(await invoiceItemComponentsPage.getEntitiesNumber()).toEqual(initNumberOfEntities);
    }
  });

  it('finish InvoiceItems tests performing logout', async () => {
    // go to home page
    const tabHome = element(by.css('ion-tab-button[tab="home"]'));
    await browser.wait(ec.elementToBeClickable(tabHome), 3000);
    await tabHome.click();
    await browser.wait(ec.elementToBeClickable(loginPage.logoutButton), 3000);
    await loginPage.logout();
  });
});
