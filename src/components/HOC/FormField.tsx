import React from "react";
import {observer} from "mobx-react-lite";
import "../customProduct/CustomProductForm/ProductForm.css"
import {JsonInputComponentNameHandler} from "../JsonInputComponentNameHandler";
import {IFormProps} from "../customProduct/CustomProductForm/CustomProductsForm";
import {useFormContext} from "../../Context/FormContext";

export type TFormFieldComponents = {
    name: string;
    label?: string;
    value: any;
    boxValues?: string[] | undefined;
    selectData?: string[];
    options?: string[];
    isRequired?: boolean;
    onChange: (value: string | string[] | boolean, index?: number) => void;
    checkBoxText?: string;
    validation?: (name: string) => void;
    index?: number;
}

export type TFieldPropsWithRender = {
    name: string;
    label?: string;
    boxValues?: string[] | undefined;
    options?: string[] | undefined;
    validation?: (name: string, index?: number) => void;
    checkBoxText?: string;
    index?: number
    onJsonInput?: (inputIndex: number, inputValue: string[]) => void;
    render: ({fieldProps}: {
        fieldProps: TFormFieldComponents;
    }) => JSX.Element
}

const FormField = observer((props: TFieldPropsWithRender) => {
    const {formStore: store} = useFormContext();
    const {baseEntity} = JsonInputComponentNameHandler<IFormProps>(props.name.toString())
    let errorMessage = store.getErrorField(props.name);
    const handleChange = (value: string | string[] | boolean) => {
        store.updateFormData(props.name, value);
        if (props.validation) {
            props.validation(props.name);
        }
        if (props.onJsonInput && props.index) {
            props.onJsonInput((props.index), store.getValue(props.name))
        }
    };
    return (
        <div className={"p-1"}>
            {props.label && <label className="label">
                {props.label}
                {store.formData[baseEntity].isRequired && <span className="text-danger">*</span>}
            </label>}
            {props.label && <br/>}
            {props.render({
                fieldProps: {
                    name: props.name,
                    label: props.label,
                    isRequired: store.formData[baseEntity].isRequired,
                    value: store.getValue(props.name),
                    boxValues: props.boxValues,
                    onChange: handleChange,
                    checkBoxText: props.checkBoxText,
                    validation: props.validation,
                },
            })}
            {errorMessage && (<p className={"text-danger"}>{errorMessage}</p>)}
        </div>
    )
});

export default FormField;
