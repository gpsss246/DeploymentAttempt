import "../styles/main.css";
import { Dispatch, SetStateAction, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import React, { ReactNode } from "react";
import { LoadFile } from "./User Stories/LoadFile";
import { DataLoadedAsTable } from "./User Stories/View";
import { DataSearchedAsTable } from "./User Stories/Search";
import { MockedSearchData } from "../mockdata/MockedJSON";

interface REPLInputProps {
  setHistory: Dispatch<
    SetStateAction<Array<{ command: string; output: string | ReactNode }>>
  >; // Allows us the set our history.
  setMode: Dispatch<SetStateAction<boolean>>;
  mode: boolean; //What mode we have our program on.
}

export function REPLInput(props: REPLInputProps) {
  // State to manage the current command
  const [commandString, setCommandString] = useState<string>("");
  // State to manage the current filename
  const [fileName, setFileName] = useState<string>("");
  const [isFileLoaded, setIsFileLoaded] = useState<boolean>(false);

  function handleSubmit(): void {
    // Ensure command is not empty
    if (commandString !== "") {
      let output: string | ReactNode = "Unknown command, Please use the following commands: load_file <filename>, view, mode, and search <column> <target>";
      const commandParts = commandString.split(" ");

      switch (commandParts[0]) {
        case "mode":
          // Toggle REPL mode
          props.setMode((prevMode) => !prevMode);
          return;
        case "load_file":
          // Load file command
          if (commandParts[1] == undefined) {
            output = "Please enter a file";
          } else {
            output = LoadFile(commandParts[1]);
            setFileName(commandParts[1]);
            setIsFileLoaded(true);
          }
          break;
        case "view":
          if (isFileLoaded) {
            // Display loaded data
            output = <DataLoadedAsTable loadedFilename={fileName} />;
          } else {
            output = "Please load a file first :3";
          }
          break;
        case "search":
          if (isFileLoaded) {
            // Handle search command
            if (commandParts[1] == undefined) {
              output = "Please enter a valid column name or column index to search";
            } else if (commandParts[2] == undefined) {
              output = "Please enter a value to search";
            } else {
              const column = commandParts[1];
              const term = commandParts[2];
              const searchResultMap = MockedSearchData().get(fileName)?.get(
                `${column}-${term}`
              );

              // Check if mock data exists for search criteria
              if (searchResultMap && searchResultMap.has("data")) {
                output = (
                  <DataSearchedAsTable
                    loadedFilename={fileName}
                    data={searchResultMap.get("data")!}
                  />
                );
              } else if (commandParts[1].includes("-")) {
                output =
                  "Please separate the column identifier and Search value with just a space and not a hyphen! (-)";
              } else {
                output = "No predefined results for your search.";
              }
            }
          } else {
            output = "Please load a file first :D";
          }
          break;
      }
      // Update command history
      props.setHistory((prevHistory) => [
        ...prevHistory,
        { command: commandString, output },
      ]);
    }
  }

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
