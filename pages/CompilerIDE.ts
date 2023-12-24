import { Page, Locator, BrowserContext, expect } from '@playwright/test';
import { WebActions } from "../library/WebActions";

let webActions: WebActions;
export enum WINDOWTYPE{
    EXPAND_WINDOW = "expand",
    COMPRESS_WINDOW = "compress"
}

export enum IDETYPE{
    BASIC = "Basic",
    ADVANCE = "Advanced"
}

export class CompilerIDE {
    readonly page: Page;
    readonly context: BrowserContext;
    readonly JAVA_HEADER: Locator;
    readonly EXPAND_COMPRESS_BUTTON_XPATH: String;
    readonly TOP_NAV_BAR: Locator;
    readonly PROJECT_TREE_WINDOW : Locator;
    readonly EXECUTE_BUTTON : Locator;
    readonly STOP_EXECUTION_BUTTON : Locator;
    readonly LEFT_MENU_COLLAPSE_BOTTON : Locator;
    readonly LEFT_MENU_PANEL : Locator;
    readonly FONT_SIZE_DROPDOWN : Locator;
    readonly CODE_LINES_XPATH : string;
    readonly OUTPUT_LINES : Locator;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.JAVA_HEADER = this.page.locator('//h1[contains(text(),"Java")]');
        this.EXPAND_COMPRESS_BUTTON_XPATH = '//div[contains(@class,"section-tertiary")]//*[local-name()="svg" and @data-icon="$"]';
        this.TOP_NAV_BAR = this.page.locator("//div[@id='navbar-collapse-basic']");
        this.PROJECT_TREE_WINDOW = this.page.locator('#ideProjectTree');
        this.EXECUTE_BUTTON = this.page.locator('//button[normalize-space()="Execute"]');
        this.STOP_EXECUTION_BUTTON = this.page.locator('//button[normalize-space()="Stop Execution"]');
        this.LEFT_MENU_COLLAPSE_BOTTON = this.page.locator('//*[local-name()="svg" and @data-icon="rectangle-xmark"]');
        this.LEFT_MENU_PANEL = this.page.locator('//*[@id="openFromFileInput"]');
        this.FONT_SIZE_DROPDOWN = this.page.locator('div.section-tertiary #fontSizeSelect');
        this.CODE_LINES_XPATH = "//div[@class='ace_layer ace_text-layer']//div[@class='ace_line']";
        this.OUTPUT_LINES = this.page.locator("#tabs-output .ace_line");
    }

    async loadComilerIDE(language : string): Promise<void> {
        await this.page.goto(`/online-${language}-compiler`);
        await expect(this.page).toHaveTitle(`Online ${language} Compiler - Online ${language} Editor -  ${language} Code Online`);
        expect(await this.JAVA_HEADER.isVisible())
    }

    async adjustIDEWindow(windowType : WINDOWTYPE): Promise<void>{
        await this.page.locator(this.EXPAND_COMPRESS_BUTTON_XPATH.replace('$',windowType)).click();
        switch(windowType)
        {
            case WINDOWTYPE.EXPAND_WINDOW:
                expect(await this.TOP_NAV_BAR.isVisible());
                break;
            case WINDOWTYPE.COMPRESS_WINDOW:
                expect(await this.TOP_NAV_BAR.isHidden());
                break;
        }    
    }

    async switchToIDE(type : IDETYPE): Promise<void>{
        await webActions.clickByText(`${type} Java IDE`);
        switch(type)
        {
            case IDETYPE.BASIC:
                expect(await this.PROJECT_TREE_WINDOW.isHidden());
                break;
            case IDETYPE.ADVANCE:
                expect(await this.PROJECT_TREE_WINDOW.isVisible());
                break;
        }
        
    }

    async clickExecute(): Promise<void>{
        await webActions.clickByText("Execute");
        await expect(this.EXECUTE_BUTTON).toBeHidden();
        await expect(this.STOP_EXECUTION_BUTTON).toBeVisible();
        await this.page.locator("//div[text()='JDoodle in Action.... Running the program...']").isVisible();
    }
    
    async getExecuteResult(): Promise<string|null>{
        await expect(this.STOP_EXECUTION_BUTTON).toBeHidden();
        return (await this.page.locator('#tabs-output .ace_line').nth(0).textContent());
    
    }

    async leftManuCollapse(): Promise<void>
    {
        expect(await this.LEFT_MENU_PANEL.isVisible());
        await this.LEFT_MENU_COLLAPSE_BOTTON.click();
        await expect(this.LEFT_MENU_PANEL).toBeHidden();
    }

    async setFontSize(pixelChange : number) : Promise<void>
    {
        await this.FONT_SIZE_DROPDOWN.selectOption(pixelChange.toString());
    }

    async getFontSize(): Promise<number>
    {
        return Number(await this.page.$eval<string, HTMLSelectElement>("div.section-tertiary #fontSizeSelect", ele => ele.value));
    }

    async getCodeLineHeight(): Promise<number>
    {
        return Number((await this.page.locator(this.CODE_LINES_XPATH).nth(0).getAttribute("style"))?.split(";").at(0)?.split(":").at(1)?.split("p").at(0));
    }


}