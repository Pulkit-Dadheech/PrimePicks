import React from "react";
import {Input, Label} from "reactstrap";
import {InputType} from "reactstrap/types/lib/Input";

export type TCustomCheckBoxProps = {
    name: string;
    label?: string;
    value: any;
    type: InputType;
    className: string;
    boxValues?: string[],
    onChange: (value: string) => void
}

export const CustomRadioInput: React.FC<TCustomCheckBoxProps> = ({
                                                                     name,
                                                                     type,
                                                                     className,
                                                                     boxValues,
                                                                     onChange,
                                                                     value,
                                                                 }) => {


    const radioFields = boxValues?.map((val, index) => {
        return (
            <div key={index} className={"pl-4"}>
                <input
                    name={name}
                    type={type}
                    className={className}
                    checked={val === value}
                    value={val}
                    onChange={(e)=>{if(e.target.checked) onChange(e.target.value)}}
                />
                <label className={"radio-label"}>{val}</label>
            </div>
        )
    })

    return (
        <>
            {radioFields}
        </>
    );
};

