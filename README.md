# Lab8_Starter

## Author(s):
Aksharan Saravanan & Matei-Alexandru Gardus

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)
    - (1) Within a Github action that runs whenever code is pushed 

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.
    - No, because the message feature likely requires individual components interacting on an application & feature level. For this feature, there are 2 users who each have some sort of messaging component on their end, and when a message is sent, other parts, or the application as a whole should handle storing and transmitting the data from one user to the next, in addition to all the features that have to be implemented to ensure that 2 users can send data to each other. This test is better suited for an integration test, rather than a unit test.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters
    - Yes, because the max message length feature is an individual restriction, or implementation, within the messaging feature for a user, so it is plausible to test that this inidividual feature is working as it should. The max length feature is probably some check within the input field, so it should be possible to unit test that particular field.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?
    - If we run our Puppeteer tests with the "headless" field set to true, we expect for our tests to run using a headless version of the Chromium browser; in other words, the browser spawns without a graphical interface, but can be used internally 

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

    - The `beforeAll` callback would require a goto towards the settings page, likely using the `click` functionality rather than a direct URL usage. Something like this works:

    ```js
    beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500);
    const settingIcon = await page.$('header > img');

    await settingIcon.click();
    await page.waitForNavigation();
    });
    ```
