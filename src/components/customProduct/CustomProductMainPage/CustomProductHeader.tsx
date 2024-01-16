import React from "react";
import "./CustomHeader.css"
import {useRouterStore} from "mobx-state-router";

export function CustomProductHeader() {
    const routerStore = useRouterStore();
    return (
        <>
            <div className={"custom-header-elements"}>
                <h1>Custom Products</h1>
                <div id="custom-form">
                    <button onClick={() => routerStore.goTo('customForm')}>Add Product</button>
                </div>
                <div id="cart">
                    <button onClick={() => routerStore.goTo('cart')}>Go to Cart</button>
                </div>
            </div>
        </>
    )
}