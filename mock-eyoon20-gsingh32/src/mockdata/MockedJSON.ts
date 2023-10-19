
// The perfect mock dataset: no edgecases and well organized.
export const mockLoadedDataNYC: string[][] = [
    ["Address", "Property Value", "Square Footage in ft^2", "Year Built", "# of Bedrooms", "# of Bathrooms"],
    ["123 Lavender St, Brooklyn, NY 11201", "$850,000", "1,500 ft^2", "1945", "3", "2.0"],
    ["789 Brookie St, Queens, NY 11375", "$780,000", "1,400 ft^2", "1955", "2", "1.0"],
    ["420 Oak St, Manhattan, NY 10001", "$1,500,000", "900 ft^2", "1920", "1", "1.0"],
    ["123 ABC St, Bronx, NY 10467", "$620,000", "1,800 ft^2", "1975", "3", "2.0"],
    ["234 Maple St, Staten Island, NY 10310", "$700,000", "2,000 ft^2", "1965", "4", "2.5"],
    ["567 Birch St, Brooklyn, NY 11230", "$810,000", "1,600 ft^2", "1930", "3", "2.0"],
    ["890 Cedar St, Queens, NY 11374", "$755,000", "1,500 ft^2", "1980", "3", "1.5"],
    ["345 Spruce St, Manhattan, NY 10016", "$1,200,000", "850 ft^2", "1910", "2", "1.0"],
    ["678 Fir St, Bronx, NY 10458", "$640,000", "1,750 ft^2", "1960", "4", "2.0"],
    ["912 Redwood St, Staten Island, NY 10309", "$715,000", "1,950 ft^2", "1950", "3", "2.5"]
];

// Our one column mock dataset
export const mockLoadedDataOneColumn: string [][] = [
    ["Desserts"],
    ["Brookie"],
    ["Cookie"],
    ["Warm Apple Pie with Ice Cream"],
    ["Gurpoptart"]
];
//Our mock data for load, which mimics what load would display on server
export function MockedLoadData() : Map<string,Map<string,string>> {

    let map = new Map<string ,Map<string,string>>();
    let mapError1 = new Map<string,string>([
        ["result","failed"],
        ["message", "The file /does-not-exist.csv does not exist, please enter a valid file"]
    ]);

    let mapError2 = new Map<string,string>([
        ["result","failed"],
        ["message", "Please enter a file."]
    ]);

    let csvLoad = new Map<string,string>([
        ["result","success"],
        ["message", "File '/NYC.csv has been successfully loaded'"]
    ]);

    let csvLoadOneColumns = new Map<string,string>([
        ["result","success"],
        ["message", "File '/one_column.csv has been successfully loaded'"]
    ]);

    map.set("/does-not-exist.csv",mapError1);
    map.set("",mapError2);
    map.set("/NYC.csv",csvLoad);
    map.set("/one_column.csv",csvLoadOneColumns)

    return map;

}

export function MockedViewData(): Map<string, Map<string, string[][]>> {

    const errorMessage: string[][] = [["Error: /does-not-exist.csv could not be loaded."]];

    let map = new Map<string, Map<string, string[][]>>();

    let mockViewResultSuccessNYC = new Map<string, string[][]>([
        ["result", [["Success"]]],
        ["data", mockLoadedDataNYC]
    ]);

    let mockViewResultError = new Map<string, string[][]>([
        ["result", [["Error"]]],
        ["data", errorMessage]
    ]);

    let mockViewResultOneColumn = new Map<string, string[][]>([
        ["result", [["Error"]]],
        ["data", mockLoadedDataOneColumn]
    ]);

    map.set("/NYC.csv", mockViewResultSuccessNYC);
    map.set("/does-not-exist.csv", mockViewResultError);
    map.set("/one_column.csv",mockViewResultOneColumn)

    return map;
}



export function MockedSearchData(): Map<string,Map<string, Map<string, string[][]>>> {
    
    // Taking in rows from mockLoadedData1
    const mockNYCSearch1: string[][] = [
        mockLoadedDataNYC[0], // Header
        mockLoadedDataNYC[1],
        mockLoadedDataNYC[6]
    ];

    const mockNYCSearch2: string[][] = [
        mockLoadedDataNYC[0], // Header
        mockLoadedDataNYC[5],
    ];

    const mockNYCSearch3: string[][] = [
        mockLoadedDataNYC[0], // Header
        mockLoadedDataNYC[3]
    ];

    const mockNYCSearch4: string[][] = [
        mockLoadedDataNYC[0], // Header
        mockLoadedDataNYC[2],
        mockLoadedDataNYC[3],
        mockLoadedDataNYC[8]
    ];

    const mockNYCSearch5: string[][] = [
        mockLoadedDataNYC[0], // Header
        mockLoadedDataNYC[2],
        mockLoadedDataNYC[8]
    ];

    const mockOneColumnSearch1: string[][] = [
        mockLoadedDataOneColumn[0],
        mockLoadedDataOneColumn[1],
    ]
   
    let mapNYC = new Map<string, Map<string, string[][]>>();

    // Using the pattern "column-term" for the key

    //Using column name to search
    mapNYC.set("Address-Brooklyn", new Map<string, string[][]>([
        ["result", [["Success"]]],
        ["data", mockNYCSearch1]
    ]));
    
    mapNYC.set("Property_Value-$700,000", new Map<string, string[][]>([
        ["result", [["Success"]]],
        ["data", mockNYCSearch2]
    ]));

    // Using column index for search
    mapNYC.set("3-1920", new Map<string, string[][]>([
        ["result", [["Success"]]],
        ["data", mockNYCSearch3]
    ]));  

    mapNYC.set("0-Queens", new Map<string, string[][]>([
        ["result", [["Success"]]],
        ["data", mockNYCSearch4]
    ]));  

    mapNYC.set("4-2", new Map<string, string[][]>([
        ["result", [["Success"]]],
        ["data", mockNYCSearch5]
    ]));  

    let mapOneColumn = new Map<string, Map<string, string[][]>>();
    mapOneColumn.set("Desserts-Brookie", new Map<string, string[][]>([
        ["result", [["Success"]]],
        ["data", mockOneColumnSearch1]
    ]));   



    let mapWithFileName =new Map<string,Map<string, Map<string, string[][]>>>();
    mapWithFileName.set("/NYC.csv",mapNYC);
    mapWithFileName.set("/one_column.csv",mapOneColumn)



    return mapWithFileName;
}