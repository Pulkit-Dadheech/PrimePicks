export const baseURL = 'https://dummyjson.com';

export enum apiQueries {
    Search = 'search',
    Category = 'category',
    Product = 'product',
    SingleProduct = 'singleProduct',
    AddToCart = 'addToCart',
    UserCart = 'userCart',
    User = 'users',
    AddANewCart = 'addANewCart'
}

export function createApiUrl(queryType: apiQueries, parameter?: string | number, limit?: number, skip?: number) {
    let url = baseURL;

    switch (queryType) {
        case 'search':
            if (parameter) {
                url += `/products/search?q=${parameter}&limit=${limit}&skip=${skip}`;
            }
            break;

        case 'category':
            if (parameter) {
                url += `/products/category/${parameter}?limit=${limit}&skip=${skip}`;
            }
            break;

        case 'product':
            url += `/products?limit=${limit}&skip=${skip}`;
            break;

        case 'singleProduct':
            if (parameter) {
                url += `/products/${parameter}`;
            }
            break;

        case 'users':
            url += '/users?limit=100&select=firstName,lastName';
            break;

        case 'addToCart':
            url += `/carts/${parameter}`;
            break;

        case 'userCart':
            url += `/carts/user/${parameter}`;
            break;

        case 'addANewCart':
            url += `/carts/add`
            break;

        default:
            throw new Error('Invalid action');
    }

    return url;
}
