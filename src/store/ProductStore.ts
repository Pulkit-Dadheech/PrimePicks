import {action, makeObservable, observable} from "mobx";
import {ListTableStore} from "./ListTableStore";
import {apiQueries, createApiUrl} from "../dataFetchingFile";

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


export class ProductStore {
    productStore: ListTableStore<ProductList>;
    @observable dataLoading: boolean = false;
    @observable searchTimeout: NodeJS.Timeout | undefined
    searchText: string | null = null;

    constructor() {
        this.productStore = new ListTableStore<ProductList>(this.fetchData);
        makeObservable(this);
    }

    fetchData = async (skip: number,category?: string, limit?: number, search?: string,) => {
        try {
            this.updateLoading();
            const response = await fetch(createApiUrl(
                (category && category!=="") ? apiQueries.Category : (search && search!=="") ? apiQueries.Search : apiQueries.Product,
                category ? category : search,
                limit || 5,
                skip
            ))
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error loading data", error);
        } finally {
            this.updateLoading();
        }
    }

    @action updateLoading() {
        this.dataLoading = !this.dataLoading;
    }

    @action setSearchTimeout = (timeout: NodeJS.Timeout) => {
        this.searchTimeout = timeout;
    };
}



