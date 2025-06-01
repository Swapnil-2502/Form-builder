import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "../utils/localStorage"


export interface FormField {
    id: string,
    type: string,
    label: string,
    placeholder?: string,
    required?: boolean,
    options?: string[],
    helpText?: string,
    pattern?: string,
    minLength?: number;
    maxLength?: number;
}

interface Step{
    id: string,
    title: string,
    fieldIds: string[]
}

interface FormBuilderState {
    fields: FormField[];
    selectedFieldId: string | null;
    isPreviewMode: boolean;
    steps: Step[];
    currentStepIndex: number;
}

const loaded = loadFromLocalStorage();

const initialState: FormBuilderState = {
  fields: Array.isArray(loaded?.fields) ? loaded.fields : [],
  selectedFieldId: null,
  isPreviewMode: false,
  steps: Array.isArray(loaded?.steps) ? loaded.steps : [{
    id: "step-1",
    title: "Step 1",
    fieldIds: [],
  }],
  currentStepIndex: typeof loaded?.currentStepIndex === "number" ? loaded.currentStepIndex : 0,
};


const formBuilderSlice = createSlice({
    name: "formBuilder",
    initialState,
    reducers: {
        addField: (state, action: PayloadAction<FormField>) => {
            state.fields.push(action.payload)
            const currentStep = state.steps[state.currentStepIndex]
            currentStep.fieldIds.push(action.payload.id)
        },
        updateField: (state, action: PayloadAction<{id: string; updated: Partial<FormField>}>)=>{
            const field = state.fields.find( f => f.id === action.payload.id)
            if(field){
                Object.assign(field, action.payload.updated);
            }
        },
        deleteField: (state, action: PayloadAction<string>)=>{
            state.fields = state.fields.filter(field => field.id !== action.payload)
        },
        selectField: (state, action: PayloadAction<string | null>) => {
            state.selectedFieldId = action.payload
        },
        reorderFields: (state, action: PayloadAction<FormField[]>)=>{
            state.fields = action.payload;
        },
        clearForm: (state) => {
            state.fields = [];
            state.selectedFieldId = null;
            state.steps = [
                {
                id: "step-1",
                title: "Step 1",
                fieldIds: [],
                }
            ];
            state.currentStepIndex = 0;
        },
        togglePreviewMode(state) {
            state.isPreviewMode = !state.isPreviewMode;
        },
        setPreviewMode(state, action: PayloadAction<boolean>) {
            state.isPreviewMode = action.payload;
        },
        importFields: (state, action: PayloadAction<FormField[]>) => {
            state.fields = action.payload;
            state.selectedFieldId = null;
        },
        setFields: (state, action: PayloadAction<FormField[]>) => {
            state.fields = action.payload;
            state.selectedFieldId = null;
        },
        setCurrentStepIndex: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0 && action.payload < state.steps.length) {
                state.currentStepIndex = action.payload;
            }
        },
        addStep: (state) => {
            const newStepId = `step-${state.steps.length + 1}`;
            const newStep = {
                id: newStepId,
                title: `Step ${state.steps.length + 1}`,
                fieldIds: []
            }
            state.steps.push(newStep);
        },
        goToNextStep: (state) => {
            if (state.currentStepIndex < state.steps.length - 1) {
                state.currentStepIndex += 1;
            }
        },
        goToPreviousStep: (state) => {
            if (state.currentStepIndex > 0) {
                state.currentStepIndex -= 1;
            }
        },
        updateStepFieldIds: (state, action: PayloadAction<Step[]>) => {
            state.steps = action.payload;
        },
        loadTemplate: (state, action: PayloadAction<FormField[]>) => {
            state.fields = action.payload;
            state.steps = [
                {
                id: "step-1",
                title: "Step 1",
                fieldIds: action.payload.map(field => field.id),
                }
            ];
            state.currentStepIndex = 0;
            state.selectedFieldId = null;
        },
    }
})

export const {
    addField,
    updateField,
    deleteField,
    selectField,
    reorderFields,
    clearForm,
    togglePreviewMode,
    setPreviewMode,
    importFields,
    setFields,
    setCurrentStepIndex,
    addStep,
    goToNextStep,
    goToPreviousStep,
    updateStepFieldIds,
    loadTemplate
} = formBuilderSlice.actions


export default formBuilderSlice.reducer