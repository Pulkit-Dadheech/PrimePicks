import {createContext, useContext} from 'react';

export interface IFormContext<T> {
    formStore: T;
}

export const FormContext = createContext<IFormContext<any> | undefined>(undefined);

export const useFormContext = () => {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
};
