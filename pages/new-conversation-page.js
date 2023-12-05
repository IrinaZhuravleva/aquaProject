const { expect } = require('@playwright/test');

const userEmail = 'candidate@lightico.com';
const userPhone = '+972532770811';
const userName = 'Yaniv'

exports.NewConversationPage = class NewConversationPage {
    constructor(page) {
        this.page = page;
        this.modal = {
            startNewConversationBtn: page.locator('button#buttonStartNewConversation'),
            inputPhoneNewConversation: page.locator('input#inputPhoneNewConversation'),
            inputNameNewConversation: page.locator('input#inputNameNewConversation'),
        };
        this.userInfo = page.locator('.ellipsis-text');
        // class="ellipsis-text"
        this.userDocumentsBtn = page.locator('.circle');
        this.userFirstDocument = page.locator('i.fa.file-pdf');
        this.sendFileBtn = page.locator('span#buttonSendFile');
//
// class="circle" - yа это кликунть и тут документ
//
// i class="fa file-pdf"  тут документ
//
// timeout пока не откроется button
//
// span id="buttonSendFile" - сюда кликнуть чтобы отправить
    }

    async fillInForm() {
        await expect(this.modal.inputPhoneNewConversation).toBeVisible();
        await expect(this.modal.inputNameNewConversation).toBeVisible();
        await this.modal.inputPhoneNewConversation.fill(userPhone);
        await this.modal.inputNameNewConversation.fill(userName);
        await this.modal.startNewConversationBtn.click();
        await expect(this.page).toHaveURL('https://staging1.lightico.com/agentDesktop.aspx');
        // дописать, что ждет перехода на следующую страницу
    }

    async sendDocuments(){
        await this.userInfo.isVisible(); // поставить какой-то таймаут вместо этого, потому что раннер не ждет
        await this.userInfo.click();
        await this.userDocumentsBtn.click();
        await this.userFirstDocument.click();
        await this.sendFileBtn.click();
    }
};
