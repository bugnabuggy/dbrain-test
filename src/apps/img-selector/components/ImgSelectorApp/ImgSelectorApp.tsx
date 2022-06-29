import React, { useMemo } from 'react';

import { AppInfo } from 'shared/dbr-core/types';
import { ErrorBoundary } from 'shared/common';
import { DbrLayout } from 'shared/ui-kit/components/DbrLayout';

import { SelectionWizard } from 'modules/selection-wizard/components';

import './ImgSelectorApp.scss';
import { ActionNav } from '../ActionNav';


export const ImgSelectorApp: React.FC<any> = (props) => {
  const appInfo = useMemo(() => {
    return {
      title: 'DBrain test task - image resizer',
      brandLogo: <h3 className='p-2'>Dbrain ®</h3>,
      actionNav: <ActionNav/>
    } as AppInfo
  },[]);

  return (
    <ErrorBoundary>
      <DbrLayout appInfo={appInfo}>
          <SelectionWizard />
      </DbrLayout> 
    </ErrorBoundary>
  );
}

export default ImgSelectorApp;
