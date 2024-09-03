import { test } from '@playwright/test';

const url = 'https://wetransfer.com/downloads/';

test.beforeEach(async ({ page }) => {
	await page.goto(url);
});

test.describe('Download from WeTransfer', () => {
	test('should download file', async ({ page }) => {
		const acceptAllButton = page.getByTestId('Accept All-btn');
		await acceptAllButton.click();

		const agreeButton = page.getByText('I agree'); // Adjust the selector to match the button
		await agreeButton.click();

		const downloadPromise = page.waitForEvent('download');
		const downloadButton = page.getByText('Download');
		await downloadButton.click();
		const download = await downloadPromise;

		// Wait for the download process to complete and save the downloaded file somewhere.
		await download.saveAs(`./downloads/${download.suggestedFilename()}`);
	});
});
