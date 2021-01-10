import { browser, by, element, ExpectedConditions as ec } from 'protractor';
import { LoginPage } from '../../pages/login.po';
import { PaymentInfoComponentsPage, PaymentInfoDetailPage, PaymentInfoUpdatePage } from './payment-info.po';

describe('PaymentInfo e2e test', () => {
  let loginPage: LoginPage;
  let paymentInfoComponentsPage: PaymentInfoComponentsPage;
  let paymentInfoUpdatePage: PaymentInfoUpdatePage;
  let paymentInfoDetailPage: PaymentInfoDetailPage;
  let initNumberOfEntities: number;
  const COMPONENT_TITLE = 'Payment Infos';
  const SUBCOMPONENT_TITLE = 'Payment Info';
  let lastElement: any;
  let isVisible = false;

  const name = 'name';
  const accountNumber = 'accountNumber';
  const cardNumber = 'cardNumber';

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

  it('should load PaymentInfos', async () => {
    // go to entity component page
    const tabEntities = element(by.css('ion-tab-button[tab="entities"]'));
    await browser.wait(ec.elementToBeClickable(tabEntities), 3000);
    await tabEntities.click();
    await element
      .all(by.css('ion-item'))
      .filter(async (el) => (await el.element(by.css('h2')).getText()) === 'PaymentInfo')
      .first()
      .click();

    paymentInfoComponentsPage = new PaymentInfoComponentsPage();
    await browser.wait(ec.visibilityOf(paymentInfoComponentsPage.title), 5000);
    expect(await paymentInfoComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
    await browser.wait(
      ec.or(ec.visibilityOf(paymentInfoComponentsPage.entities.get(0)), ec.visibilityOf(paymentInfoComponentsPage.noResult)),
      5000
    );
  });

  it('should create PaymentInfo', async () => {
    initNumberOfEntities = await paymentInfoComponentsPage.getEntitiesNumber();
    await browser.wait(ec.elementToBeClickable(paymentInfoComponentsPage.createButton), 5000);
    await paymentInfoComponentsPage.clickOnCreateButton();
    paymentInfoUpdatePage = new PaymentInfoUpdatePage();
    await browser.wait(ec.visibilityOf(paymentInfoUpdatePage.pageTitle), 1000);
    expect(await paymentInfoUpdatePage.getPageTitle()).toEqual(SUBCOMPONENT_TITLE);

    await paymentInfoUpdatePage.setNameInput(name);
    await paymentInfoUpdatePage.setAccountNumberInput(accountNumber);
    await paymentInfoUpdatePage.setCardNumberInput(cardNumber);

    await paymentInfoUpdatePage.save();
    await browser.wait(ec.visibilityOf(paymentInfoComponentsPage.title), 1000);
    expect(await paymentInfoComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
    expect(await paymentInfoComponentsPage.getEntitiesNumber()).toEqual(initNumberOfEntities + 1);
  });

  it('should get the last PaymentInfo', async () => {
    paymentInfoComponentsPage = new PaymentInfoComponentsPage();
    await browser.wait(ec.visibilityOf(paymentInfoComponentsPage.title), 5000);
    lastElement = await paymentInfoComponentsPage.viewButtons.last().getWebElement();
  });

  it('should scroll the last PaymentInfo', async () => {
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

  it('should view the last PaymentInfo', async () => {
    paymentInfoDetailPage = new PaymentInfoDetailPage();
    if (isVisible && (await paymentInfoDetailPage.pageTitle.isDisplayed())) {
      expect(await paymentInfoDetailPage.getPageTitle()).toEqual(SUBCOMPONENT_TITLE);

      expect(await paymentInfoDetailPage.getNameInput()).toEqual(name);

      expect(await paymentInfoDetailPage.getAccountNumberInput()).toEqual(accountNumber);

      expect(await paymentInfoDetailPage.getCardNumberInput()).toEqual(cardNumber);
    }
  });

  it('should delete last PaymentInfo', async () => {
    paymentInfoDetailPage = new PaymentInfoDetailPage();
    if (isVisible && (await paymentInfoDetailPage.deleteButton.isDisplayed())) {
      await browser.executeScript('arguments[0].click()', await paymentInfoDetailPage.deleteButton.getWebElement());

      const alertConfirmButton = element.all(by.className('alert-button')).last();

      await browser.wait(ec.elementToBeClickable(alertConfirmButton), 3000);
      alertConfirmButton.click();
      await browser.wait(ec.visibilityOf(paymentInfoComponentsPage.title), 3000);
      expect(await paymentInfoComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
      expect(await paymentInfoComponentsPage.getEntitiesNumber()).toEqual(initNumberOfEntities);
    }
  });

  it('finish PaymentInfos tests performing logout', async () => {
    // go to home page
    const tabHome = element(by.css('ion-tab-button[tab="home"]'));
    await browser.wait(ec.elementToBeClickable(tabHome), 3000);
    await tabHome.click();
    await browser.wait(ec.elementToBeClickable(loginPage.logoutButton), 3000);
    await loginPage.logout();
  });
});
