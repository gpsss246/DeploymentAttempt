import { useState } from 'react';
import SwitchButton from './SwitchButton';
import '../styles/main.css';
import { REPLHistory } from './REPLHistory';
import { REPLInput } from './REPLInput';
import React, { ReactNode } from 'react';

export default function REPL() {
    //History contains commands and outputs
    const [history, setHistory] = useState<Array<{ command: string, output: string | ReactNode }>>([]);
    const [mode, setMode] = useState<boolean>(false)  // true for verbose, false for brief
    // We have created a switch button which lets you know which mode you are using.
    return (
        <div className="repl">
            <SwitchButton mode={mode} toggleMode={() => setMode(!mode)} />
            <REPLHistory commandAndOutputHistory={history} mode={mode} />
            <REPLInput setHistory={setHistory} setMode={setMode} mode={mode} />
        </div>
    );
}
