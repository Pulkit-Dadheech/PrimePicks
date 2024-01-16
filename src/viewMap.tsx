import React from 'react';
import HomePage from "./components/Homepage/HomePage";
import NoResultFound from "./components/NoSearchResultFound/NoResultFound";
import {CartPage} from "./components/cartPage/CartPage";
import {CustomProductForm} from "./components/customProduct/CustomProductForm/CustomProductsForm";
import {CustomProductPage} from "./components/customProduct/CustomProductMainPage/CustomProductPage";
import {CustomCartPage} from "./components/customProduct/CustomCart/CustomCartPage";

export const viewMap = {
    home: <HomePage/>,
    cart: <CartPage/>,
    notFound: <NoResultFound/>,
    customForm: <CustomProductForm/>,
    customProduct: <CustomProductPage/>,
    customCart: <CustomCartPage/>
};