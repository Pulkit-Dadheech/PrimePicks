import React from "react";
import {useRouterStore} from "mobx-state-router";

export const NotFoundComponent = ({route}: {route: string}) => {
    const router=useRouterStore();
    return (
        <div className={"cart-no-product-found"}>
            <h1>No Product Found</h1>
            <button onClick={() => router.goTo(route)}>Add New Products</button>
        </div>
    )
}
