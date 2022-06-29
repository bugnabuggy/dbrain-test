import React, { ReactNode } from 'react';
import { AppInfo } from 'shared/dbr-core/types';

import { DbrHeader } from '../DbrHeader';

export interface DbrLayoutProps {
    children: ReactNode;
    appInfo: AppInfo
}

export const DbrLayout:React.FC<DbrLayoutProps> = props => {
 const { children, appInfo } = props; 

 return <>
    <DbrHeader actionElm={appInfo.actionNav} brandElm={appInfo.brandLogo}/>
    {children}
 </>;
}