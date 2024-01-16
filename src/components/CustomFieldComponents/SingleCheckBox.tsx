import React from "react";
import {Input, Label} from "reactstrap";
import {InputType} from "reactstrap/types/lib/Input";

export type TCustomCheckBoxProps = {
    name: string;
    label?: string;
    type: InputType;
    className: string;
    boxValues?: string[];
    onChange: (value: string[]) => void
    value: any;
}

export const SingleCheckBox: React.FC<TCustomCheckBoxProps> = ({
                                                                     name,
                                                                     type,
                                                                     label,
                                                                     className,
                                                                     boxValues,
                                                                     onChange,
                                                                     value,
                                                                 }) => {
    let userChecked = value as string[];

    function handleChecked(e: React.ChangeEvent<HTMLInputElement>) {
        const {checked, value} = e.target;

        if (checked && userChecked) {
            onChange([...userChecked, value]);
        } else if (!checked && userChecked) {
            userChecked = userChecked.filter((checked) => {
                return checked !== value
            })
            onChange(userChecked);
        }
    }

    const checkBox = boxValues?.map((val, index) => {
        return (
            <span key={index} className={"pl-4"}>
                <Input
                    name={name}
                    type={type}
                    placeholder={label}
                    checked={userChecked.includes(val)}
                    className={className}
                    value={val}
                    onChange={(e) => handleChecked(e)}
                />
                <Label htmlFor={val}>{val}</Label>
            </span>
        )
    })
    return (
        <>
            {checkBox}
        </>
    );
}