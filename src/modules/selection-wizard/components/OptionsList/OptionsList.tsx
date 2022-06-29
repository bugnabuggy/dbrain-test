import React from 'react';
import { SelectionOption } from 'shared/dbr-core/types';

import './OptionsList.scss';

export interface OptionsListProps {
    options: SelectionOption[];
    
    selectedOption: SelectionOption;
    selectOption: (val: SelectionOption) => void;
}

export const OptionsList:React.FC<OptionsListProps> = props => {
 const {options, selectedOption, selectOption} = props; 

 return  <ul className='dbr-option-list'>
 {options.map((option) => <li
     key={JSON.stringify(option)}
     onClick={() => {
         selectOption(option);
     }}
     className={`dbr-option-list-item ${selectedOption === option ? 'active' : ''}`} >
     {`${option.value}. ${option.lable}`}
 </li>)}
</ul>;
}