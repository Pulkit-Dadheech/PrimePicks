import React from "react";
import "../CustomProductMainPage/CustomHeader.css"
import {useRouterStore} from "mobx-state-router";

export const CustomCartHeader=()=> {
    const routerStore = useRouterStore();
    return (
        <>
            <div className={"custom-header-elements"}>
                <h1>Custom Cart</h1>
                <div id="custom-form">
                    <button onClick={() => routerStore.goTo('customForm')}>Add Product</button>
                </div>
                <div id="cart">
                    <button onClick={() => routerStore.goTo('customProduct')}>Go to Product Page</button>
                </div>
            </div>
        </>
    )
}