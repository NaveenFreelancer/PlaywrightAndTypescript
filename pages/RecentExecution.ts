import { Page, Locator, BrowserContext, expect } from '@playwright/test';
import { WebActions } from "../library/WebActions";

let webActions: WebActions;

export class RecentExecution {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly HEADER : Locator;
    readonly CLOSE_BUTTON : Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.HEADER = this.page.locator("//span[text()='Execute History']");
        this.CLOSE_BUTTON = this.page.locator("//h1[text()='Recent Executions']/following-sibling::button/*[local-name()='svg' and @data-icon='xmark']");
    }

    async verifyExecuteHistory() : Promise<void>{
        await expect(this.HEADER).toBeVisible();
    }

    async closeExecuteHistory() : Promise<void>{
        await this.CLOSE_BUTTON.click();
        await expect(this.HEADER).toBeHidden();
    }
}