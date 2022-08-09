import React, {FC} from 'react';
import {IProduct} from "../types/user.type";
import Quantity from "../components/Quantity";
import {useNavigate} from "react-router";

import {Card, Col} from "react-bootstrap";
// import Image from "react-bootstrap/Image";

interface IProductItem {
    product: IProduct
}
const ProductPage: FC<IProductItem> = ({product}) => {
    const addHandler = () => {
        console.log(product._id)
    }
    const navigate = useNavigate();
    const onProduct = () => {
        navigate("/product_id")
    }
    return (
        // <div>
        //    <img src={product.imagePath} alt={product.name} width='200'/>
        //     <div>{product.name}</div>
        //     <div>{product.price}</div>
        //     <Quantity/>
        //     <button className="w65"  onClick={addHandler}>Купити</button>
        // </div>
    <div className="product-card" onClick={() => onProduct()}>
            <div className="product-thumb">
            <a href="#"><img src={product.imagePath} alt=""/></a>
            </div>
            <div className="product-details">
                <h4>{product.name}</h4>
                <p><span className="price">{product.price}</span> грн</p>
                     {/*<Quantity/>*/}
                    <button className="w65"  onClick={addHandler}>Купити</button>
            </div>
    </div>
    );
};

export default ProductPage;