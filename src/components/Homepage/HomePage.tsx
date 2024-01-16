import {ProductHeader} from "./ProductHeader";
import {ProductComponent} from "./ProductComponent";
import "../pagination/pagination.css";
import {observer} from "mobx-react-lite";

const HomePage = observer(() => {

    return (
        <>
            <ProductHeader/>
            <ProductComponent/>
        </>
    )
})
export default HomePage;