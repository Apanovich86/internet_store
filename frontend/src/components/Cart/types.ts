import {IColorModel, ISizeModel} from "../../components/AddNewColor/types";

export enum actionTypes {
    CART_QTY_ITEM = 'CART_QTY_ITEM',
    CART_ADD_ITEM = 'CART_ADD_ITEM',
    CART_REMOVE_ITEM = 'CART_REMOVE_ITEM',
}

export interface CartItemModel {
    id: number;
    title: string;
    color: IColorModel;
    size: ISizeModel;
    price: number;
    count: number;
    urlImage: string;
};

interface ICartAddItemPayload {
    product: CartItemModel
    count: number
}

interface ICartAddItem {
    type: actionTypes.CART_ADD_ITEM
    payload: ICartAddItemPayload
}

interface ICartRemoveItem {
    type: actionTypes.CART_REMOVE_ITEM
    payload: number
}

export type TypeActionCart = ICartAddItem | ICartRemoveItem
    