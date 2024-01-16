import {action, makeObservable, observable} from "mobx";
import {setLocalStorageData} from "../components/SessionStorageHandler/SessionStorageHandler";

export class ListTableStore<T extends Record<string, any>> {
    @observable fetchedDataFunction;
    @observable data: T | undefined;
    @observable skip: number = 0;
    @observable total: number = 0;
    limit: number = 5;
    @observable search: string = "";
    @observable category: string = "";
    @observable userId: number = 1;
    @observable prevUserId: number = 1;

    constructor(promiseData: any) {
        this.fetchedDataFunction = promiseData;
        makeObservable(this);
    }

    async fetchCartData() {
        const result = await this.fetchedDataFunction(this.userId);
        setLocalStorageData('cartProducts'+this.userId,result);
        this.setData(result);
    }

    async fetchData() {
        const result = await this.fetchedDataFunction(this.skip, this.category, this.limit, this.search);
        this.setData(result);
    }

    @action setData(result: T) {
        if (result.total)
            this.total = result.total;

        let filteredProductsWithCategory;
        if (this.category !== "" && this.search && this.search !== "") {
            filteredProductsWithCategory = result?.products.filter((product: T) => {
                if (product.title.toUpperCase().includes(this.search.toUpperCase()) && product.category === this.category) return product
            })
        }
        const filteredProducts = {
            products: filteredProductsWithCategory,
            total: result.total,
            skip: this.skip,
            limit: this.limit
        }
        if (filteredProductsWithCategory) {
            this.data = filteredProducts as unknown as T;
            return
        }
        this.data = result;
    }

    @action
    nextPage() {
        console.log(this.total);
        if (this.skip < this.total - this.limit) {
            this.skip = this.skip + this.limit;
            this.fetchData();
        }
        console.log(this.skip);
    }

    @action
    prevPage() {
        console.log(this.skip)
        if (this.skip !== 0)
            this.skip = this.skip - this.limit;
        this.fetchData();
    }

    @action updateData(data: T) {
        this.fetchedDataFunction = data;
    }

    @action SearchData(title: string) {
        this.resetSkip();
        this.search = title;
        this.fetchData();
    }

    @action setSelectedCategory(category: string) {
        this.resetSkip();
        this.category = category;
        this.fetchData();
    }

    @action resetSkip() {
        this.skip = 0;
    }

    @action updateTotal(newTotal: number) {
        this.total = newTotal;
    }

    @action setUserId(id: number) {
        this.userId = id;
        setLocalStorageData('userId',this.userId);
    }
}
