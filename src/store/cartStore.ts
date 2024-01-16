import {action, makeObservable, observable} from "mobx";
import {ListTableStore} from "./ListTableStore";
import {apiQueries, createApiUrl} from "../dataFetchingFile";
import {TUserCart} from "../types/allTypes";

type TUserPrevCartQuantityData={ id: number; quantity: number }

export class CartStore {
    cartStore: ListTableStore<any>;
    @observable dataLoading: boolean = false;
    @observable searchTimeout: NodeJS.Timeout | undefined
    @observable userPrevCartQuantityData: Array<TUserPrevCartQuantityData>=[];

    constructor() {
        this.cartStore = new ListTableStore<TUserCart>(this.fetchCartData);
        makeObservable(this);
    }

    fetchCartData = async (userID: number) => {
        try {
            this.updateLoading();
            const response = await fetch(createApiUrl(
                apiQueries.UserCart,
                userID
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

    @action setUserPrevCartQuantityData(data: Array<TUserPrevCartQuantityData>){
        this.userPrevCartQuantityData=data;
        this.cartStore.data = { ...this.cartStore.data };
    }
}



