const { expect } = require('@playwright/test');

const login = 'candidate+Agent@lightico.com';
const password = 'Candidate123!';

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginInput = page.locator('input[id="Username"]');
        this.passwordInput = page.locator('input[id="Password"]')
        this.loginBtn = page.locator('input[id="buttonLogIn"]')
    }

    async goto() {
        await this.page.goto('https://staging1login.lightico.com/');
    }

    async logIn() {
        await this.loginInput.fill(login);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
        await expect(this.page).toHaveURL('https://staging1.lightico.com/agentDesktop.aspx');
    }
};

//
//
//     class="ellipsis-text"
//
// class="circle" - yа это кликунть и тут документ
//
// i class="fa file-pdf"  тут документ
//
// timeout пока не откроется button
//
// span id="buttonSendFile" - сюда кликнуть чтобы отправить