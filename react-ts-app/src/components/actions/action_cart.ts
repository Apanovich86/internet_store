import {CartItemModel} from "../Cart/types";
import { actionTypes } from '../Cart/types';

export const addItem = (product: CartItemModel, count: number) => ({
    type: actionTypes.CART_ADD_ITEM,
    payload: { product, count },
})

export const removeFromCart = (productId: number) => ({
    type: actionTypes.CART_REMOVE_ITEM,
    payload: productId,
})