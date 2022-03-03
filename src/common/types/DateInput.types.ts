export type DateInputProps = {
    required: boolean,
    onChange: Function,
    id: string,
    label: string,
    value: Date,
    type: string,
    inputClass?: string,
    field: string
};

export type OnChangeDateModel = {
    value: Date,
    error: string,
    touched: boolean
};