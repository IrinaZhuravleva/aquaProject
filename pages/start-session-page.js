const { expect } = require('@playwright/test');

exports.StartSessionPage = class StartSessionPage {
    constructor(page) {
        this.sidebarArrow = page.locator('.sidebar-arrow');
        this.myHistory = page.locator('div #myHistoryTitle span');
        this.newConversationBtn = page.locator('button#spanNewConversation');
    }

    async startNewConversation() {
        await this.newConversationBtn.click();
    }
    async checkMyHistoryBlock() {
        await this.sidebarArrow.click();
        await expect(this.myHistory).toBeVisible();
        await expect(this.myHistory).toContainText('My history')
    }
};
