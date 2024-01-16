import React from "react";
import {initRouter} from "./initRouter";
import {RouterContext, RouterView} from 'mobx-state-router';
import {viewMap} from "./viewMap";
import {RootStore} from "./store/RootStore";
import {RootContext} from "./Context/RootContext";

export default function App()
{
    const routerStore = initRouter();
    const rootStore = new RootStore();


// ---------- useRouterStore ----------


    return (
        <RouterContext.Provider value={routerStore}>
            <RootContext.Provider value={rootStore}>
                <RouterView viewMap={viewMap}/>
            </RootContext.Provider>
        </RouterContext.Provider>
    );
}