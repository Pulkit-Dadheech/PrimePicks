import React from "react";
import FormField, {TFormFieldComponents} from "./FormField";
import {WrappedInputProps} from "./FieldInputElements";

export const fieldComponentHOC = (WrappedComponent: (fieldProps: TFormFieldComponents) => JSX.Element) => {
    return function FieldComponentHOC(props: WrappedInputProps) {
        return (
            <FormField
                name={props.name}
                label={props.label}
                boxValues={props.boxValues}
                options={props.option}
                validation={props.validation}
                checkBoxText={props.checkBoxText}
                index={props.index}
                onJsonInput={props.onJsonInput}
                render={({fieldProps}) => (
                    <WrappedComponent {...fieldProps}/>
                )}
            />
        );
    };
};
