export enum ColorActionTypes {

    FETCH_COLOR_SUCCESS = "FETCH_COLOR_SUCCESS",
    FETCH_COLOR_ERROR = "FETCH_COLOR_ERROR",
    ADD_COLOR_SUCCESS = "ADD_COLOR_SUCCESS",
    FETCH_COLOR_BY_ID = "FETCH_COLOR_BY_ID",
    DELETE_COLOR_BY_ID = "DELETE_COLOR_BY_ID",
    ADD_COLORS_TO_PRODUCTS = "ADD_COLORS_TO_PRODUCTS",
    FETCH_COLOR_BY_PRODUCT_ID_SUCCESS = "FETCH_COLOR_BY_PRODUCT_ID_SUCCESS",

}

export interface IColorModel {
    id: number,
    name: string
}

export interface ISizeModel {
    id: number,
    name: string
}

export interface ISearchColorByIdModel{
    id:number
    name:string
}

export interface ColorState {

    color: Array<IColorModel>
    status:number|string
    searchedColorById:ISearchColorByIdModel
}

export interface IAddNewColor {
    name: string
}

export interface ISearchItem {
    id: number
}

export interface IDeleteItem {

    id: number
}

export interface FetchSuccessColorAction {
    type: ColorActionTypes.FETCH_COLOR_SUCCESS;
    payload: Array<IColorModel>;
}

export interface FetchSuccessColorByProductIdAction {
    type: ColorActionTypes.FETCH_COLOR_BY_PRODUCT_ID_SUCCESS;
    payload: Array<IColorModel>;
}

export interface AddSuccessColorAction {
    type: ColorActionTypes.ADD_COLOR_SUCCESS;
    payloads: string |number;
}

export interface FetchColorItemById{
    type:ColorActionTypes.FETCH_COLOR_BY_ID;
    payload :ISearchColorByIdModel

}

export interface DeleteColorAction {
    type: ColorActionTypes.DELETE_COLOR_BY_ID;
    payload: number;
}

export interface AddColorsToProductActions {
    type: ColorActionTypes.ADD_COLORS_TO_PRODUCTS;
    payload: string |number;
}

export type ColorAction =
    FetchSuccessColorAction
    | FetchSuccessColorByProductIdAction
    | AddSuccessColorAction
    | FetchColorItemById
    | AddColorsToProductActions
    | DeleteColorAction;