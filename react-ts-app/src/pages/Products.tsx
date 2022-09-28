import React, {useState} from 'react';
import {IProduct} from "../types/type";
import ProductPage from "./ProductPage";
import {Button, Col, Container, Row} from "react-bootstrap";
import HeaderContainer from "../Container/HeaderContainer";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useEffect} from "react";
import {useActions} from "../hooks/useActions";
import {Link} from 'react-router-dom';
import {useNavigate} from "react-router";
import {BiSearch} from 'react-icons/bi';

const Products = () => {
    const {products} = useTypedSelector((store) => store.productinstance);
    const {fetchProducts} = useActions();
    const [searchTitle, setSearchTitle] = useState<string>("");
    
    useEffect(() => {
        fetchProducts();
        console.log("products", products);
    }, []);

    return (
        <>
            <HeaderContainer/>
            <Container>
                <div className="dFlex space-betw">
                    <h1>Усі товари</h1>
                    <form
                        className="form-position"
                    >
                        <input
                            id="search-input"
                            name="search-input"
                            type="search"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            className="form-control ds-input"
                            placeholder="Пошук по назві товару"
                        />
                        <button
                            type="submit"
                            className="input-group-text btn-secondary"
                        >
                            <BiSearch size={24}/>
                        </button>
                    </form>
                </div>
                <div className="row">
                    {products
                        .filter(({id, title, price, description, categoryId, urlImage}) =>
                            title
                                .toLocaleLowerCase()
                                .includes(searchTitle.toLocaleLowerCase()))
                        .map(({id, title, price, description, categoryId, urlImage}) => (
                            <div className="col-lg-3">
                                <div className="product-card">
                                    <div className="product-thumb">
                                        <Link to={`products/${id}`}><img src={urlImage} alt=""/></Link>
                                    </div>
                                    <div className="product-details">
                                        <h4>{title}</h4>
                                        <p><span className="price">{price}</span> грн</p>
                                        
                                            <Link to={`products/${id}`}>
                                            <button className="w65">Купити</button></Link>
                                        
                                    </div>
                                </div>
                            </div>
                        ))}
                
                </div>
            </Container>
        </>
    );
};

export default Products;