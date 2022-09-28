import {IColorModel} from "../AddNewColor/types"

export enum ProductsActionTypes {
    FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS",
    FETCH_PRODUCT_ERROR = "FETCH_PRODUCT_ERROR",
    ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS",
    FETCH_PRODUCT_BY_ID = "FETCH_PRODUCT_BY_ID",
    DELETE_PRODUCT_BY_ID = "DELETE_PRODUCT_BY_ID",
    SEARCH_PRODUCTS = "SEARCH_PRODUCTS",
    FETCH_PRODUCT_BY_CATEGORY_ID = "FETCH_PRODUCT_BY_CATEGORY_ID",
}

export interface IProductModel {
    id: number,
    title: string,
    price: number,
    description: string,
    sizes?: [],
    colors?: [],
    responses?: [],
    categoryId: number,
    urlImage?: string,
    availability?: boolean
}

export interface ICartItem extends IProductModel {
    count: number
}

export interface ISearchProductByIdModel {
    id: number
    title: string
    price: number
    description: string
    categoryId: number
    urlImage: string
    colors?: Array<IColorModel>
    availability: boolean
}

export interface ProductState {
    products: Array<IProductModel>
    status:number|string
    searchedProductById: ISearchProductByIdModel
}

export interface ISearchItem {
    id: number
}

export interface IAddNewProduct {
    title: string
    price: number
    description: string
    categoryId: number
    urlImage?: string
    colors: Array<IColorModel>
}

export interface ISearchProduct {
    id?: string
    title?: string
    price?: string
    description?: string
    categoryId?: string
    urlImage?: string
    // colors?: Array<IColorModel>
    // availability?: boolean
}

export interface IProductSearchList {
    products: Array<ISearchProduct>
}

export interface FetchSuccessProductAction {
    type: ProductsActionTypes.FETCH_PRODUCT_SUCCESS;
    payload: Array<IProductModel>;
}

export interface AddSuccessProductAction {
    type: ProductsActionTypes.ADD_PRODUCT_SUCCESS;
    payloads: string |number;
}

export interface FetchProductItemById {
    type: ProductsActionTypes.FETCH_PRODUCT_BY_ID;
    payload: ISearchProductByIdModel;
}

export interface FetchProductByCategoryId {
    type: ProductsActionTypes.FETCH_PRODUCT_BY_CATEGORY_ID;
    payload: Array<IProductModel>;
}

export interface DeleteProductAction {
    type: ProductsActionTypes.DELETE_PRODUCT_BY_ID,
    payload: number;
}

export interface FetchProductsSearchAction {
    type: ProductsActionTypes.SEARCH_PRODUCTS;
    payload: Array<IProductModel>;
}

export type ProductAction =
    FetchSuccessProductAction
    | AddSuccessProductAction
    | FetchProductItemById
    | FetchProductByCategoryId
    | FetchProductsSearchAction
    | DeleteProductAction;