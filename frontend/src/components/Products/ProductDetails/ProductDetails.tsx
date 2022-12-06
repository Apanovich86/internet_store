import React from 'react';
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useEffect, useState, useCallback} from "react";
import {useActions} from "../../../hooks/useActions";
import {ISearchItem, ISearchProductByIdModel} from '../types';
import {IColorModel, ISizeModel} from "../../AddNewColor/types";
import {Container} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {getColorsInProduct} from "../../../services/color.service";
import {getSizesInProduct} from "../../../services/size.service";
import CommentsList from "../../Comments/CommentsListByProduct";
import HeaderContainer from "../../../Container/HeaderContainer";
import {Button} from "react-bootstrap";
import {useDispatch} from 'react-redux';
import {removeFromCart} from '../../../components/actions/action_cart';
import {IProductModel} from "../../Products/types";
import {addItem} from '../../actions/action_cart';
import {CartItemModel} from "../../Cart/types";
import Quantity from '../../Quantity';
import CartButton from "../../../components/CartButton";

interface IProductItem {
    product: IProductModel
}

const ProductDetails: React.FC = () => {
    const res = useParams();
    const [colors, setColors] = useState<Array<IColorModel>>([]);
    const [sizes, setSizes] = useState<Array<ISizeModel>>([]);
    const searchedProductById = useTypedSelector((store) => store.productinstance.searchedProductById);
    const [ide, setIde] = useState<number>();
    const {FetchProductById, getAllColorsByProductId} = useActions();
    const [currentColor, setCurrentColor] = useState<IColorModel>({id: 0, name: ""});
    const [currentSize, setCurrentSize] = useState<ISizeModel>({id: 0, name: ""});
    const [isShowCart, setIsShowCart] = useState(false);
    const cart = useTypedSelector(state => state.cartinstance);
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    const [count, setCount] = useState(0);
    const dispatch = useDispatch();

    const onClickAdd = () => {
        const item: CartItemModel = {
            id: searchedProductById.id,
            title: searchedProductById.title,
            color: currentColor,
            size: currentSize,
            price: searchedProductById.price,
            count: count,
            urlImage: searchedProductById.urlImage,
        };
        console.log("item", item);
        dispatch(addItem(item, count));
    };

    async function getProducts(search: ISearchItem) {
        try {
            const data = await FetchProductById(search);
        } catch (ex) {
            console.log("Error fetch in component id:", ex);
        }
    }

    async function getColorsByProductId() {
        getColorsInProduct(res.id).then((response: any) => {
            setColors(response.data);
            console.log("response", response.data);
        })
            .catch((e: Error) => {
                console.log(e);
            })
    }

    async function getSizesByProductId() {
        getSizesInProduct(res.id).then((response: any) => {
            setSizes(response.data);
            console.log("response", response.data);
        })
            .catch((e: Error) => {
                console.log(e);
            })
    }

    useEffect(() => {
        const result = Number(res.id);
        setIde(result);
        console.log("searchProd", searchedProductById);
        const search: ISearchItem = {
            id: result
        };
        getProducts(search);

        console.log(res.id);
        getColorsByProductId();
        getSizesByProductId();

    }, []);

    return (
        <div className="m30">
            <div className="dFlex space-betw">
                <h1 className="titleProduct">{searchedProductById.title}</h1>
                <CartButton/>
            </div>
            <ul className="nav nav-pills nav-tabs mb20" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="main-tab" data-bs-toggle="pill" data-bs-target="#main"
                            type="button" role="tab" aria-controls="main" aria-selected="true">Головне про товар
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="characteristics-tab" data-bs-toggle="pill"
                            data-bs-target="#characteristics"
                            type="button" role="tab" aria-controls="characteristics"
                            aria-selected="false">Характеристики
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="feedbacks-tab" data-bs-toggle="pill" data-bs-target="#feedbacks"
                            type="button" role="tab" aria-controls="feedbacks" aria-selected="false">Відгуки та
                        коментарі
                    </button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="main" role="tabpanel" aria-labelledby="main-tab">
                    <div className="dFlex space-even">
                        <img className="photoProduct" src={searchedProductById.urlImage} alt="photo tovary"/>
                        <div className="columnPrice">
                            <div className="price-block">
                                <div className="mr15">
                                    <p className="priceStyle">{searchedProductById.price} грн</p>
                                    {searchedProductById.availability ?
                                        <p className="corFlow">в наявності</p>
                                        :
                                        <p className="corFlow">немає в наявності</p>
                                    }
                                </div>
                                <Quantity count={count} setCount={setCount}/>
                            </div>
                            <div className="colorStyle">

                                <p>Виберіть колір:</p>
                                {colors &&
                                    colors.map((color) => {
                                            return (
                                                <div>
                                                    <span
                                                        key={color.id}
                                                        onClick={() => setCurrentColor(color)}>
                                                    <input type="radio" name="mycheck" value="1"/>
                                                    <label className={"color"}>
                                                        {color.name}<br/>
                                                    </label>
                                                        </span>
                                                    {/*<div>{ide}</div>*/}
                                                </div>
                                            )
                                        }
                                    )}
                            </div>
                            <div className="sizeStyle">
                                <p>Виберіть розмір:</p>
                                {sizes &&
                                    sizes.map((size) => {
                                            return (
                                                // <span className="color" key={size.id}>{size.name}</span>
                                                <div>
                                                    <span
                                                        key={size.id}
                                                        onClick={() => setCurrentSize(size)}>
                                                    <input type="radio" name="mycheckSize"/>
                                                    <label className={"color"}>
                                                        {size.name}<br/>
                                                    </label>
                                                        </span>
                                                    {/*<div>{currentSize.name}</div>*/}
                                                </div>
                                            )
                                        }
                                    )}
                                <button className="w65" onClick={onClickAdd}>Купити</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane fade mh315" id="characteristics" role="tabpanel"
                     aria-labelledby="characteristics-tab"><h2>Характеристики {searchedProductById.title}</h2>
                    <p className="description">{searchedProductById.description}</p>
                </div>
                <div className="tab-pane fade mh315" id="feedbacks" role="tabpanel"
                     aria-labelledby="feedbacks-tab">
                    <CommentsList/>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;