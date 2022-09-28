import React from 'react';
import {Link} from 'react-router-dom';
import {useEffect, useState} from "react";
import {IProductModel} from "../../MultiImagesProductsList/types";
import {useParams} from 'react-router-dom';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useActions";
import {ISearchItem} from '../../MultiImagesProductsList/types';
import ColorService from "../../../services/color.service";

const ProductByColor = () => {
    const [products, setProducts] = useState<Array<IProductModel>>([]);
    const [searchColorId, setSearchColorId] = useState<number>(0);
    const res = useParams();
    const {searchedColorById} = useTypedSelector((store) => store.colorinstance);
    const [ide, setIde] = useState<number>();
    const {FetchColorById} = useActions();

    async function getColors(search: ISearchItem) {
        try {
            await FetchColorById(search);
        } catch (ex) {
            console.log("Error fetch in component id:", ex);
        }
    }

    const getProductsByColor = () => {
        try {
            ColorService.getProductsByColorId(searchedColorById.id)
                .then((response: any) => {
                    setProducts(response.data);
                    console.log("Products from server", response.data);
                })
        } catch (ex) {
            console.log("Error fetch in component id:", ex);
        }
    }

    useEffect(() => {
        const result = Number(res.id);
        setIde(result);
        const search: ISearchItem = {
            id: result
        };
        getColors(search);
        getProductsByColor();

    }, [searchedColorById.id]);

    return (
        <div className="row">
            {products.map(({id, title, price, description, categoryId, urlImage}) => (
                <div className="col-lg-3">
                    <div className="product-card">
                        <div className="product-thumb">
                            <Link to={`viewProducts/${id}`}><img src={urlImage} alt=""/></Link>
                        </div>
                        <div className="product-details">
                            <h4>{title}</h4>
                            <p><span className="price">{price}</span> грн</p>
                            <button className="w65">Купити</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductByColor;