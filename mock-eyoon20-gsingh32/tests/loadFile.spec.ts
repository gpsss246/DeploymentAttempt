import { test, expect } from '@playwright/test';
import { doesNotMatch } from 'assert';



/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(({page}) => {
    // ... you'd put it here.
     page.goto('http://localhost:5173/');
    // TODO: Is there something we need to do before every test case to avoid repeating code?
  })


test('on page load, i see an input bar', async ({ page }) => {
    await expect(page.getByLabel('Command input')).toBeVisible()
  })

  test('on page load, i see a submit button', async ({ page }) => {
    await expect(page.getByRole('button')).toBeVisible()
  })

  // Tests to see if I get expected string for a proper file
  test('after command load_file with proper file, I get expected out put', async ({ page }) => {

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file /NYC.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText("File '/NYC.csv has been successfully loaded")).toBeVisible();


  });
  // Tests to see if I get expected string for when user does not give a file with load_file
  test('after command load_file w/o  filename, I get expected out put', async ({ page }) => {

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file');
    await page.getByRole('button', { name: 'Submit' }).click();
  
    await expect(page.getByText("Please enter a file")).toBeVisible();


  });

  // Tests to see if I get expected string for when user when file does not exists.
  test('after command load_file with file that does not exists, I get expected out put', async ({ page }) => {
   
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file /does-not-exist.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
  
    await expect(page.getByText("The file /does-not-exist.csv does not exist, please enter a valid file")).toBeVisible();

  });





  //This test looks at all of possibilites and interactions with the mode command. 
  test('after command mode is pressed command is visible, t', async ({ page }) => {


    await expect(page.getByText("Brief")).toBeVisible();
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('mode');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText("Verbose")).toBeVisible()
    

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').clear()
    await page.getByLabel('Command input').fill('load_file /does-not-exist.csv');
    await page.getByRole('button', { name: 'Submit' }).click();
    
    await expect(page.getByText("load_file /does-not-exist.csv")).toBeVisible();
    await expect(page.getByText("The file /does-not-exist.csv does not exist, please enter a valid file")).toBeVisible();

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').clear()
    await page.getByLabel('Command input').fill('load_file /NYC.csv');
    await page.getByRole('button', { name: 'Submit' }).click();

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').clear()
    await page.getByLabel('Command input').fill('search 3 1920');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText("search 3 1920")).toBeVisible();
    await expect(page.getByText("420 Oak St, Manhattan, NY 10001")).toBeVisible();


    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').clear()
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText("view")).toBeVisible();
    await expect(page.getByText("1975")).toBeVisible();
    
    



    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('mode');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText("Brief")).toBeVisible()
    await expect(page.getByText("load_file /does-not-exist.csv")).not.toBeVisible();
    await expect(page.getByText("search 3 1920")).not.toBeVisible();
  });



  //Tests case if someone is trying to call view before loading
  test('view before load', async ({ page }) => {
  
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', { name: 'Submit' }).click();
  
    await expect(page.getByText("Please load a file first :3")).toBeVisible();


  });

  //Test out normal view situation after file was first loaded.
  test('view after load', async ({ page }) => {
    
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file /NYC.csv');
    await page.getByRole('button', { name: 'Submit' }).click();


    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').clear()
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText("1975")).toBeVisible();

    const rows = await page.$$('table tbody tr');
    const cells = await rows[0].$$('td');
    
      const cellValue = await cells[0].innerText()
       expect(cellValue).toBe("123 Lavender St, Brooklyn, NY 11201")
      

      const cells2 = await rows[1].$$('td');
    
      const cellValue2 = await cells2[2].innerText()
    
       expect(cellValue2).toBe("1,400 ft^2")
    


  });

  //Is our one column dataset viewable, and by connection, loaded?
  test('view one column', async ({ page }) => {

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file /one_column.csv');
    await page.getByRole('button', { name: 'Submit' }).click();


    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').clear()
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText("Gurpoptart")).toBeVisible();
    const rows = await page.$$('table tbody tr');
    const cells = await rows[0].$$('td');
    
      const cellValue = await cells[0].innerText()
      expect(cellValue).toBe("Brookie")

      const cells2 = await rows[1].$$('td');
    
      const cellValue2 = await cells2[0].innerText()
    
      expect(cellValue2).toBe("Cookie")
    }
    

  );
  


  //Makes sure that we can view two datasets loaded seperately. 
  test('view one file at time', async ({ page }) => {

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file /one_column.csv');
    await page.getByRole('button', { name: 'Submit' }).click();


    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').clear()
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText("Gurpoptart")).toBeVisible();

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').clear()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file /NYC.csv');
    await page.getByRole('button', { name: 'Submit' }).click();

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').clear()
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText("1945")).toBeVisible();



    

  });
  // Test to see if user does not use given command.
  test('invalid command', async ({ page }) => {

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('hiiiii');
    await page.getByRole('button', { name: 'Submit' }).click();


    await expect(page.
        getByText("Unknown command, Please use the following commands: load_file <filename>, view, mode, and search <column> <target>")).
         toBeVisible();
  });

  //Try search without loading file.
  test('search with no loaded file.', async ({ page }) => {

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 3 1920');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText("Please load a file first :D")).toBeVisible();

  });
  //Search with index number
  test('search index ', async ({ page }) => {

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').clear()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file /NYC.csv');
    await page.getByRole('button', { name: 'Submit' }).click();

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 3 1920');
    await page.getByRole('button', { name: 'Submit' }).click();


    const rows = await page.$$('table tbody tr');
for (const row of rows) {
  const cells = await row.$$('td');
  const cellValue = await cells[1].innerText(); 
  expect(cellValue).toBe("$1,500,000")
}
  });

  //Search with header.
  test('search by header name ', async ({ page }) => {

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').clear()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file /NYC.csv');
    await page.getByRole('button', { name: 'Submit' }).click();

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search Property_Value $700,000');
    await page.getByRole('button', { name: 'Submit' }).click();


    const rows = await page.$$('table tbody tr');
for (const row of rows) {
  const cells = await row.$$('td');
  const cellValue = await cells[0].innerText(); 
  expect(cellValue).toBe("234 Maple St, Staten Island, NY 10310")
}
  });






  //Search one file at a time, can't search a file that belongs to an old load file command.
  test('search one file at a time ', async ({ page }) => {

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').clear()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file /NYC.csv');
    await page.getByRole('button', { name: 'Submit' }).click();

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 0 Queens');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText("789 Brookie St, Queens, NY 11375")).toBeVisible();


    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').clear()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file /one_column.csv');
    await page.getByRole('button', { name: 'Submit' }).click();

    


    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').clear();
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search Property Value $700,000');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText("No predefined results for your search.")).toBeVisible();





  });








  //Check for table. (Basic test)
  test('check for HTML table after viewing file', async ({ page }) => {
    // Navigate and Load the file
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_file /NYC.csv');
    await page.getByRole('button', { name: 'Submit' }).click();

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').clear();
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
    await page.getByRole('button', { name: 'Submit' }).click();
  
    // Check for HTML table
    const table = await page.getByRole('table')
    expect(table).not.toBeNull();
  });


