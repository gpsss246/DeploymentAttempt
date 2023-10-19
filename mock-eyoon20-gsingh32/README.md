<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->


# Mock-eyoon20-gsingh32
<!-- ABOUT THE PROJECT -->
## Sprint 3: About Gurpartap and Eric's Mock

Mock is a front-end application that simulates loading, viewing and searching CSVs, targeted specifically for real estate developers but with features that are broadly usable for anyone that needs general manipulation of CSVs. There is the option to change between a brief and verbose `mode`, the former only showing command outputs and the latter showing both commands and their outputs in the message log.

There are two primary stakeholders for this program:
* Real Estate Developers who wish to pass in a file path and enter various commands- some commands include processing and searching through the data in the file. 
* Developers who want a front-end that takes in mock data with a full testing suite and functions `load_file`, `mode`, `view`, and `search`.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Running the Program

This is an example of how to run the program:
* **In terminal, in the directory with this repository:**:
```sh
  npm run start
   ```
* **load_file**:
```sh
  load_file csv_filepath
  ```
* **mode**:
```sh
  mode
  ```
* Alternatively, you can click the button on the top right to toggle between brief and verbose mode.

* **view**:
```sh
  view
  ```
* Note that with additional mock functionality, you can also specify to view a file you haven't loaded; this is only a feature of Mock and will not be possible in the full stack assignment.

* **search**:
```sh
  search column name, separated by underscores OR column index ... search value
  ```
* Note that with additional mock functionality, like with view, you can search in tables not loaded; this is to make mocking faster. It is not a possibility, however, to search and output a table without having first loaded a file.

### Testing

The Playwright tests together cover the functionality of Mock– they follows the pattern of navigating to a URL, interacting with the page, and asserting expectations.

### Types of Tests

- **UI Visibility**: Checks if essential UI elements like input bars and buttons are visible on page load.
- **File Loading**: Validates the behavior when trying to load a valid or invalid file path.
- **Command Validation**: Tests for known commands and also checks how the application handles unknown commands.
- **Mode Toggling**: Asserts the change in interface based on the mode - brief and verbose.
- **Data Operations**: Includes tests for commands like view and search, checking if they behave as expected on different datasets.

```javascript
test('description', async ({ page }) => {
    // Navigation and Interaction Steps
    await page.goto('http://localhost:5173/');
    await page.getByLabel('Command input').click();
    
    // Assertion
    await expect(page.getByText("Expected Text")).toBeVisible();
});
   ```
The next section covers this on a more macro scale with our design choices.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- Design Choices -->
## Design Choices
Within Mock, a few novel elements introduced room to make design choices that hadn't existed originally. First was the introduction of state: this meant including functions like `history` and `setHistory`, `isFileLoaded`, and `mode` and `setMode` for the state of the command and output history, the state of a loaded file, and the state of the mode respectively.

Second was, of course, the introduction of Mocks: following dependency injection principles introduced from last sprint, we considered making them able to be generally inputted into the program and to cover a wide variety of edge cases. NYC.csv is our main file for extracting data, and we have a single column dataset, empty dataset, and (too many columns) dataset to model how the frontend handles the biggest edge cases.

The data was stored as 2-Dimensional Typescript arrays and transformed into HTML tables in each of the respective React components for LoadFile, Search, and View.

Also, we used Maps for MockedJSON, for the following reason:

Predictable Key-Value Pairs: Unlike simple objects, Maps ensure that the keys retain their original order, allowing for predictable data extraction. This is crucial when rendering UI components that rely on the order of the data.

Direct Lookups: The usage of Maps allowed for direct O(1) lookups based on unique keys. In the context of MockedSearchData, we could quickly identify a specific dataset based on a unique search criterion, be it "Address-Brooklyn" or "Property_Value-$700,000".

Flexibility: Maps provide greater flexibility when it comes to key types. This meant we weren't confined to strings as keys and could, in future iterations, use functions, objects, or other types if the need arose.

### Dependency Injection

Decoupling: DI promotes a clear separation of concerns. Our React components become agnostic of the data source they interact with. Whether it's MockedLoadData or a future live data API, the components don't have to change. This decoupling facilitates easier code modifications in the future.

Facilitates Testing: Mock data, when combined with DI, makes testing more straightforward. Given that we can inject any dataset, testing how components handle various data scenarios becomes a breeze. Edge cases like "does-not-exist.csv" are easily emulated without making actual API calls.

Code Reusability: With DI, our code becomes more generic. For example, the searching mechanism is abstracted away from the actual data. This means that, if in the future, we decide to replace MockedJSON with actual API calls or another dataset, the core functionality remains reusable without massive overhauls.



<p align="right">(<a href="#readme-top">back to top</a>)</p>

