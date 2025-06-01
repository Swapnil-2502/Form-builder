import { FormField } from "../slices/formBuilderSlice";


const STORAGE_KEY = "formBuilderFields";

export const saveToLocalStorage = (fields: FormField[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fields));
}

export const loadFromLocalStorage = (): FormField[] => {
    try{
        const data = localStorage.getItem(STORAGE_KEY)
        return data ? JSON.parse(data) : [];
    }
    catch(error){
        console.log(error)
        return [];
    }
}

export const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY)
}