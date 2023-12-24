import { Page, Locator, BrowserContext, expect } from '@playwright/test';
import { WebActions } from "../library/WebActions";

let webActions: WebActions;

export class LeftMenu {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly EXECUTION_HISTORY_BUTTON : Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.EXECUTION_HISTORY_BUTTON = this.page.locator("//*[local-name()='svg' and contains(@class,'clock')]/..");
    }

    async verifyMouseHoverOnExecuteHistory() : Promise<void>{
        await this.EXECUTION_HISTORY_BUTTON.hover();
        await expect(this.page.locator("//span[text()='Execute History']")).toBeVisible();
    }

    async clicExecuteHistory() : Promise<void>{
        await this.EXECUTION_HISTORY_BUTTON.click();
    }
}