import React, {useEffect, useState} from "react";
import './ProductHeader.css';
import {observer} from "mobx-react-lite";
import {useRouterStore} from "mobx-state-router";
import {useRootStore} from "../../Context/RootContext";
import {getLocalStorageData} from "../SessionStorageHandler/SessionStorageHandler";

export const ProductHeader = observer(() => {
    const [searchText, setSearchText] = useState("");
    const routerStore = useRouterStore();
    const {category, users, cart, product} = useRootStore();

    useEffect(() => {

        const sessionUserId = getLocalStorageData('userId');
        if (sessionUserId) {
            cart.cartStore.setUserId(sessionUserId);
        }
        const getData = async () => {
            await category.categoryList.fetchData();
            await users.userStore.fetchData();
        }

        getData();
    }, []);

    const handleClear = () => {
        setSearchText("");
        if (product.searchTimeout) clearTimeout(product.searchTimeout)
        product.productStore.SearchData("");
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
        if (product.searchTimeout) clearTimeout(product.searchTimeout);
        product.setSearchTimeout(setTimeout(() => product.productStore.SearchData(e.target.value), 400));
    };

    const handleNavigation = () => {
        routerStore.goTo('cart');
    }

    const userInfo = users.userStore.data?.users.find((user) => user.id === cart.cartStore.userId);

    return (
        <div className={"header-elements"}>
            <div className="search-container">
                <input
                    className="search-box"
                    placeholder="Search.."
                    value={searchText}
                    onChange={(e) => handleSearch(e)}
                />
                {product.productStore.search && (
                    <span
                        className="clear-button"
                        onClick={() => handleClear()}
                    >&#10060;
                        </span>
                )}
            </div>

            <div>
                <select
                    onChange={((e) => cart.cartStore.setUserId(Number(e.target.value)))}
                    className="product-category-list">
                    <optgroup label="Select A User">
                        <option
                            hidden>{`${userInfo?.firstName} ${userInfo?.lastName}` || "Users"}</option>
                        {users.userStore.data?.users.map((user) => (
                            <option key={user.id} value={user.id}>{`${user.firstName} ${user.lastName}`}</option>
                        ))}
                    </optgroup>
                </select>
            </div>
            <div>
                <select onChange={(e) => {
                    if (e.target.value !== 'All') {
                        product.productStore.setSelectedCategory(e.target.value)
                    } else {
                        product.productStore.setSelectedCategory("")
                    }
                }} className="users-list">
                    <optgroup label="Select Category">
                        <option>All</option>
                        {category.categoryList.data?.map((singleCategory: string, index: number) => (
                            <option key={index} value={singleCategory}>{singleCategory}</option>
                        ))}
                    </optgroup>
                </select>
            </div>
            <div className="cart">
                <button onClick={() => routerStore.goTo('customForm')}>CustomForm</button>
            </div>
            {/*    <div id="custom-form">*/}
            {/*        <Link to="/form">Add Custom Product</Link>*/}
            {/*    </div>*/}
            <div className="cart">
                <button onClick={handleNavigation}>Cart</button>
            </div>
            {/*</div>*/}
            {/*</>*/}
        </div>
    );
})
