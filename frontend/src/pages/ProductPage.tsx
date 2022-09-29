import React, {FC} from 'react';
import {IProduct} from "../types/type";
import Quantity from "../components/Quantity";
import {useNavigate} from "react-router";
import {Card, Col} from "react-bootstrap";
import {IProductModel} from "../components/MultiImagesProductsList/types";

const ProductPage: FC<IProductModel> = ({
                                            id,
                                            title,
                                            price,
                                            description,
                                            categoryId,
                                            urlImage,
                                        }) => {
    const addHandler = () => {
        console.log(id)
    }
    const navigate = useNavigate();
    const onProduct = () => {
        navigate("/products/:id")
    }
    return (
        <div className="product-card" onClick={() => onProduct()}>
            <div className="product-thumb">
                <a href="#"><img src={urlImage} alt=""/></a>
            </div>
            <div className="product-details">
                <h4>{title}</h4>
                <p><span className="price">{price}</span> грн</p>
                {/*<Quantity/>*/}
                <button className="w65" onClick={addHandler}>Купити</button>
            </div>
        </div>
    );
};

export default ProductPage;