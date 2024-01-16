import React, {useEffect} from 'react';
import './ProductForm.css';
import {useRouterStore} from "mobx-state-router";
import {useRootStore} from "../../../Context/RootContext";
import {observer} from "mobx-react-lite";
import {getLocalStorageData, setLocalStorageData} from "../../SessionStorageHandler/SessionStorageHandler";
import {MessageField, NameField, NumberField, RadioField} from "../../HOC/FieldInputElements";
import {FormStore, IFormDataValue} from "../../../store/FormStore";
import FormWrapper from "../../HOC/FormWrapper";
import {TCustomProductsWithQuantity} from "../../../types/allTypes";

export interface IFormProps {
    title: IFormDataValue;
    category: IFormDataValue;
    price: IFormDataValue;
    discountPercentage: IFormDataValue;
    total: IFormDataValue;
    description: IFormDataValue;
    [x: string]: IFormDataValue;
}

export type TCustomProductFormProps = IFormProps & {
    id: string;
    images: Array<any>;
    rating: number;
    customProduct: boolean;
    quantity: number;
}

export const formStore = new FormStore<IFormProps>({
    title: {value: "",isRequired: true},
    category: {value: "", isRequired: true},
    price: {value: 0, isRequired: true},
    discountPercentage: {value: 0, isRequired: true},
    total: {value: 1, isRequired: true},
    description: {value: ""},
});

export const CustomProductForm = observer(() => {
    const routerStore = useRouterStore();
    const {cart,customProduct} = useRootStore();

    useEffect(() => {
        const customProductData = getLocalStorageData('customProducts');
        const customProductIdBeforeRefresh = getLocalStorageData('customProductId');
        if (customProductData) {
            customProduct.customProductStore.setData(customProductData)
        }

        if (customProductIdBeforeRefresh) {
            formStore.updateCustomId(+customProductIdBeforeRefresh + 1)
        }
    }, []);


    const Validation = (name: string) => {
        if (formStore.formData[name].isRequired) {
            if (name === "title" && formStore.formData[name].value.length === 0) {
                formStore.addErrorField(name, "Please Enter A Valid Name");
            } else if (name === "discountPercentage" && formStore.getValue(name) > 100 || formStore.getValue(name) < 0) {
                formStore.addErrorField(name, "Discount Percentage must be lie between 0 to 100");
            } else if ((name === "quantity" || name === "price") && formStore.getValue(name) <= 0) {
                formStore.addErrorField(name, `${name.toUpperCase()} must be greater than 0`);
            } else if (formStore.formData[name].value.length === 0) {
                formStore.addErrorField(name, "Please fill this field Correctly");
            } else {
                formStore.addErrorField(name, "");
            }
        }
    }

    function handleSubmit() {

        const formData = formStore.formData;
        let newData = {} as Record<keyof TCustomProductsWithQuantity, any> | null;
        let errorDetected = false;

        Object.keys(formData).forEach((key) => {
            if (newData) newData[key as keyof TCustomProductsWithQuantity] = formData[key].value;
            if (formData[key].isRequired && formData[key].value === "") {
                newData = null;
                return;
            }
        });

        Object.keys(formData).forEach((key) => {
            if (!!formData[key].error) {
                errorDetected = true;
                return;
            }
        });

        if (!errorDetected && newData !== null && Object.keys(newData).length > 1) {
            const customProductIdBeforeRefresh = getLocalStorageData('customId')

            if (customProductIdBeforeRefresh) {
                formStore.updateCustomId(+customProductIdBeforeRefresh + 1);
            } else {
                formStore.updateCustomId(formStore.customId + 1);
            }

            newData["id"] = `custom` + formStore.customId;
            newData["images"] = [];
            newData["rating"] = 4.5;
            newData["customProduct"] = true;
            newData["quantity"] = 0;
            if (customProduct.customProductStore.data) {
                customProduct.customProductStore.setData([...customProduct.customProductStore.data, newData]);
                formStore.updateSuccessMessage("Form Submitted Successfully");
                setTimeout(() => formStore.updateSuccessMessage(""), 4000)
                setLocalStorageData('customProducts', customProduct.customProductStore.data)
                const newStore = {
                    carts: [{
                        ...cart.cartStore?.data?.carts[0],
                        products: cart.cartStore.data ? [...cart.cartStore.data?.carts[0]?.products,...customProduct.customProductStore.data] : [...customProduct.customProductStore.data]
                    }],
                    limit: 1,
                    skip: 0,
                    total: 1
                }
                cart.cartStore.setData(newStore);
                formStore.resetFormData();
            } else {
                customProduct.customProductStore.setData([newData]);
                const newStore = {
                    carts: [{
                        ...cart.cartStore?.data?.carts[0],
                        products: cart.cartStore.data ? [...cart.cartStore.data?.carts[0]?.products,newData] : [newData]
                    }],
                    limit: 1,
                    skip: 0,
                    total: 1
                }
                cart.cartStore.setData(newStore);
                setLocalStorageData('customProducts', customProduct.customProductStore.data);
                formStore.resetFormData();
            }

        } else {
            Object.keys(formData).forEach((key) => Validation(key));
            formStore.updateErrorMessage("Fill all the required fields before submitting")
        }
    }

    function handleReset(e: React.SyntheticEvent){
        e.preventDefault();
    }

    return (
        <div className="form-container">
            <div className={"form-header"}>
                <h2 className="form-header-text">Add a Custom Product</h2>
                <button onClick={() => routerStore.goTo('customProduct')}>View Custom Products</button>
            </div>

            <FormWrapper<IFormProps>
                formStore={formStore}
                onSubmit={handleSubmit}
                onReset={handleReset}
            >
                <NameField
                    name={"title"}
                    label={"Enter Your Product Name"}
                />
                <RadioField
                    name={"category"}
                    label={"Select Your Product Category"}
                    boxValues={["SmartPhone", "Laptop", "Watch"]}
                />

                <NumberField
                    name={"price"}
                    label={"Enter Price of Your Product"}
                />
                <NumberField
                    name={"discountPercentage"}
                    label={"Enter Discount Percentage"}
                />
                <NumberField
                    name={"total"}
                    label={"Enter Total Quantity"}
                />
                <MessageField name={"description"} label={"Description"}/>
                {formStore.errorMessage !== "" &&
                    <p className={"text-danger"}>{formStore.errorMessage}</p>}

                <button
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();

                    }}
                >
                    Submit
                </button>
                {formStore.successMessage && <div className="success-message">{formStore.successMessage}</div>}
            </FormWrapper>
        </div>
    );
})
