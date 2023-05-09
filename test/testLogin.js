const { Builder , By ,Key , until } = require('selenium-webdriver');
const { elementLocated } = require('selenium-webdriver/lib/until');
const should = require('chai').should();
require('dotenv').config();

//Log in data
let user = process.env.USER;
let pass = process.env.PASS;
/* 
As an user I should be able to log in
to see my profile*/

//.only() -run onlythis test block//.ship() -skip this specific test
describe.only('Login to Luma Demostore', () => {
    context(' I Click on login and enter my credentials', () => {
        it('I should be logged in and see my profile',async () => {
            const driver = await new Builder().forBrowser('firefox').build();

            try {
                //Go to the store
            await driver.get('https://magento.softwaretestingboard.com/'); 
            await driver.findElement(By.css('.authorization-link > a:nth-child(1)')).click();

            //Get the form and send the keys
            await driver.wait(until.elementLocated(By.id('email')),10000);
            
            await driver.findElement(By.id('email')).sendKeys(user);
            await driver.findElement(By.id('pass')).sendKeys(pass);

            //Click login button
            await driver.findElement(By.css('#send2')).click(); 

            //Implicit wait to allow site to load
            await driver.sleep(1000);

            //Get to our profile
            await driver.wait(until.elementLocated(By.css('.action.switch')),20000);
            await driver.findElement(By.css('.action.switch')).click();

           await driver.wait(until.elementLocated(By.css('a[href$="/customer/account/"]')),10000);
           await driver.findElement(By.css('a[href$="/customer/account/"]')).click();
           // await driver.wait(until.elementLocated(By.css('a[href="https://magento.softwaretestingboard.com/customer/account/"]')),10000);
           //Get and check our information
           await driver.wait(until.elementLocated(By.css('.box-information .box-content p')),10000);
           const information = await driver.findElement(By.css('.box-information .box-content p')).getText();

           //Assert
           information.should.contain('Test Testsson');
            

            }finally {
                await driver.quit();
            }

            
        });
    });
});