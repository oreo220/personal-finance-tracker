import {test,expect} from '@playwright/test'; test('landing page works',async({page})=>{await page.goto('/');await expect(page.getByText('Tahu uangmu.')).toBeVisible();});
