import React, {useState, ChangeEvent, Dispatch, useEffect} from 'react';
import {BiSearch} from 'react-icons/bi';
import {useDispatch} from "react-redux";
import {useActions} from "../../../hooks/useActions";
import {ProductAction, ISearchProduct} from "../../Products/types";
import {fetchProductsSearch} from "../../actions/action_product";
import {useSearchParams} from "react-router-dom";
import qs from "qs";
import {useFormik} from "formik";

const SearchProduct = () => {
    const {fetchProductsSearch} = useActions();
    const [searchTitle, setSearchTitle] = useState<string>("");
    const dispatch: Dispatch<any> = useDispatch();

    const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    }
    
    const findByTitle = () => {
        dispatch(fetchProductsSearch(searchTitle));
    }

    return (
        <div className="mauto">
            <form
                className="form-position"
            >
                <input
                    id="search-input"
                    name="search-input"
                    type="search"
                    value={searchTitle}
                    onChange={onChangeSearchTitle}
                    className="form-control ds-input"
                    placeholder="Пошук по назві товару"
                />
                <button 
                    type="submit" 
                    className="input-group-text btn-secondary"
                onClick={findByTitle}
                >
                    <BiSearch size={24}/>
                </button>
            </form>
        </div>
    );
};

export default SearchProduct;