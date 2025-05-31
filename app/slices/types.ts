export interface FormField {
    id: string,
    type: string,
    label: string,
    placeholder?: string,
    required?: boolean,
    options?: string[],
    helpText: string,
    pattern?: string,
    minLength?: number;
    maxLength?: number;
}