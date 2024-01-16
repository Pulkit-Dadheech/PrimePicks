import React, {useEffect} from "react";
import {TCartProduct, TProductsWithQuantity, TProductWithQuantity} from "../../types/allTypes";
import {observer} from "mobx-react-lite";
import "./ProductList.css"
import Loader from "../LoadingPage/Loader";
import {PaginationComponent} from "../pagination/PaginationComponent";
import NoResultFound from "../NoSearchResultFound/NoResultFound";
import {ButtonUtils} from "../Button/buttonUtils";
import {useRootStore} from "../../Context/RootContext";
import {CartStore} from "../../store/cartStore";
import {ListTableStore} from "../../store/ListTableStore";
import {getLocalStorageData} from "../SessionStorageHandler/SessionStorageHandler";
import {useRouterStore} from "mobx-state-router";

export const ProductComponent = observer(() => {
    const {cart, product} = useRootStore();
    const routerStore=useRouterStore();

    useEffect(() => {
        const getProductData = async () => {
            await product.productStore.fetchData();
        }
        getProductData();
    }, []);

    useEffect(() => {
        const data = getLocalStorageData('cartProducts' + cart.cartStore.userId);

        const getCartData = async () => {
            await cart.cartStore.fetchCartData();
        }

        if (data) {
            cart.cartStore.setData(data)
        } else if (!cart.cartStore.data || cart.cartStore.prevUserId !== cart.cartStore.userId) {
            cart.cartStore.prevUserId = cart.cartStore.userId;
            getCartData();
        }
    }, [cart.cartStore.userId]);

    if (product.dataLoading) {
        return <Loader/>
    } else if (product.productStore.data?.products.length === 0) {
        return <NoResultFound/>
    }

    const fetchDiscountPrice = (discount: number, price: number) => {
        return Math.round(price - (discount / 100) * price);
    }

    const productListWithQuantity: TProductsWithQuantity = product.productStore.data?.products.map((product: any) => {
        return {
            ...product,
            quantity: cart.cartStore.data?.carts[0]?.products.find((p: TCartProduct) => p.id === product.id)?.quantity || 0,
            customProduct: false
        }
    })

    return (
        <div>
            {product.productStore.data && product.productStore.data.products &&
                productListWithQuantity?.map((productWithQuantity: TProductWithQuantity) => (
                    <div key={productWithQuantity.id} className="product-information">
                        <div className={"product-image"}>
                            <img src={productWithQuantity.images[0]} alt="Product List" height="170"/>
                        </div>
                        <div className={"product-description"}>
                            <h3>Name: {productWithQuantity.title}</h3>
                            <h4>
                                Price: <>
                                {fetchDiscountPrice(productWithQuantity.discountPercentage, productWithQuantity.price)}
                                <span>&#36;</span>
                                (
                                <del>{productWithQuantity.price}</del>
                                <span>&#36;</span>
                                )
                            </>
                            </h4>
                            <h4>Category: {productWithQuantity.category}</h4>
                            <p>Description: {productWithQuantity.description}</p>
                        </div>
                        <div className={"product-rating"}>
                            <p>Rating: {productWithQuantity.rating}</p>
                            <ButtonUtils<ListTableStore<CartStore>> stock={productWithQuantity.stock}
                                                                    id={productWithQuantity.id}
                                                                    quantity={productWithQuantity.quantity}
                                                                    isCustom={productWithQuantity.customProduct? true : false}
                                                                    data={cart.cartStore.data?.carts[0]?.products}
                                                                    store={cart.cartStore}/>
                        </div>
                    </div>
                ))
            }
            {product.productStore.data && product.productStore.data.products &&
                <PaginationComponent<any> store={product.productStore}/>}
        </div>
    );
})

