import React from "react";
import { MockedSearchData } from "../../mockdata/MockedJSON";

interface DataSearchedProps {
    loadedFilename: string;
    data: string[][];
}

export const DataSearchedAsTable: React.FC<DataSearchedProps> = ({ loadedFilename, data }) => {

    
    if (!data || data.length === 0) {
        return <div>No data found for your search.</div>;
    }

     // Check if loadedFilename contains a hyphen
     if (loadedFilename.includes("-")) {
        return <div>Please separate the column identifier and Search value with just a space and not a hyphen! (-)</div>;
    }


    const [headers, ...rows] = data;

    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
