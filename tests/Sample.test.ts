import { expect } from '@playwright/test';
import test from '../library/BaseTest';
import { IDETYPE, WINDOWTYPE } from '../pages/CompilerIDE';

test.describe('Basic Tests', async () => {

    test.beforeEach(async ({ javaCompiler }, testInfo) => {
        console.log(`Running ${testInfo.title}`);
        await test.step(`Load Online java Compiler`, async () => {
            await javaCompiler.loadComilerIDE("Java");
        });
    
    });

    test(`Verify Window sizing`, async ({ javaCompiler, }) => {

        await test.step('Expand Window', async () => {
            await javaCompiler.adjustIDEWindow(WINDOWTYPE.EXPAND_WINDOW); 
        });
    
        await test.step('Compress Window', async () => {
            await javaCompiler.adjustIDEWindow(WINDOWTYPE.COMPRESS_WINDOW); 
        });

    });

    test(`Verify IDE types switching `, async ({ javaCompiler, }) => {

        await test.step('Switch to Advance IDE', async() => {
            await javaCompiler.switchToIDE(IDETYPE.ADVANCE);
        });

        await test.step('Switch to Basic IDE', async() => {
            await javaCompiler.switchToIDE(IDETYPE.BASIC);
        });
    });


    test(`Execute Sample program`, async ({javaCompiler})=>{
        await javaCompiler.clickExecute();
        expect(await javaCompiler.getExecuteResult()).toBe("Sum of x+y = 35");
    });



    test(`Verify Left Menu(Execute History)`, async ({leftMenu, recentExecution, javaCompiler})=>{ 

        await test.step('Verify Execute History Popup', async() =>{
            await leftMenu.verifyMouseHoverOnExecuteHistory();
            await leftMenu.clicExecuteHistory();
            await recentExecution.verifyExecuteHistory();
            await recentExecution.closeExecuteHistory();
        })

        await test.step('Left Menu Panel', async() => {
            await javaCompiler.leftManuCollapse();
        });
    });


    test(`Verify Font Pixel change`, async ({javaCompiler})=>{ 
        let fontSize = 21;
        let initialFontSize, updatedFontSize;
        let initialFontHeigt, updatedFrontHeight;

        await test.step('Get Current font details', async() => {
            initialFontSize = await javaCompiler.getFontSize();
            initialFontHeigt = await javaCompiler.getCodeLineHeight();
        });

        await test.step('Set font size', async() => {
            await javaCompiler.setFontSize(fontSize);
        });

        await test.step('Verify updated font size', async() => {
            updatedFontSize = await javaCompiler.getFontSize();
            updatedFrontHeight = await javaCompiler.getCodeLineHeight();
            await expect(updatedFontSize).toBe(fontSize);
            await expect(updatedFrontHeight - updatedFontSize).toBeGreaterThanOrEqual(initialFontHeigt-initialFontSize)
        });
        
    });


});


