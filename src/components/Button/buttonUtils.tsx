import React from "react";
import {observer} from "mobx-react-lite";
import {TCartProduct} from "../../types/allTypes";
import {apiQueries, createApiUrl} from "../../dataFetchingFile";
import {useRootStore} from "../../Context/RootContext";
import {ListTableStore} from "../../store/ListTableStore";
import {getLocalStorageData, setLocalStorageData} from "../SessionStorageHandler/SessionStorageHandler";
import {AddToCartButton} from "./addToCartButton";

interface userCartItemsWithQuantity {
    [id: number]: { id: number; quantity: number };
}

export const ButtonUtils = observer(<T extends ListTableStore<any>, >({quantity, id, stock, isCustom, data, store}: {
    quantity: number,
    id: number,
    stock: number,
    isCustom: boolean,
    data: any,
    store: T
}) => {

    const {cart, customProduct} = useRootStore();


    function onAdd(id: number, isCustom: boolean, stock: number, quantity: number) {

        if (isCustom) {
            const result = data.map((product: TCartProduct) => {
                if (product.id.toString() === id.toString() && quantity < stock) {
                    return {
                        ...product,
                        quantity: product.quantity + 1,
                    };
                }
                return {...product};
            })
            if (store.data.carts) {
                const newStore = {
                    carts: [{
                        ...store.data.carts[0],
                        products: result
                    }],
                    limit: store.data.limit,
                    skip: store.data.skip,
                    total: store.data.total
                }
                setLocalStorageData('cartProducts' + cart.cartStore.userId, newStore);
                store.setData(newStore);
                customProduct.customProductStore.setData(result.filter((data: any) => data.id.toString().includes("custom")));
            } else {
                setLocalStorageData('customProducts', result);
                store.setData(result);
                customProduct.customProductStore.setData(result.filter((data: any) => data.id.toString().includes("custom")));
            }
        } else {
            AddOrRemoveProductFromCart(id, quantity, false)
        }
    }

    function onDelete(id: number, isCustom: boolean, stock: number, quantity: number) {
        if (isCustom) {
            const result = data.map((product: TCartProduct) => {
                if (product.id.toString() === id.toString()) {
                    return {
                        ...product,
                        quantity: product.quantity - 1,
                    };
                }
                return {...product};
            })
            if (store.data.carts) {
                const newStore = {
                    carts: [{
                        ...store.data.carts[0],
                        products: result
                    }],
                    limit: store.data.limit,
                    skip: store.data.skip,
                    total: store.data.total
                }
                console.log("store", store);
                setLocalStorageData('cartProducts' + cart.cartStore.userId, newStore);
                store.setData(newStore);
                customProduct.customProductStore.setData(result.filter((data: any) => data.id.toString().includes("custom")));
            } else {
                setLocalStorageData('customProducts', result);
                store.setData(result);
                customProduct.customProductStore.setData(result.filter((data: any) => data.id.toString().includes("custom")));
            }
        } else {
            AddOrRemoveProductFromCart(id, quantity, true)
        }
    }

    async function AddOrRemoveProductFromCart(
        id: number,
        quantity: number | undefined,
        isDelete?: boolean,
    ) {

        if (!quantity) {
            quantity = 0;
        }

        const prevCartQuantitySessionData = getLocalStorageData('userPrevCartQuantityData' + cart.cartStore.userId);
        cart.setUserPrevCartQuantityData(prevCartQuantitySessionData);

        const updatedProduct = {id: id, quantity: isDelete ? quantity - 1 : quantity + 1};
        const updatedCarts = cart.userPrevCartQuantityData ? [...cart.userPrevCartQuantityData, updatedProduct] : [updatedProduct];

        let filteredProducts: userCartItemsWithQuantity = {};
        updatedCarts.forEach((item) => {
                filteredProducts[item.id] = item;
            }
        )

        setLocalStorageData('userPrevCartQuantityData' + cart.cartStore.userId, updatedCarts);
        cart.setUserPrevCartQuantityData(updatedCarts);

        try {
            const response = await fetch(createApiUrl(apiQueries.AddToCart, store.data.carts[0].id), {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    merge: true,
                    products: Object.values(filteredProducts),
                }),
            });
            if (!response.ok) {
                createNewCart(filteredProducts, isDelete);
            } else {
                const data = await response.json();
                store.setData({
                    carts: Array(data),
                    total: store.data.total,
                    skip: store.data.skip,
                    limit: store.data.limit,
                });
                setLocalStorageData('cartProducts' + cart.cartStore.userId, {
                    carts: Array(data),
                    total: store.data.total,
                    skip: store.data.skip,
                    limit: store.data.limit,
                });
            }
        } catch (error) {
            createNewCart(filteredProducts, isDelete);
        }
    }

    async function createNewCart(filteredProducts: userCartItemsWithQuantity, isDelete: boolean | undefined) {
        const response = await fetch(createApiUrl(apiQueries.AddANewCart), {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId: store.userId,
                products: Object.values(filteredProducts)
            })
        });
        let responseReceived = await response.json();

        if (responseReceived && isDelete && quantity === 1) {
            responseReceived.products = responseReceived.products.map((product: TCartProduct) => {
                if (product.id === id) {
                    return {
                        ...product,
                        quantity: +product.quantity - 1,
                    };
                }
                return product;
            });
        }
        store.setData({
            carts: [responseReceived],
            total: 1,
            skip: 0,
            limit: 100
        });
        setLocalStorageData('cartProducts' + cart.cartStore.userId, {
            carts: [responseReceived],
            total: 1,
            skip: 0,
            limit: 100
        })
    }


    return (<>
        <AddToCartButton id={id} onAdd={onAdd} onDelete={onDelete} quantity={quantity} isCustom={isCustom}
                         stock={stock}/>

    </>)
})