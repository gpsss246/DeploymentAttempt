import '../styles/main.css';
import React, { ReactNode } from 'react';

interface REPLHistoryProps {
    commandAndOutputHistory: Array<{ command: string, output: string | ReactNode }>; // Where our history is displayed
    mode: boolean; //Used to tel us what to display
}
//this function returns a React.Fragrement, which depending on what our mode is, displays our output.
export function REPLHistory(props: REPLHistoryProps) {
    return (
        <div className="repl-history">
            {props.commandAndOutputHistory.map((item, id) => (
                <React.Fragment key={id}>
                    {props.mode && <p>{item.command}</p>}
                    {typeof item.output === 'string' ? <p>{item.output}</p> : item.output}
                </React.Fragment>
            ))}
        </div>
    );
}