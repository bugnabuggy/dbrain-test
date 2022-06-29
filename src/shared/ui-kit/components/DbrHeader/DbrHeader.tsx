import React, { ReactNode } from 'react';

 import './DbrHeader.scss';

export interface DbrHeaderProps {
    brandElm: ReactNode;
    actionElm: ReactNode;
}


export const DbrHeader:React.FC<DbrHeaderProps> = props => {
 const {actionElm, brandElm} = props; 
 return <header className='dbr-header'>
        <div>{brandElm}</div>
        <div>{actionElm}</div>
 </header>;
}