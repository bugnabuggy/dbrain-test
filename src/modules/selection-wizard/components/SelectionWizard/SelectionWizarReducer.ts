import { Action } from "shared/common/types";
import {
  BoundingBox,
  ImageConversionSizes,
  ImageSize,
  SelectionOption,
} from "shared/dbr-core/types";

import Image1 from "apps/img-selector/assets/two-cows.jpg";
import Image2 from "apps/img-selector/assets/field.jpg";

interface SelectionStep {
  image: string;
  areas: BoundingBox[];
  options: SelectionOption[];
}

interface SelectionWizarState {
  currentStepIndex: number;
  selectedOption: SelectionOption;
  imageSizes: ImageConversionSizes;

  steps: SelectionStep[];

  processFinished: boolean;
}

export enum SelectionWizardActionTypes {
  submit = "submit",
  selectOption = "selectOption",
  updateImageSizes = "updateImageSizes", // when new image shown, update info about it
  addBB = "addBB", // 'add Bounding Box',
  deleteBB = "deleteBB", // 'delete Bounding Box'
}

type SelectionWizardAction<T> = Action<SelectionWizardActionTypes, T>;
type SelectionWizarActionFunction<T = any> = (
  state: SelectionWizarState,
  action: SelectionWizardAction<T>
) => SelectionWizarState;

const defaultOption = { lable: "", value: "" }as SelectionOption;
const defaultSize = { height: 0, width: 0 } as ImageSize;
const defaultOptions = [
  {
    value: 1,
    lable: "Sheep",
  },
  {
    value: 2,
    lable: "Goat",
  },
  {
    value: 3,
    lable: "Cow",
  },
] as SelectionOption[];

export const defaultState = {
  currentStepIndex: 0,
  selectedOption:{...defaultOption},
  imageSizes: {
    client: { ...defaultSize },
    natural: { ...defaultSize },
  },

  steps: [
    {
      image: Image1,
      areas: [],
      options: [...defaultOptions],
    },
    {
      image: Image2,
      areas: [],
      options: [...defaultOptions],
    },
  ],
  processFinished: false
} as SelectionWizarState;

const submitAction: SelectionWizarActionFunction<void> = (state, action) => {
  const nextStepIndex = state.currentStepIndex + 1;
  const finished = nextStepIndex >= state.steps.length;

  const newState: SelectionWizarState = {
    ...state,
    selectedOption: {...defaultOption},
    currentStepIndex: finished ? state.currentStepIndex: nextStepIndex,
    processFinished: finished
  };
  return newState;
};

const selectedOptionAction: SelectionWizarActionFunction<SelectionOption> = (
  state,
  action
) => {
  const newState: SelectionWizarState = {
    ...state,
    selectedOption: action.data,
  };
  return newState;
};

const updateImageSizesAction: SelectionWizarActionFunction<
  ImageConversionSizes
> = (state, action) => {
  const newState: SelectionWizarState = {
    ...state,
    imageSizes: action.data,
  };
  return newState;
};

const addBBAction: SelectionWizarActionFunction<BoundingBox> = (
  state,
  action
) => {
  const steps = state.steps.map((step, i) => {
    const isCurrent = i === state.currentStepIndex;
    return isCurrent
      ? ({
          ...step,
          areas: [...step.areas, action.data],
        } as SelectionStep)
      : step;
  });

  const newState: SelectionWizarState = {
    ...state,
    steps,
  };
  return newState;
};

const deleteBBAction: SelectionWizarActionFunction<BoundingBox> = (
  state,
  action
) => {
  const steps = state.steps.map((step, i) => {
    const isCurrent = i === state.currentStepIndex;
    return isCurrent
      ? ({
          ...step,
          areas: step.areas.filter((area) => area !== action.data),
        } as SelectionStep)
      : step;
  });

  const newState: SelectionWizarState = {
    ...state,
    steps,
  };
  return newState;
};

const actionFunctins = {
  [SelectionWizardActionTypes.submit]: submitAction,
  [SelectionWizardActionTypes.updateImageSizes]: updateImageSizesAction,
  [SelectionWizardActionTypes.addBB]: addBBAction,
  [SelectionWizardActionTypes.deleteBB]: deleteBBAction,
  [SelectionWizardActionTypes.selectOption]: selectedOptionAction,
} as Record<SelectionWizardActionTypes, SelectionWizarActionFunction>;

export const SelectionWizarReducer: SelectionWizarActionFunction = (
  state,
  action
) => {
  // get action function
  const actionFn = actionFunctins[action.type];

  // return either result of action function or current state
  return actionFn ? actionFn(state, action) : state;
};
