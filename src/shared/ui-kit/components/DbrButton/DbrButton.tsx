import React, { ReactNode } from 'react';

import './DbrButton.scss';

export interface DbrButtonProps {
    children: ReactNode;

    click: () => void;
    variant?: 'contained' | 'outlined'
}

export const DbrButton:React.FC<DbrButtonProps> = props => {
 const { variant, children, click } = props; 
 return <button onClick={click} className={`dbr-button ${variant || 'contained'}`}>
    {children}
 </button>;
}