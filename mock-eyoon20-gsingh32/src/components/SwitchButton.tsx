import React from 'react';
import '../styles/SwitchButton.css';

interface SwitchButtonProps {
    mode: boolean; // true for verbose, false for brief
    toggleMode: () => void; //Can also be changed via the button -- mode can also be toggled/switched by clicking this button
}
//This changes when you change the command to let the user know which mode they are on
const SwitchButton: React.FC<SwitchButtonProps> = ({ mode, toggleMode }) => {
    return (
        <div className="switch-container" onClick={toggleMode}>
            <div className={`circle ${mode ? 'right' : 'left'}`}></div>
            <div className="mode-text">{mode ? 'Verbose' : 'Brief'}</div>
        </div>
    );
}

export default SwitchButton;