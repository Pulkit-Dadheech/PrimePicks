export type TProduct = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
};

export type TProductCatalog = {
    products: TProduct[];
    total: number;
    skip: number;
    limit: number;
};
export type TCartProduct = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number;
    thumbnail: string;
};
export type TCarts = {
    id: number,
    products: TCartProduct[]
    total: number,
    "discountedTotal": number,
    "userId": number,
    "totalProducts": number,
    "totalQuantity": number
}
export type TUserCart = {
    carts: TCarts[]
    total: number
    skip: number
    limit: number
}

export interface IUserNameWithId {
    id: number;
    firstName: string;
    lastName: string;
}

export interface IUserData {
    users: IUserNameWithId[];
    total: number;
    skip: number;
    limit: number;
}

export type TProductWithQuantity = TProduct & {
    quantity: number;
    customProduct: boolean
}

export type TProductsWithQuantity = TProductWithQuantity[] | undefined

export type TSingleCustomProduct={
    id: number,
    title: string,
    category: string,
    quantity: number,
    description: string,
    discountPercentage: number,
    images: any[],
    price: number,
    rating: number,
    total: number,
    customProduct: boolean,
}
export type TCustomProductsWithQuantity= TSingleCustomProduct &{
    quantity: number;
}

export type TCustomProduct = TSingleCustomProduct[]



