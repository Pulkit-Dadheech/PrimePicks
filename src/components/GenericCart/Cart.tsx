import {observer} from "mobx-react-lite";
import {ButtonUtils} from "../Button/buttonUtils";
import React from "react";

type TCart = {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice?: number;
    thumbnail?: string;
    image?: string
    customProduct?: boolean;
}

export const Cart = observer(<T, >({data, isCustom, store}: { data: Array<TCart>, isCustom: boolean, store: T }) => {
    const fetchDiscountPrice = (discount: number, price: number) => {
        return Math.round(price - (discount / 100) * price);
    }

    return (
        <>
            {data.map((cartProduct: TCart) => (
                <div key={cartProduct.id} className="product-information">
                    <div className={"product-image"}>
                        <img src={cartProduct.thumbnail || cartProduct.image} alt="Cart List" height="170"/>
                    </div>
                    <div className={"product-description"}>
                        <h3>Name: {cartProduct.title}</h3>
                        <h4>
                            Price: <>
                            {fetchDiscountPrice(cartProduct.discountPercentage, cartProduct.price)}
                            <span>&#36;</span>
                            (
                            <del>{cartProduct.price}</del>
                            <span>&#36;</span>
                            )
                        </>
                        </h4>
                    </div>
                    <div className={"product-rating"}>
                        <ButtonUtils<any> quantity={cartProduct.quantity} id={cartProduct.id}
                                          stock={cartProduct.total} isCustom={cartProduct.customProduct? true : false} data={data}
                                          store={store}/>
                    </div>
                </div>))}
        </>
    )
})