import {action, makeObservable, observable} from "mobx";
import {setLocalStorageData} from "../components/SessionStorageHandler/SessionStorageHandler";
import {JsonInputComponentNameHandler} from "../components/JsonInputComponentNameHandler";

export interface IFormDataValue {
    value: any;
    isRequired?: boolean;
    error?: string | string[];

    [x: number]: IFormDataValue;

    [x: string]: any;
}

export class FormStore<T extends Record<keyof T, IFormDataValue>> {
    @observable formData: T;
    initialData: T;
    @observable errorMessage: string;
    @observable customId: number = 0;
    @observable successMessage: string = "";

    constructor(initialData: T) {
        this.formData = initialData;
        this.initialData = initialData;
        this.errorMessage = "";
        makeObservable(this);
    }

    getValue(entity: keyof T) {
        const {baseEntity, nestedProperty} = JsonInputComponentNameHandler<T>(entity.toString())

        if (nestedProperty !== undefined) {
            const index = parseInt(nestedProperty, 10);

            if (index >= 0) {
                if (typeof (this.formData[baseEntity][nestedProperty]) !== 'object') {
                    return undefined;
                }
                return this.formData[baseEntity][nestedProperty].value;

            }
        }
        return this.formData[entity].value;
    }

    getErrorField(entity: keyof T) {

        const {baseEntity, nestedProperty} = JsonInputComponentNameHandler<T>(entity.toString())

        if (nestedProperty !== undefined) {
            const index = parseInt(nestedProperty, 10);
            if (!isNaN(index)) {
                if (!this.formData[baseEntity][index]) {
                    return undefined;
                }
                return this.formData[baseEntity][index].error;

            }
        }
        return this.formData[entity].error;
    }


    @action addErrorField(entity: keyof T, error: any) {
        const {baseEntity, nestedProperty} = JsonInputComponentNameHandler<T>(entity.toString())

        if (nestedProperty !== undefined) {
            const index = parseInt(nestedProperty, 10);

            if (this.formData[baseEntity] && typeof this.formData[baseEntity] === 'object') {
                if (this.formData[baseEntity][index]) {
                    this.formData[baseEntity][index].error = error;
                } else {
                    console.error(`Array index ${index} is out of bounds for ${baseEntity.toString()}`);
                }
            } else {
                console.error(`Invalid or missing array ${baseEntity.toString()}`);
            }
        } else {
            this.formData[entity].error = error;
        }
    }

    @action
    updateErrorMessage(message: string) {
        this.errorMessage = message;
    }

    @action
    addNewDataInJsonInputElement(entity: keyof T) {
        let newObjectLength = 0;
        Object.keys(this.formData[entity]).forEach((key) => {
            if (typeof this.formData[entity][key] === "object" && key !== "value") {
                ++newObjectLength;
            }
        })
        this.formData[entity][newObjectLength] = {value: ""};
    }

    @action
    updateFormData<K extends keyof T>(entity: K, value: T[K]['value']) {
        this.errorMessage = "";
        const {baseEntity, nestedProperty} = JsonInputComponentNameHandler<T>(entity.toString())

        if (nestedProperty !== undefined) {
            const index = parseInt(nestedProperty, 10);

            if (!isNaN(index) && index >= 0) {
                if (!this.formData[baseEntity]) {
                    this.formData[baseEntity] = {} as T[keyof T];
                }

                if (!this.formData[baseEntity][nestedProperty]) {
                    (this.formData[baseEntity] as any)[nestedProperty] = {value: ""};
                }

                this.formData[baseEntity][nestedProperty].value = value;
            }
        } else {
            if (!this.formData[baseEntity]) {
                this.formData[baseEntity] = {value: ""} as T[keyof T];
            }
            this.formData[baseEntity].value = value;
        }
    }

    @action
    deleteFormData(entity: keyof T) {
        const {baseEntity, nestedProperty} = JsonInputComponentNameHandler<T>(entity.toString())

        if (nestedProperty !== undefined) {
            const index = parseInt(nestedProperty, 10);
            const obj = this.formData[baseEntity];

            if (typeof obj === 'object' && obj.hasOwnProperty(index)) {
                const newObj = {...obj};
                delete newObj[index];
                const updatedObj: Record<string, object> = {};
                Object.keys(newObj).forEach((key, newIndex) => {
                    if (typeof newObj[key] === "object" && !Array.isArray(newObj[key]))
                        updatedObj[newIndex] = newObj[key];
                });
                this.formData[baseEntity] = updatedObj as T[keyof T];
            }
        }
    }

    @action
    resetFormData() {
        this.formData = this.initialData;
    }

    @action
    updateCustomId(id: number) {
        this.customId = id;
        setLocalStorageData("customId", id);
    }

    @action
    updateSuccessMessage(message: string) {
        this.successMessage = message;
    }
}



