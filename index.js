const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const _ = require('underscore');



const user = process.env.USER || 'testuser@yad2.co.il';
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const login = async page => {
    await page.goto('https://yad2-dev.signin.aws.amazon.com/console');
    await page.waitFor(2000);
    await page.focus('#username');
    await page.keyboard.type(username)
    await page.focus('#password');
    await page.keyboard.type(password)
    await page.click('#signin_button');
}

const createUser = async (page) => {
    await page.goto('https://console.aws.amazon.com/iam/home?region=eu-west-1#/users');
    await page.waitFor(2000);
    await page.click('[href="#/users$new"]');
    await page.waitFor(2000);
    await page.focus('#awsui-textfield-17');
    await page.keyboard.type(user);
    await page.click('#awsui-checkbox-47');//allow programmatic access
    await page.click('#awsui-checkbox-48');//allow console access
    await page.waitFor(2000);
    // await page.click('#awsui-checkbox-54');//disable password reset
    await page.click('.awsui-button-variant-primary[type=submit]');//next
    await page.waitFor(2000);
    await page.click('[text="developers"]');//developers group
    await page.click('.awsui-button-variant-primary[type=submit]');//next
    await page.waitFor(3000);
    await page.click('.awsui-button-variant-primary[type=submit]');//next
    await page.waitFor(3000);
    await page.click('.awsui-button-variant-primary[type=submit]');//next
    await page.waitFor(3000);
    await page.click('span.download');//download creds
    await page.screenshot({path: 'example.png'});
    
}

(async () => {
    const browser = await puppeteer.launch({
        defaultViewport: {width: 1920, height: 1080}
    });
    const page = await browser.newPage();
    await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: '.'});
    await login(page);
    await page.waitFor(2000);
    await createUser(page);
    await browser.close();
    await page.waitFor(5000);
  
})();
