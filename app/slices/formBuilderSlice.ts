import { createSlice, PayloadAction } from "@reduxjs/toolkit";


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

interface FormBuilderState {
    fields: FormField[];
    selectedFieldId: string | null;
    isPreviewMode: boolean;
}

const initialState: FormBuilderState = {
    fields: [],
    selectedFieldId: null,
    isPreviewMode: false, 
};

const formBuilderSlice = createSlice({
    name: "formBuilder",
    initialState,
    reducers: {
        addField: (state, action: PayloadAction<FormField>) => {
            state.fields.push(action.payload)
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
            state.fields = [],
            state.selectedFieldId = null
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
        }
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
    setFields
} = formBuilderSlice.actions


export default formBuilderSlice.reducer