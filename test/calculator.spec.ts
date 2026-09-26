import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('Calculator Functionality', () => {

  test.beforeEach(async ({ page }) => {
    // Loads your local calculator.html file directly
    const filePath = path.resolve(__dirname, '../calculator.html')
    await page.goto(`C:\\Users\\valol\\OneDrive\\Documentos\\Demo Calculator\\calculator.html`);
  });

  test('should multiply two numbers correctly', async ({ page }) => {
    await page.fill('#num1', '4');
    await page.selectOption('#op', '*');
    await page.fill('#num2', '5');
    await page.click('button:has-text("Calculate")');

    await expect(page.locator('#result')).toHaveText('Result: 20');
  });

  test('should handle division by zero safeguard', async ({ page }) => {
    await page.fill('#num1', '10');
    await page.selectOption('#op', '/');
    await page.fill('#num2', '0');
    await page.click('button:has-text("Calculate")');

    await expect(page.locator('#result')).toHaveText('Result: No I Cannot divide by zero!');
  });

  test('should handle negative numbers correctly', async ({ page }) => {
    await page.fill('#num1', '-3');
    await page.selectOption('#op', '*');
    await page.fill('#num2', '6');
    await page.click('button:has-text("Calculate")');

    await expect(page.locator('#result')).toHaveText('Result: -18');
  });

  test('should trigger the feeling bad easter egg', async ({ page }) => {
    await page.selectOption('#op', '+-');
    await page.click('button:has-text("Calculate")');

    await expect(page.locator('#result')).toHaveText('Result: Everything is gonna be ok!');
  });

});