import React, {useContext} from "react";
import {RootStore} from "../store/RootStore";

export const RootContext = React.createContext<RootStore | null>(null);

export function useRootStore(): RootStore {
    const rootStore = useContext(RootContext);

    if (!rootStore) {
        throw new Error('RootStore not found');
    }

    return <RootStore>rootStore;
}