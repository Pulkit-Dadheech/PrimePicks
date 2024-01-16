import React from "react";
// @ts-ignore
import Image from '../../images/NoResult.png';
import "./NoResult.css"

const NoResultFound = () => {
    return (
            <img className={"No-Result-Found-Image"} src={Image} alt="No Result Found" />
    );
};

export default NoResultFound;
