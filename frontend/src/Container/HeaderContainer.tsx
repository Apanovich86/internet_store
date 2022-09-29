import React, {FC} from "react";
import styles from "./HeaderContainer.module.scss";
import {CartSvg} from "../svgs/cart";
import CategoryList from "../Category/CategoryList";
import ColorList from "../Color/ColorList";
import SearchProduct from "../components/MultiImagesProductsList/SearchProduct/SearchProduct";
import {Button, Container, Nav, Navbar as NavbarBs} from "react-bootstrap"
import {useState} from "react";
import {Link} from "react-router-dom";
import {useTypedSelector} from '../hooks/useTypedSelector';
import {useDispatch} from 'react-redux';
import {removeFromCart} from '../components/actions/action_cart';
import cn from 'classnames';
import CartButton from "../components/CartButton";

const HeaderContainer: FC = () => {
    const cart = useTypedSelector(state => state.cartinstance);
    
    return (
        <div className={styles.container}>
            <div className={styles.logo}>cloThes</div>
            <CategoryList/>
            <ColorList />
            <CartButton/>
        </div>
    )
}

export default HeaderContainer;