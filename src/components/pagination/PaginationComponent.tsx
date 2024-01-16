import React from "react";
import {observer} from "mobx-react-lite";

export const PaginationComponent=observer(<T,>({store}:{store: any})=>{
    const handleNext = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        store.nextPage();
    }
    const handlePrev = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        store.prevPage();
    }
    return (
        <div className="pagination">
            <span className="pagination-button-block">
                <button
                    onClick={(e) => handlePrev(e)}
                    className={store.skip === 0 ? "" : "active"}
                >Prev
                </button>
                <span className="pagination-page-text">{(store.skip / store.limit) + 1}</span>
                <button
                    className={(store.skip< store.total- store.limit ) ? "active" :""}
                    onClick={(e) => handleNext(e)}
                >Next
                </button>
            </span>
        </div>
    )
})