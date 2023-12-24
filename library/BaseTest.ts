import { test as baseTest } from '@playwright/test';
import { WebActions } from './WebActions';
import { CompilerIDE } from '../pages/CompilerIDE';
import { LeftMenu } from '../pages/LeftMenu';
import { RecentExecution } from '../pages/RecentExecution';

const test = baseTest.extend<{
    webActions: WebActions;
    javaCompiler: CompilerIDE;
    leftMenu : LeftMenu;
    recentExecution : RecentExecution;
}>({
    webActions: async ({ page, context }, use) => {
        await use(new WebActions(page, context));
    },
   
    javaCompiler: async ({page, context}, use) =>{
        await use(new CompilerIDE(page, context));
    },

    leftMenu: async ({page, context}, use) =>{
        await use(new LeftMenu(page, context));
    },

    recentExecution: async ({page, context}, use) =>{
        await use(new RecentExecution(page, context));
    }
})


export default test;