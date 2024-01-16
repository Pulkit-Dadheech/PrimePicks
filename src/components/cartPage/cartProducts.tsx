import React, {useEffect} from "react";
import {TCartProduct} from "../../types/allTypes";
import {observer} from "mobx-react-lite";
import {useRootStore} from "../../Context/RootContext";
import {Cart} from "../GenericCart/Cart";
import {NotFoundComponent} from "../NoSearchResultFound/NotFoundComponent";
import {CartStore} from "../../store/cartStore";
import {ListTableStore} from "../../store/ListTableStore";
import {getLocalStorageData} from "../SessionStorageHandler/SessionStorageHandler";

export const CartProducts = observer(() => {
    const {cart, customProduct} = useRootStore();
    const cartTotalProducts = cart.cartStore.data?.carts[0]?.products.filter((product: TCartProduct) => product.quantity > 0).length;

    useEffect(() => {
        const userIdBeforeRefresh = getLocalStorageData('userId');
        if (userIdBeforeRefresh)
            cart.cartStore.setUserId(userIdBeforeRefresh);
        const data = getLocalStorageData('cartProducts' + cart.cartStore.userId)

        const getCartData = async () => {
            await cart.cartStore.fetchCartData();
        }
        if (data) {
            cart.cartStore.setData(data);
        } else if (!cart.cartStore.data || cart.cartStore.prevUserId !== cart.cartStore.userId) {
            getCartData();
        }
    }, [cart.cartStore.userId]);

    useEffect(() => {
        const customProducts = getLocalStorageData("customProducts");
        if (customProducts) {
            const newStore = {
                carts: [{
                    ...cart.cartStore.data?.carts[0],
                    products: !!cart.cartStore.data?.carts.length ? [...cart.cartStore.data?.carts[0]?.products, ...customProducts] : [...customProducts]
                }],
                limit: 1,
                skip: 0,
                total: 1
            }
            cart.cartStore.setData(newStore);
        } else if (customProduct.customProductStore.data) {
            const newStore = {
                carts: [{
                    ...cart.cartStore.data.carts[0],
                    products: [...customProduct.customProductStore.data]
                }],
                limit: cart.cartStore.data.limit,
                skip: cart.cartStore.data.skip,
                total: cart.cartStore.data.total
            }
            cart.cartStore.setData(newStore);
        }

    }, [cart.cartStore.userId]);

    if (!cart.cartStore.data?.carts[0]?.products.length || cartTotalProducts === 0) {
        return (
            <NotFoundComponent route={'home'}/>
        )
    }

    return (
        <>
            {cart.cartStore.data &&
                <Cart<ListTableStore<CartStore>>
                    data={cart.cartStore.data?.carts[0].products.filter((product: TCartProduct) => product.quantity > 0)}
                    isCustom={false} store={cart.cartStore}/>
            }
        </>
    )
})