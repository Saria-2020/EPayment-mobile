import { browser, by, element, ExpectedConditions as ec } from 'protractor';
import { LoginPage } from '../../pages/login.po';
import { InvoiceComponentsPage, InvoiceDetailPage, InvoiceUpdatePage } from './invoice.po';

describe('Invoice e2e test', () => {
  let loginPage: LoginPage;
  let invoiceComponentsPage: InvoiceComponentsPage;
  let invoiceUpdatePage: InvoiceUpdatePage;
  let invoiceDetailPage: InvoiceDetailPage;
  let initNumberOfEntities: number;
  const COMPONENT_TITLE = 'Invoices';
  const SUBCOMPONENT_TITLE = 'Invoice';
  let lastElement: any;
  let isVisible = false;

  const invoiceNumber = 'invoiceNumber';
  const verificationNumber = 'verificationNumber';
  const unitName = 'unitName';
  const totalAmount = '10';
  const amountPaid = '10';

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

  it('should load Invoices', async () => {
    // go to entity component page
    const tabEntities = element(by.css('ion-tab-button[tab="entities"]'));
    await browser.wait(ec.elementToBeClickable(tabEntities), 3000);
    await tabEntities.click();
    await element
      .all(by.css('ion-item'))
      .filter(async (el) => (await el.element(by.css('h2')).getText()) === 'Invoice')
      .first()
      .click();

    invoiceComponentsPage = new InvoiceComponentsPage();
    await browser.wait(ec.visibilityOf(invoiceComponentsPage.title), 5000);
    expect(await invoiceComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
    await browser.wait(
      ec.or(ec.visibilityOf(invoiceComponentsPage.entities.get(0)), ec.visibilityOf(invoiceComponentsPage.noResult)),
      5000
    );
  });

  it('should create Invoice', async () => {
    initNumberOfEntities = await invoiceComponentsPage.getEntitiesNumber();
    await browser.wait(ec.elementToBeClickable(invoiceComponentsPage.createButton), 5000);
    await invoiceComponentsPage.clickOnCreateButton();
    invoiceUpdatePage = new InvoiceUpdatePage();
    await browser.wait(ec.visibilityOf(invoiceUpdatePage.pageTitle), 1000);
    expect(await invoiceUpdatePage.getPageTitle()).toEqual(SUBCOMPONENT_TITLE);

    await invoiceUpdatePage.setInvoiceNumberInput(invoiceNumber);
    await invoiceUpdatePage.setVerificationNumberInput(verificationNumber);
    await invoiceUpdatePage.setUnitNameInput(unitName);
    await invoiceUpdatePage.setTotalAmountInput(totalAmount);
    await invoiceUpdatePage.setAmountPaidInput(amountPaid);

    await invoiceUpdatePage.save();
    await browser.wait(ec.visibilityOf(invoiceComponentsPage.title), 1000);
    expect(await invoiceComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
    expect(await invoiceComponentsPage.getEntitiesNumber()).toEqual(initNumberOfEntities + 1);
  });

  it('should get the last Invoice', async () => {
    invoiceComponentsPage = new InvoiceComponentsPage();
    await browser.wait(ec.visibilityOf(invoiceComponentsPage.title), 5000);
    lastElement = await invoiceComponentsPage.viewButtons.last().getWebElement();
  });

  it('should scroll the last Invoice', async () => {
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

  it('should view the last Invoice', async () => {
    invoiceDetailPage = new InvoiceDetailPage();
    if (isVisible && (await invoiceDetailPage.pageTitle.isDisplayed())) {
      expect(await invoiceDetailPage.getPageTitle()).toEqual(SUBCOMPONENT_TITLE);

      expect(await invoiceDetailPage.getInvoiceNumberInput()).toEqual(invoiceNumber);

      expect(await invoiceDetailPage.getVerificationNumberInput()).toEqual(verificationNumber);

      expect(await invoiceDetailPage.getUnitNameInput()).toEqual(unitName);

      expect(await invoiceDetailPage.getTotalAmountInput()).toEqual(totalAmount);

      expect(await invoiceDetailPage.getAmountPaidInput()).toEqual(amountPaid);
    }
  });

  it('should delete last Invoice', async () => {
    invoiceDetailPage = new InvoiceDetailPage();
    if (isVisible && (await invoiceDetailPage.deleteButton.isDisplayed())) {
      await browser.executeScript('arguments[0].click()', await invoiceDetailPage.deleteButton.getWebElement());

      const alertConfirmButton = element.all(by.className('alert-button')).last();

      await browser.wait(ec.elementToBeClickable(alertConfirmButton), 3000);
      alertConfirmButton.click();
      await browser.wait(ec.visibilityOf(invoiceComponentsPage.title), 3000);
      expect(await invoiceComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
      expect(await invoiceComponentsPage.getEntitiesNumber()).toEqual(initNumberOfEntities);
    }
  });

  it('finish Invoices tests performing logout', async () => {
    // go to home page
    const tabHome = element(by.css('ion-tab-button[tab="home"]'));
    await browser.wait(ec.elementToBeClickable(tabHome), 3000);
    await tabHome.click();
    await browser.wait(ec.elementToBeClickable(loginPage.logoutButton), 3000);
    await loginPage.logout();
  });
});
