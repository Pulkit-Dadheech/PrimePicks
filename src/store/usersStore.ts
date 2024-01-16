import {action, makeObservable, observable} from "mobx";
import {ListTableStore} from "./ListTableStore";
import {apiQueries, createApiUrl} from "../dataFetchingFile";
import {IUserData} from "../types/allTypes";


export class UsersStore {
    userStore: ListTableStore<IUserData>;
    @observable dataLoading: boolean = false;
    @observable searchTimeout: NodeJS.Timeout | undefined

    constructor() {
        this.userStore = new ListTableStore<IUserData>(this.fetchUserData);
        makeObservable(this);
    }

    fetchUserData = async (skip: number, category?: string, limit?: number, search?: string) => {
        try {
            this.updateLoading();
            const response = await fetch(createApiUrl(apiQueries.User));
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



