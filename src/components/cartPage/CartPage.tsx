import {observer} from "mobx-react-lite";
import {CartHeader} from "./cartHeader";
import {CartProducts} from "./cartProducts";

export const CartPage = observer(() => {
    return (
        <>
            <CartHeader/>
            <CartProducts/>
        </>
    );
});
