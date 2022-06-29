import React from 'react';

import { DbrButton } from 'shared/ui-kit/components/DbrButton';
import { SelectionActions } from 'modules/selection-wizard/types';

import './ActionsList.scss';

export interface ActionsListProps {
    submit: (action: SelectionActions) => void;
}

export const ActionsList:React.FC<ActionsListProps> = props => {
 const {submit} = props; 
 return <>
    <ul className='dbr-actions-list'>
        <DbrButton  click={()=>{submit(SelectionActions.complete)}}>Complete</DbrButton>
        <DbrButton  click={()=>{submit(SelectionActions.noObjects)}} variant='outlined' >No objects</DbrButton>
    </ul>
    <span onClick={()=>{submit(SelectionActions.skip)}} className='dbr-actions-skip'>Skip</span>
 </>;
}