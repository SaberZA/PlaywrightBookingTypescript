import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as CSV from 'csv-string';

const SEARCH_ITEMS = [];
const testData = fs.readFileSync('utd-places.csv').toString();
const arr = CSV.parse(testData);
arr.forEach((p, index) => {
  if(index != 0) {
    SEARCH_ITEMS.push(p[0]);
  }
});




test.describe('Booking Searches', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://booking.com');
  });

  test('search-with-test-data', async ({ page }) => {
    expect(SEARCH_ITEMS.length).toEqual(7);   
  });   
  
  SEARCH_ITEMS.forEach((searchValue) => {
    test(`search: ${searchValue}`, async ({ page }) => {

      // Click [placeholder="Where\ are\ you\ going\?"]
      await page.locator('[placeholder="Where\\ are\\ you\\ going\\?"]').click();
  
      // Fill [placeholder="Where\ are\ you\ going\?"]
      await page.locator('[placeholder="Where\\ are\\ you\\ going\\?"]').fill(searchValue);
  
      // Click button:has-text("Search")
      await page.locator('button:has-text("Search")').click();
      await expect(page).toHaveURL('https://www.booking.com/searchresults.html?label=gen173nr-1FCAEoggI46AdIM1gEaPsBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKtyp2RBsACAdICJGMzMWY3Yjg2LWNmNmQtNDQyZC05MDE0LWQ1MmJkZTRkOGY1MNgCBeACAQ&sid=65338d389470c3c54bcbeb243629e964&sb=1&sb_lp=1&src=index&src_elem=sb&error_url=https%3A%2F%2Fwww.booking.com%2Findex.html%3Flabel%3Dgen173nr-1FCAEoggI46AdIM1gEaPsBiAEBmAExuAEXyAEM2AEB6AEB-AECiAIBqAIDuAKtyp2RBsACAdICJGMzMWY3Yjg2LWNmNmQtNDQyZC05MDE0LWQ1MmJkZTRkOGY1MNgCBeACAQ%3Bsid%3D65338d389470c3c54bcbeb243629e964%3Bsb_price_type%3Dtotal%26%3B&ss=Underberg%2C+KwaZulu-Natal%2C+South+Africa&is_ski_area=0&checkin_year=&checkin_month=&checkout_year=&checkout_month=&group_adults=2&group_children=0&no_rooms=1&b_h4u_keep_filters=&from_sf=1&ss_raw=underberg&ac_position=0&ac_langcode=en&ac_click_type=b&dest_id=-1294427&dest_type=city&place_id_lat=-29.79196&place_id_lon=29.49415&search_pageview_id=6f6c6456f5050171&search_selected=true');
  
      // Click h1:has-text("Underberg: 55 properties found")
      await page.locator('h1:has-text("properties found")').click();
    });
  });  

  
});