import React from "react";
import { MockedViewData } from "../../mockdata/MockedJSON";

interface DataLoadedProps {
    loadedFilename: string;
}

export const DataLoadedAsTable: React.FC<DataLoadedProps> = ({ loadedFilename }) => {
    //If there is no file name, no file was loaded, we can not view. Returns information
    if (loadedFilename === "") {
        return <p>No file was loaded</p>;
    }
    //Gets data to view from our mock backend
    const data = MockedViewData().get(loadedFilename)?.get("data");
    //This is returned if there is no data for the given file
    if (!data) {
        return <div>No data found for the specified label.</div>;
    }

    const [headers, ...rows] = data;
    //Creates table
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
