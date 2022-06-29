import React, { ReactNode } from 'react';

import './DbrPageLayout.scss';

export interface DbrPageLayoutProps {
    children: ReactNode;
}

export const DbrPageLayout:React.FC<DbrPageLayoutProps> = props => {
 const {children} = props; 
 return <main className='dbr-page-layout'>
    {children}
 </main>;
}