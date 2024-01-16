import React from "react";
import {InputType} from "reactstrap/types/lib/Input";
import {EmailField} from "../HOC/FieldInputElements";
import {JsonInputComponentNameHandler} from "../JsonInputComponentNameHandler";
import {useFormContext} from "../../Context/FormContext";

export type TCustomInputProps = {
    name: string;
    type: InputType;
    value: string[];
    isRequired?: boolean
    className: string;
    label?: string;
    onChange: (value: string | string[]) => void,
    validation?: (name: string) => void,
}

export const JsonInputComponent: React.FC<TCustomInputProps> = ({
                                                                    name,
                                                                    value,
                                                                    isRequired,
                                                                    onChange,
                                                                    validation
                                                                }) => {

    const {formStore} = useFormContext();

    function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, entity: string, inputValueIndex: number) {
        e.preventDefault();
        const {nestedProperty} = JsonInputComponentNameHandler<string>(entity.toString())

        if (nestedProperty !== undefined) {
            formStore.deleteFormData(entity);
        }
        value.splice(inputValueIndex, 1);
        onChange([...value]);
    }

    function handleAdd(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        formStore.addNewDataInJsonInputElement(name);
        value.push("");
        onChange([...value]);
    }

    function handleInput(inputIndex: number, inputValue: string[]) {
        const newValue = inputValue.slice(1);
        onChange([...newValue]);
    }

    const inputComponents = value?.map((val, index) => {
        const name = `emails.${index}`;
        return (
            <span key={index}>
                <EmailField
                    name={name}
                    validation={validation}
                    onJsonInput={handleInput}
                />

                <button className={"ml-2"} onClick={(e) => handleDelete(e, name, index)}>Delete</button>
            </span>
        )

    })

    return (
        <span>
            {inputComponents}
            <div className={"py-4 ml-2"}>
            <button onClick={(e) => handleAdd(e)}>Add</button>
            </div>
        </span>
    );
};