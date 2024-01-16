import {makeObservable} from "mobx";
import {ListTableStore} from "./ListTableStore";
import {TCustomProductsWithQuantity} from "../types/allTypes";

export interface Product {
    id: number;
    title: string;
    price: number;
}

export interface ProductList {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}


export class CustomProductStore {
    customProductStore: ListTableStore<TCustomProductsWithQuantity[]>;
    customProductData: TCustomProductsWithQuantity[]=[];

    constructor() {
        this.customProductStore = new ListTableStore<TCustomProductsWithQuantity[]>(this.customProductData);
        makeObservable(this);
    }

}



