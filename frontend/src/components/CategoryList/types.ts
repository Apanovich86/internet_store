import { ICategory } from "../../types/type"

export enum CategoryActionTypes {
    FETCH_CATEGORY_SUCCES = "FETCH_CATEGORY_SUCCES",
    FETCH_CATEGORY_ERROR = "FETCH_CATEGORY_ERROR",
    ADD_CATEGORY_SUCCES = "ADD_CATEGORY_SUCCES",
    FETCH_CATEGORY_BY_ID = "FETCH_CATEGORY_BY_ID",
    GET_CATEGORY_BY_ID = "GET_CATEGORY_BY_ID",
    GET_CATEGORY_SUCCES = "GET_CATEGORY_SUCCES",
    DELETE_CATEGORY_BY_ID = "DELETE_CATEGORY_BY_ID",
    UPDATE_CATEGORY_BY_ID = "UPDATE_CATEGORY_BY_ID",
    UPDATE_CATEGORY = "UPDATE_CATEGORY"
}

export interface ICategoryModel {
    id: number,
    name: string
}

export interface ISearchCategoryByIdModel {
    id: number,
    name: string
}

export interface CategoryState {
    category: Array<ICategoryModel>
    status: number | string
    searchedCategoryById: ISearchCategoryByIdModel
}

export interface IAddNewCategory {
    name: string
}

export interface ISearchItem {
    id: number
}

export interface IGetCategory {
    data: ICategory;
    status: number;

}

export interface IDeleteItem {
    id: number
}

export interface IUpdateItem {
    name: string
}

export interface FetchSuccessCategoryAction {
    type: CategoryActionTypes.FETCH_CATEGORY_SUCCES;
    payload: Array<ICategoryModel>;
}

export interface AddSuccessCategoryAction {
    type: CategoryActionTypes.ADD_CATEGORY_SUCCES;
    payloads: string | number
}

export interface FetchCategoryItemById {
    type: CategoryActionTypes.FETCH_CATEGORY_BY_ID;
    payload: ISearchCategoryByIdModel;
}

export interface GetCategoryAction {
    type: CategoryActionTypes.GET_CATEGORY_BY_ID;
}

export interface GetSuccesCategoryAction {
    type: CategoryActionTypes.GET_CATEGORY_SUCCES;
    payload: ICategory;
}

export interface DeleteCategoryAction {
    type: CategoryActionTypes.DELETE_CATEGORY_BY_ID;
    payload: number;
}

export interface UpdateSuccesCategoryAction {
    type: CategoryActionTypes.UPDATE_CATEGORY_BY_ID;
    payload: ICategory
}

export type CategoryAction =
    FetchSuccessCategoryAction
    | AddSuccessCategoryAction
    | FetchCategoryItemById
    | GetCategoryAction
    | GetSuccesCategoryAction
    | DeleteCategoryAction
    | UpdateSuccesCategoryAction;