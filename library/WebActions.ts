import type { Locator, Page } from '@playwright/test';
import { BrowserContext } from '@playwright/test';

export class WebActions {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async clickByText(text: string): Promise<void> {
        await this.page.getByText(text, { exact: true }).click();  //Matches locator with exact text and clicks
    }

    async getHyperlinkLocatorUsingText(text: string): Promise<Locator>
    {
        return await this.page.locator(`//page.locator('a:has-text("${text}")')`);
    }

    /**
     * This functions works for input fields those have suggestion option when typed
     *  
     * @param locator 
     * @param optionText 
     */
    async typeAndSelectOption(locator:Locator,optionText: string): Promise<void> {
        await locator.fill(optionText);
        await this.page.waitForTimeout(2000);
        await this.page.locator('xpath=//*[contains(@id,"option")]').filter({hasText:optionText}).click();
    }

}