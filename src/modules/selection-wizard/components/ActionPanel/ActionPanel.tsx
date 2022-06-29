import React, { useState } from 'react';
import { SelectionOption } from 'shared/dbr-core/types';
import { ActionsList, ActionsListProps} from '../ActionsList/ActionsList';
import { OptionsList, OptionsListProps } from '../OptionsList/OptionsList';

import './ActionPanel.scss';

export interface ActionPanelProps extends OptionsListProps, ActionsListProps {
    
}

export const ActionPanel: React.FC<ActionPanelProps> = props => {
    const { options, selectedOption, selectOption, submit } = props;

    return <section className='dbr-action-panel'>
        <h3>Mark objects seen in the image</h3>
        <p className='mv-2'>Mark each object with an appropriate label using a bounding box too. If nothing fits, click the button for that. ⓘ </p>
        <OptionsList 
            options={options} 
            selectedOption={selectedOption}
            selectOption={selectOption}/>
        <ActionsList submit={submit}/>
    </section>;
};