import { browser, by, element, ExpectedConditions as ec } from 'protractor';
import { LoginPage } from '../../pages/login.po';
import { CategoryComponentsPage, CategoryDetailPage, CategoryUpdatePage } from './category.po';

describe('Category e2e test', () => {
  let loginPage: LoginPage;
  let categoryComponentsPage: CategoryComponentsPage;
  let categoryUpdatePage: CategoryUpdatePage;
  let categoryDetailPage: CategoryDetailPage;
  let initNumberOfEntities: number;
  const COMPONENT_TITLE = 'Categories';
  const SUBCOMPONENT_TITLE = 'Category';
  let lastElement: any;
  let isVisible = false;

  const name = 'name';
  const description = 'description';

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

  it('should load Categories', async () => {
    // go to entity component page
    const tabEntities = element(by.css('ion-tab-button[tab="entities"]'));
    await browser.wait(ec.elementToBeClickable(tabEntities), 3000);
    await tabEntities.click();
    await element
      .all(by.css('ion-item'))
      .filter(async (el) => (await el.element(by.css('h2')).getText()) === 'Category')
      .first()
      .click();

    categoryComponentsPage = new CategoryComponentsPage();
    await browser.wait(ec.visibilityOf(categoryComponentsPage.title), 5000);
    expect(await categoryComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
    await browser.wait(
      ec.or(ec.visibilityOf(categoryComponentsPage.entities.get(0)), ec.visibilityOf(categoryComponentsPage.noResult)),
      5000
    );
  });

  it('should create Category', async () => {
    initNumberOfEntities = await categoryComponentsPage.getEntitiesNumber();
    await browser.wait(ec.elementToBeClickable(categoryComponentsPage.createButton), 5000);
    await categoryComponentsPage.clickOnCreateButton();
    categoryUpdatePage = new CategoryUpdatePage();
    await browser.wait(ec.visibilityOf(categoryUpdatePage.pageTitle), 1000);
    expect(await categoryUpdatePage.getPageTitle()).toEqual(SUBCOMPONENT_TITLE);

    await categoryUpdatePage.setNameInput(name);
    await categoryUpdatePage.setDescriptionInput(description);

    await categoryUpdatePage.save();
    await browser.wait(ec.visibilityOf(categoryComponentsPage.title), 1000);
    expect(await categoryComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
    expect(await categoryComponentsPage.getEntitiesNumber()).toEqual(initNumberOfEntities + 1);
  });

  it('should get the last Category', async () => {
    categoryComponentsPage = new CategoryComponentsPage();
    await browser.wait(ec.visibilityOf(categoryComponentsPage.title), 5000);
    lastElement = await categoryComponentsPage.viewButtons.last().getWebElement();
  });

  it('should scroll the last Category', async () => {
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

  it('should view the last Category', async () => {
    categoryDetailPage = new CategoryDetailPage();
    if (isVisible && (await categoryDetailPage.pageTitle.isDisplayed())) {
      expect(await categoryDetailPage.getPageTitle()).toEqual(SUBCOMPONENT_TITLE);

      expect(await categoryDetailPage.getNameInput()).toEqual(name);

      expect(await categoryDetailPage.getDescriptionInput()).toEqual(description);
    }
  });

  it('should delete last Category', async () => {
    categoryDetailPage = new CategoryDetailPage();
    if (isVisible && (await categoryDetailPage.deleteButton.isDisplayed())) {
      await browser.executeScript('arguments[0].click()', await categoryDetailPage.deleteButton.getWebElement());

      const alertConfirmButton = element.all(by.className('alert-button')).last();

      await browser.wait(ec.elementToBeClickable(alertConfirmButton), 3000);
      alertConfirmButton.click();
      await browser.wait(ec.visibilityOf(categoryComponentsPage.title), 3000);
      expect(await categoryComponentsPage.getTitle()).toEqual(COMPONENT_TITLE);
      expect(await categoryComponentsPage.getEntitiesNumber()).toEqual(initNumberOfEntities);
    }
  });

  it('finish Categories tests performing logout', async () => {
    // go to home page
    const tabHome = element(by.css('ion-tab-button[tab="home"]'));
    await browser.wait(ec.elementToBeClickable(tabHome), 3000);
    await tabHome.click();
    await browser.wait(ec.elementToBeClickable(loginPage.logoutButton), 3000);
    await loginPage.logout();
  });
});
