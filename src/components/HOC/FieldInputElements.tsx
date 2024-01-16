import React from "react";
import {fieldComponentHOC} from "./fieldComponentHOC";
import {TFormFieldComponents} from "./FormField";
import {CustomInput} from "../CustomFieldComponents/CustomInput";
import {MultipleCheckBox} from "../CustomFieldComponents/MultipleCheckBox";
import {CustomSelect} from "../CustomFieldComponents/CustomSelect";
import {CustomRadioInput} from "../CustomFieldComponents/CustomRadioInput";
import {SingleCheckBox} from "../CustomFieldComponents/SingleCheckBox";
import {JsonInputComponent} from "../CustomFieldComponents/JsonInputComponents";

export type WrappedInputProps = {
    name: string
    label?: string
    boxValues?: string[];
    option?: string[];
    validation?: (name: string,index?:number) => void
    checkBoxText?: string;
    index?: number;
    onJsonInput?: (inputIndex: number, inputValue: string[]) => void;
}
const EmailInputElement = (fieldProps: TFormFieldComponents) => {
    return (
        <>
            <CustomInput
                type={"email"}
                className="p-3 rounded-pill"
                {...fieldProps}
            />
        </>
    );
};

const NameInputElement = (fieldProps: TFormFieldComponents) => {
    return (
        <>
            <CustomInput
                type={"text"}
                className="p-3 rounded-pill"
                {...fieldProps}
            />
        </>
    );
}

const PasswordInputElement = (fieldProps: TFormFieldComponents) => {
    return (
        <>
            <CustomInput
                type={"password"}
                className="p-3 rounded-pill"
                {...fieldProps}
            />
        </>
    );
}
const MessageInputElement = (fieldProps: TFormFieldComponents) => {
    return (
        <>
            <CustomInput
                type={"textarea"}
                className={"p-3 rounded-pill"}
                {...fieldProps}
            />
        </>
    )
}
const NumberInputElement = (fieldProps: TFormFieldComponents) => {
    return (
        <>
            <CustomInput
                type={"number"}
                className={"p-3 rounded-pill"}
                {...fieldProps}
            />
        </>
    )
}
const DateInputElement = (fieldProps: TFormFieldComponents) => {
    return (
        <>
            <CustomInput
                type={"date"}
                className={"p-3 rounded-pill"}
                {...fieldProps}
            />
        </>
    )
}

const SingleCheckBoxInputField = (fieldProps: TFormFieldComponents) => {
    return (
        <>
            <SingleCheckBox
                type={"checkbox"}
                className={"p-3 "}
                {...fieldProps}/>
        </>
    )
}
const MultipleCheckBoxInputField = (fieldProps: TFormFieldComponents) => {
    return (
        <>
            <MultipleCheckBox
                type={"checkbox"}
                className={"p-3 "}
                {...fieldProps}/>
        </>
    )
}
const SelectInputElement = (fieldProps: TFormFieldComponents) => {
    return (
        <>
            <CustomSelect type={"select"} className={"p-1"} {...fieldProps}/>
        </>
    )
}

export const RadioInputField = (fieldProps: TFormFieldComponents) => {
    return (
        <>
            <CustomRadioInput
                type={"radio"}
                className={"p-3"}
                {...fieldProps}/>
        </>
    )
}

export const JsonInputField = (fieldProps: TFormFieldComponents) => {
    return (
        <>
            <JsonInputComponent
                type={"email"}
                className={"p-3"}
                {...fieldProps}
            />
        </>
    )
}


export const EmailField = fieldComponentHOC(EmailInputElement);
export const NameField = fieldComponentHOC(NameInputElement);
export const PasswordField = fieldComponentHOC(PasswordInputElement);
export const MessageField = fieldComponentHOC(MessageInputElement);
export const NumberField = fieldComponentHOC(NumberInputElement);
export const DateField = fieldComponentHOC(DateInputElement);

export const SelectField = fieldComponentHOC(SelectInputElement);
export const SingleCheckBoxField = fieldComponentHOC(SingleCheckBoxInputField);
export const MultipleCheckBoxField = fieldComponentHOC(MultipleCheckBoxInputField);

export const RadioField = fieldComponentHOC(RadioInputField);

export const JsonInputComponentField=fieldComponentHOC(JsonInputField);




