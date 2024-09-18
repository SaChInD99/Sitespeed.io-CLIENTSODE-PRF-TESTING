module.exports = async function (context, commands) {

    const webdriver = context.selenium.webdriver;
    const driver = context.selenium.driver;
    const until = webdriver.until;
    const By = webdriver.By;

    await commands.measure.start('PageLoad');
    await driver.get("https://cmh-research-publication-manager-ui.perf.cmh.wiley.host/login");
    await driver.wait(until.elementLocated(By.xpath('//*[@id=":r1:"]')), 10000);
    await commands.measure.stop();


    // Login to the application
   
    const emailField = await driver.findElement(By.xpath('//input[@aria-label="email input"]'));
    const passwordField = await driver.findElement(By.xpath('//input[@aria-label="password input"]'));

    await commands.measure.start('Login');
    await emailField.sendKeys('');
    await passwordField.sendKeys('');
    const loginButton = await driver.findElement(By.xpath('//*[@id="root"]/div[2]/form/div/button'));
    await loginButton.click();
    await driver.wait(until.elementLocated(By.xpath('//span[@data-testid="ws-header"]')), 10000);
    console.log('Successfully logged in!');
    await commands.measure.stop();


    // // Navigate through side navigation tabs 
    
    await commands.measure.start('navigation');
    const tab1 = await driver.findElement(By.xpath('//span[text()="Articles"]')); 
    await tab1.click();
    console.log('Navigated to Articles');
    await driver.wait(until.elementLocated(By.xpath('//div[@data-testid="inventory-header"]')), 10000);
    const tab2 = await driver.findElement(By.xpath('//span[text()="Journals"]')); 
    await tab2.click();
    console.log('Navigated to Journals');
    await driver.wait(until.elementLocated(By.xpath('//div[@data-testid="inventory-header"]')), 20000);
    await commands.measure.stop();


    // Navigate to the "Workspace" tab
    await commands.measure.start('navigation');
    const workspaceTab = await driver.findElement(By.xpath("//li[contains(@class, 'MuiListItem-root')]//div[@data-testid='workspace-menu-button']"));
    await workspaceTab.click();
    console.log('Navigated to Workspace');
    await driver.wait(until.elementLocated(By.xpath('//span[@data-testid="ws-header"]')), 10000);
    const issuesSubTab = await driver.findElement(By.xpath('//*[@id="content-awaiting-publications-tab-1"]')); 
    await issuesSubTab.click();
    console.log('Selected Issues sub-tab');
    await driver.wait(until.elementLocated(By.xpath('//span[@data-testid="ws-header"]')), 10000);
    await commands.measure.stop();


    // journal search
    await commands.measure.start('search');
    const searchField = await driver.findElement(By.xpath("//input[@data-testid='search-select-search-input']"));
    await searchField.sendKeys('Journal of Aquatic Animal Health');
    const dropdownSlection = await driver.findElement(By.xpath("//button[@data-testid='search-button']"));
    await dropdownSlection.click();
    await driver.wait(until.elementLocated(By.xpath("//div[@data-testid='html-view' and text()='Journal of Aquatic Animal Health']")), 10000);
    console.log('Search results displayed successfully!');
    await commands.measure.stop();


    return commands.wait.byTime(10000);

}