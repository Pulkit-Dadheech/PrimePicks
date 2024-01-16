import {action, makeObservable, observable} from "mobx";
import {ListTableStore} from "./ListTableStore";


export class CategoryStore {
    categoryList: ListTableStore<string[]>;
    @observable dataLoading: boolean = false;
    @observable searchTimeout: NodeJS.Timeout | undefined

    constructor() {
        this.categoryList = new ListTableStore<string[]>(this.fetchCategoryData);
        makeObservable(this);
    }

    fetchCategoryData = async (skip: number,category?: string, limit?: number, search?: string) => {
        try {
            this.updateLoading();
            const response = await fetch("https://dummyjson.com/products/categories")
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



