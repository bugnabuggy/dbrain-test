import React, { useCallback, useMemo, useReducer } from 'react';

import { emptyFunc } from 'shared/common/helpers';
import { BoundingBox, ImageConversionSizes, SelectionOption } from 'shared/dbr-core/types';
import { DbrPageLayout } from 'shared/ui-kit/components/DbrPageLayout';

import { ImageSelectionService } from '../../services';
import { SelectionActions } from '../../types';
import { ActionPanel } from '../ActionPanel/ActionPanel';
import { SelectionArea } from '../SelectionArea/SelectionArea';

import './SelectionWizard.scss';


import { SelectionWizarReducer, defaultState, SelectionWizardActionTypes } from './SelectionWizarReducer';

export interface SelectionWizardProps {
}

export const SelectionWizard: React.FC<SelectionWizardProps> = props => {
    const { } = props;

    const imgSvc = useMemo(() => {
        return new ImageSelectionService();
    }, []);

    const [state, dispatch] = useReducer(SelectionWizarReducer, defaultState);

    console.log(state.currentStepIndex);
    const currentStepData = state.steps[state.currentStepIndex];

    const updateimageSizes = useCallback((sizes: ImageConversionSizes) => {
        dispatch({
            type: SelectionWizardActionTypes.updateImageSizes,
            data: sizes
        });
    }, [dispatch]);

    const addBBcallback = useCallback((bb: BoundingBox) => {
        dispatch({
            type: SelectionWizardActionTypes.addBB,
            data: bb
        });
    }, [dispatch]);

    const deleteBBcallback = useCallback((bb: BoundingBox) => {
        dispatch({
            type: SelectionWizardActionTypes.deleteBB,
            data: bb
        });
    }, [dispatch]);

    const submitCallback = useCallback((action: SelectionActions) => {
        const submitAction = ()=>{
            dispatch({
                type: SelectionWizardActionTypes.submit,
                data: undefined
            });
        };
        
        const actionsMap = {
            [SelectionActions.complete]: () => {
                const bBoxes = currentStepData.areas
                    // this is the main logic ↓
                    .map(area => imgSvc.toImageCoordinates(area, state.imageSizes));

                const result = bBoxes.reduce((acc, item) => {
                    acc.push([
                        [item.topLeft.x, item.topLeft.y],
                        [item.bottomRight.x, item.bottomRight.y]
                    ]);
                    return acc;
                }, [] as number[][][]);

                // this is the action from specification ↓
                console.log(result);

                submitAction();
            },
            [SelectionActions.noObjects]: submitAction,
            [SelectionActions.skip]: submitAction,
        } as Record<SelectionActions, () => void>;


        const submitFn = actionsMap[action] || emptyFunc;
        submitFn();

    }, [dispatch, currentStepData, state.imageSizes]);

    const selectOption = useCallback((option: SelectionOption) => {
        dispatch({
            type: SelectionWizardActionTypes.selectOption,
            data: option
        });
    }, [dispatch]);

    const content = state.processFinished
        ? <>Selection finished</>
        : <div className='flex-row'>
            <SelectionArea
                image={currentStepData.image}
                areas={currentStepData.areas}
                selectionOption={state.selectedOption}

                updateimageSizes={updateimageSizes}

                addBB={addBBcallback}
                deleteBB={deleteBBcallback}
            />

            <ActionPanel
                options={currentStepData.options}
                selectedOption={state.selectedOption}
                selectOption={selectOption}
                submit={submitCallback}
            />
        </div>;



    return <DbrPageLayout>
        {content}
    </DbrPageLayout>;
};
