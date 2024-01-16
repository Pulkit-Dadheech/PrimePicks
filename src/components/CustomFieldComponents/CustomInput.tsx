import React from "react";
import {InputType} from "reactstrap/types/lib/Input";


export type TCustomInputProps = {
    name: string;
    type: InputType;
    value: any;
    className: string;
    label?: string;
    onChange: (value: string, index?: number) => void
    index?: number
}

export const CustomInput: React.FC<TCustomInputProps> = ({
                                                             name,
                                                             type,
                                                             value,
                                                             label,
                                                             className,
                                                             onChange
                                                         }) => {

    const indexMatch = name.split(".");
    const index = parseInt(indexMatch[1], 10);
    const newName = indexMatch[0];

    return (
        <input
            name={newName}
            type={type}
            placeholder={label}
            className={"input-field"}
            value={value}
            onChange={(e) => onChange(e.target.value, index)}
        />
    );
};