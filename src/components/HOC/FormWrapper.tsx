import React, {ReactNode, useEffect} from 'react';
import {FormContext} from '../../Context/FormContext';
import {FormStore, IFormDataValue} from "../../store/FormStore";

interface IFormComponentProps<T> {
    formStore: FormStore<Record<keyof T, IFormDataValue>>;
    onSubmit: (formStore: Record<keyof T, IFormDataValue>) => void;
    onReset: (e: React.SyntheticEvent) => void;
    children: ReactNode;
}

export default function FormWrapper<T>({
                                           formStore,
                                           onSubmit,
                                           onReset,
                                           children
                                       }: IFormComponentProps<Record<keyof T, IFormDataValue>>) {

    useEffect(() => {
        formStore.resetFormData();
    }, []);

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onSubmit(formStore.formData);
    };

    const handleReset = (e: React.SyntheticEvent) => {
        formStore.resetFormData();
        onReset(e);
    };

    return (
        <FormContext.Provider value={{formStore}}>
            <form onSubmit={(e) => handleSubmit(e)} className={"product-form"}>
                {children}
                <button
                    type="submit"
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={(e) => handleReset(e)}
                >
                    Reset
                </button>
            </form>
        </FormContext.Provider>
    );
}
