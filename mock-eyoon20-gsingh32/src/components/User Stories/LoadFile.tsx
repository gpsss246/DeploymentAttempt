import React, { ReactNode, useState } from "react";
import { MockedLoadData } from "../../mockdata/MockedJSON";

//The Load file function returns a string which tells us the status of the command.
export function LoadFile(fileName: string): string | ReactNode {
    //Gets data from our mock backend
     const message = MockedLoadData().get(fileName)?.get("message");
     
     // If a message exists for the given fileName, return it
     if (message) {
         return message;
     }
     
     // Otherwise, return a default message
     return "No message found for the specified file.";
 }