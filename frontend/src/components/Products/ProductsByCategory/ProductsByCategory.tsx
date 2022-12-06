import React from 'react';
import {useParams} from 'react-router-dom';
import {useActions} from "../../../hooks/useActions";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useEffect, useState} from "react";
import {ISearchItem} from '../../Products/types';
import {Link} from 'react-router-dom';
import {IProductModel} from "../../Products/types";
import ProductService from "../../../services/product.service";

const ProductsByCategory = () => {
    const [products, setProducts] = useState<Array<IProductModel>>([]);
    const [searchCategoryId, setSearchCategoryId] = useState<number>(0);
    const res = useParams();
    const {searchedCategoryById} = useTypedSelector((store) => store.categoryinstance);
    const [ide, setIde] = useState<number>();
    const {FetchCategoryById} = useActions();

    async function getCategories(search: ISearchItem) {
        try {
            await FetchCategoryById(search);
        } catch (ex) {
            console.log("Error fetch in component id:", ex);
        }
    }

    const getProductsByCategory = () => {
        try {
            ProductService.getProductsByCategoryId(searchedCategoryById.id)
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
        getCategories(search);
        getProductsByCategory();

    }, [searchedCategoryById.id]);

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
                            {/*<Quantity/>*/}
                            <button className="w65">Купити</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductsByCategory;