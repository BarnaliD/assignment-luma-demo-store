//includes
const { Builder, By , Key , until } = require('selenium-webdriver');
const should = require('chai').should();

/* as a customer,
I want to be able to search for a product
so that I can find the product I want to buy */

//Test grouping search
describe('Search for  product', () => {
    //Test cases
    context('I search for a product', () => {
        it('I should see the product that I searched for',async () => {
            //Start the web browser
            const driver = await new Builder().forBrowser('firefox').build();

            //Search for product
            try {
                await driver.get('https://magento.softwaretestingboard.com/');

                //Get the serach input
                await driver.wait(until.elementLocated(By.css('#search')),10000);
                await driver.findElement(By.id('search')).sendKeys('shirt' ,Key.RETURN);

                //Find the first product
                await driver.wait(until.elementLocated(By.css('.product-item:first-child'),10000));
                const product = await driver.findElement(By.css('.product-item:first-child'));

                //Find info in the product we selected
                let productTitle = await product.findElement(By.css('.product-item-link'));
                let productPrice = await product.findElement(By.css('.price'));

                //Extract teext
                let productTitleText = await productTitle.getText();
                let productPriceText = await productPrice .getText();

                //console.log(productTitleText,productPriceText);
                productTitleText.should.equal('Radiant Tee');
                productPriceText.should.equal('$22.00');

            }catch(error) {
                console.log(error);
            }finally {
               await driver.sleep(3000);
               await driver.quit(); 
            }
        });
    });
});